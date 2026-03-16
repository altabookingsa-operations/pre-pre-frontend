import ListingClient from '@/components/ferries/ListingClient';
import { cookies } from 'next/headers';
import axiosFrontNodeInstance from '@/utils/axiosFrontNodeInstance';
import { DEFAULT_CURRENCY, SELECTED_CURRENCY } from '@/utils/constants';

export const metadata = {
  title: 'Alta Booking - Ferry Search Results',
};

async function getFerryData(searchParams) {
  const cookieStore = cookies();

  const selectedCurrency = cookieStore.get(SELECTED_CURRENCY)?.value;
  const tempValidation = cookieStore.get('tempValidation')?.value;
  const authDataTokenNode = cookieStore.get('authDataTokenNode')?.value;

  const ferriesSearchParam = {
    cacheKey: null,
    routeId: searchParams.routeId,
    adult: Number(searchParams.adult),
    child: Number(searchParams.child),
    departureDateTime: searchParams.pickup_date?.concat('T', searchParams.pickup_time, ':00'),
    pets: searchParams.Pets ? JSON.parse(searchParams.Pets) : [],
    vehicles: searchParams.vehicles ? JSON.parse(searchParams.vehicles) : [],
    countryCode: searchParams.country_code,
    page: 1,
    perPage: searchParams.perPage || 10,
  };

  const headers = {
    currency: selectedCurrency || DEFAULT_CURRENCY,
  };

  if (authDataTokenNode) {
    headers.authorization = 'Bearer ' + authDataTokenNode;
  }

  if (tempValidation) {
    headers.admin_token = tempValidation;
  }

  try {
    const responseData = await axiosFrontNodeInstance.post('ferry/get-qoutes', ferriesSearchParam, {
      headers,
    });
    return responseData || '';
  } catch (error) {
    console.error('Ferry search error:', error);
    return '';
  }
}

export default async function FerryListingPage({ searchParams }) {
  const data = await getFerryData(searchParams);

  return <ListingClient data={data} />;
}
