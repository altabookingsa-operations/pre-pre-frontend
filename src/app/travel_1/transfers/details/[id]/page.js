import DetailsClient from '@/components/transfers/DetailsClient';
import { cookies } from 'next/headers';
import CryptoJS from 'crypto-js';
import axiosFrontNodeInstance from '@/utils/axiosFrontNodeInstance';
import * as constants from '@/utils/constants';

export const metadata = {
  title: 'Alta Booking - Transfer Details',
};

async function getTransferDetails(id, searchParams) {
  const cookieStore = cookies();
  const encrypkey = process.env.ENCRYPTION_KEY || process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

  const selectedCurrency = cookieStore.get(constants.SELECTED_CURRENCY)?.value;
  const transferCacheKeyRaw = cookieStore.get('TRANSFER_CACHE_KEY')?.value;

  let transferCacheKey = '';
  if (transferCacheKeyRaw && encrypkey) {
    try {
      const bytes = CryptoJS.AES.decrypt(transferCacheKeyRaw, encrypkey);
      transferCacheKey = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (e) {
      console.error('Error decrypting TRANSFER_CACHE_KEY:', e);
    }
  }

  const transferDetailsPayload = {
    cacheKey: transferCacheKey,
    id: id,
    start_time_date: searchParams.pickUpDateServer,
    start_time_time: searchParams.pickUpTime,
    start_point_instructions: searchParams.pickUpLocation,
    hourly: '',
    end_point_instructions: searchParams.dropLocation,
    adult: searchParams.adult,
    children: searchParams.children,
    infant: searchParams.infants,
    luggage: searchParams.luggages,
    end_time_date: searchParams.pickUpDateServer,
    end_time_time: searchParams.end_time_time || '',
    travel_type: searchParams.searchType,
    flight_no: searchParams.flight_no,
    countryCode: searchParams.countryCode,
    provider: searchParams.provider,
    pickLocationType: searchParams.locationTypePick,
    dropoffLocationType: searchParams.locationTypeDrop,
  };

  const headers = {};
  if (selectedCurrency) {
    headers.currency = selectedCurrency;
  }

  try {
    const responseData = await axiosFrontNodeInstance.post(
      'transfer/vehicle-details',
      transferDetailsPayload,
      { headers }
    );

    if (responseData?.res_code === 200) {
      return responseData?.data;
    }
  } catch (error) {
    console.error('Transfer details error:', error);
  }
  return [];
}

export default async function TransferDetailsPage({ params, searchParams }) {
  const { id } = params;
  const vehicleDetails = await getTransferDetails(id, searchParams);

  return (
    <DetailsClient
      vehicleDetails={vehicleDetails}
      initialLoading={false}
      searchParamsObj={searchParams}
      id={id}
    />
  );
}
