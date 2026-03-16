import ListingClient from '@/components/cars/ListingClient';
import { cookies } from 'next/headers';
import CryptoJS from 'crypto-js';
import axiosFrontNodeInstance from '@/utils/axiosFrontNodeInstance';
import { DEFAULT_CURRENCY, SELECTED_CURRENCY } from '@/utils/constants';

export const metadata = {
  title: 'Alta Booking - Car Search Results',
};

async function getCarData(searchParams) {
  const cookieStore = cookies();
  const encrypkey = process.env.ENCRYPTION_KEY || process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

  const selectedCurrency = cookieStore.get(SELECTED_CURRENCY)?.value;
  const tempValidation = cookieStore.get('tempValidation')?.value;
  const authDataTokenHolderId = cookieStore.get('authDataTokenHolderId')?.value;

  let decryptedText = null;
  if (authDataTokenHolderId && encrypkey) {
    try {
      var bytes = CryptoJS.AES.decrypt(authDataTokenHolderId, encrypkey);
      decryptedText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (e) {
      console.error('Decryption failed', e);
    }
  }

  const carSearchParam = {
    cache_key: null,
    pick_location: searchParams.pickUp,
    drop_location: searchParams.dropOff || searchParams.pickUp,
    pickup_date_time: `${searchParams.pickUpDateUTC}T${searchParams.pickUpUtcTime}`,
    drop_date_time: `${searchParams.dropOffDateUTC}T${searchParams.dropOffUtcTime}`,
    country_code: searchParams.country_code,
    vehicle_rental_company: searchParams.carCompany,
    per_page: searchParams.perPage || 6,
    page: 1,
  };

  const headers = {
    currency: selectedCurrency || DEFAULT_CURRENCY,
  };

  if (tempValidation) {
    headers.admin_token = tempValidation;
  }

  try {
    const responseData = await axiosFrontNodeInstance.post('/car/car-list', carSearchParam, {
      headers,
    });
    return responseData;
  } catch (error) {
    console.error('Car search error:', error);
    return null;
  }
}

export default async function CarListingPage({ searchParams }) {
  const data = await getCarData(searchParams);

  return <ListingClient data={data} />;
}
