import ListingClient from '@/components/flights/ListingClient';
import Moment from 'moment';
import { cookies } from 'next/headers';
import CryptoJS from 'crypto-js';
import axiosFrontNodeInstance from '@/utils/axiosFrontNodeInstance';
import { DEFAULT_CURRENCY, SELECTED_CURRENCY } from '@/utils/constants';

export const metadata = {
  title: 'Alta Booking - Flight Search Results',
};

async function getFlightData(searchParams) {
  const encrypkey = process.env.ENCRYPTION_KEY;
  const cookieStore = cookies();

  const authDataTokenHolderIdNode = cookieStore.get('authDataTokenHolderIdNode')?.value;
  const authDataTokenNode = cookieStore.get('authDataTokenNode')?.value;
  const selectedCurrency = cookieStore.get(SELECTED_CURRENCY)?.value;
  const tempValidation = cookieStore.get('tempValidation')?.value;

  let decryptedText = null;
  if (authDataTokenHolderIdNode && encrypkey) {
    try {
      var bytes = CryptoJS.AES.decrypt(authDataTokenHolderIdNode, encrypkey);
      decryptedText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } catch (e) {
      console.error('Decryption failed', e);
    }
  }

  let flightSearchParam = {};
  if (searchParams.travelType === 'multicity') {
    const multicityDetails = searchParams.multi_city_desination
      ? JSON.parse(searchParams.multi_city_desination)
      : [];
    let formattedMulticityDetails = [];
    for (let i = 0; i < multicityDetails.length; i++) {
      let tempOneCityDetails = {
        from_airport: multicityDetails[i].from_airport,
        to_airport: multicityDetails[i].to_airport,
        year: Moment(multicityDetails[i].departure_date).format('YYYY-MM-DD').split('-')[0],
        month: Moment(multicityDetails[i].departure_date).format('YYYY-MM-DD').split('-')[1],
        day: Moment(multicityDetails[i].departure_date).format('YYYY-MM-DD').split('-')[2],
      };
      formattedMulticityDetails.push(tempOneCityDetails);
    }
    flightSearchParam = {
      cacheKey: null,
      user_id: decryptedText,
      multi_city_desination: formattedMulticityDetails,
      adults: searchParams.adults,
      childs: searchParams.children,
      infants: searchParams.infants,
      class_type: searchParams.classType || '',
      travel_type: searchParams.travelType,
      max_result: 100,
      page: 1,
      perPage: searchParams.perPage || 6,
    };
  } else {
    let departureDate = Moment(searchParams.departureDate).format('YYYY-MM-DD').split('-');
    let returnDate = searchParams.returnDate
      ? Moment(searchParams.returnDate).format('YYYY-MM-DD').split('-')
      : [];

    flightSearchParam = {
      cacheKey: null,
      user_id: decryptedText,
      from_airport: searchParams.fromLocationIata || '',
      to_airport: searchParams.toLocationIata || '',
      year: departureDate[0] || '',
      month: departureDate[1] || '',
      day: departureDate[2] || '',
      round_year: returnDate.length === 3 ? returnDate[0] : '',
      round_month: returnDate.length === 3 ? returnDate[1] : '',
      round_day: returnDate.length === 3 ? returnDate[2] : '',
      adults: searchParams.adults,
      childs: searchParams.children,
      infants: searchParams.infants,
      class_type: searchParams.classType || '',
      travel_type: searchParams.travelType,
      max_result: 50,
      page: 1,
      perPage: 10,
    };
  }

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
    const responseData = await axiosFrontNodeInstance.post('/flight/search', flightSearchParam, {
      headers,
    });
    return responseData;
  } catch (error) {
    console.error('Flight search error:', error);
    return null;
  }
}

export default async function FlightListingPage({ searchParams }) {
  const data = await getFlightData(searchParams);

  return <ListingClient data={data} />;
}
