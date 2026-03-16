'use client';

import dynamic from 'next/dynamic';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import { DEFAULT_CURRENCY, SELECTED_CURRENCY } from '../../../../utils/constants';
import axiosFrontNodeInstance from '../../../../utils/axiosFrontNodeInstance';
import DesktopLoader from '../../../../components/SkeletonLoader/DesktopLoader';
import MiddleComponentLoader from '../../../../components/SkeletonLoader/MiddleComponentLoader';

// const Header = dynamic(() => import('../../../../components/Header'), {
//   loading: () => <HeaderLoader />,
//   ssr: false,
// });
// const Footer = dynamic(() => import('../../../../components/Footer'), {
//   loading: () => <FooterLoader />,
//   ssr: false,
// });
const MiddleComponent = dynamic(() => import('../../../../components/middleComponent.js'), {
  loading: () => <MiddleComponentLoader />,
  ssr: false,
});
const Desktop = dynamic(() => import('../../../../components/transfers/Desktop.js'), {
  loading: () => <DesktopLoader />,
  ssr: false,
});
// const Mobile = dynamic(() => import('../../../../components/transfers/Mobile'), {
//   loading: () => <MobileLoader />,
//   ssr: false,
// });

const Listing = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : '');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  function handleWindowSizeChange() {
    setWidth(typeof window !== 'undefined' ? window.innerWidth : '');
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  // Fetch transfer listings
  useEffect(() => {
    const fetchTransferListings = async () => {
      try {
        setLoading(true);

        // Get encrypted auth token from cookies
        const encrypkey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
        let decryptedText = null;

        const authToken = Cookies.get('authDataTokenHolderIdNode');
        if (authToken && encrypkey) {
          try {
            const bytes = CryptoJS.AES.decrypt(authToken, encrypkey);
            decryptedText = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          } catch (error) {
            console.error('Error decrypting auth token:', error);
          }
        }

        // Build transfer search parameters from URL
        const transferSearchParam = {
          cacheKey: null,
          start_place_id: searchParams.get('pickUpPlaceId'),
          end_place_id: searchParams.get('dropPlaceId'),
          start_time_date: searchParams.get('pickUpDateServer'),
          start_time_time: searchParams.get('pickUpTime'),
          start_point_instructions: searchParams.get('pickUpLocation'),
          end_point_instructions: searchParams.get('dropLocation'),
          adult: searchParams.get('adult'),
          children: searchParams.get('children'),
          infant: searchParams.get('infants'),
          luggage: searchParams.get('luggages') ?? 0,
          user_id: decryptedText,
          end_time_date: searchParams.get('pickUpDateServer'),
          end_time_time: searchParams.get('end_time_time') || '',
          travel_type: searchParams.get('searchType')?.toLowerCase(),
          page: 1,
          perPage: width >= 1200 ? 10 : 2,
          flight_no: searchParams.get('flight_no') ?? '',
          countryCode: searchParams.get('countryCode'),
          pickUpLat: searchParams.get('pickUpLatLng')
            ? JSON.parse(searchParams.get('pickUpLatLng'))?.Latitude?.toString()
            : '',
          pickUpLng: searchParams.get('pickUpLatLng')
            ? JSON.parse(searchParams.get('pickUpLatLng'))?.Longitude?.toString()
            : '',
          dropOffLat: searchParams.get('dropOffLatLng')
            ? JSON.parse(searchParams.get('dropOffLatLng'))?.Latitude?.toString()
            : '',
          dropOffLng: searchParams.get('dropOffLatLng')
            ? JSON.parse(searchParams.get('dropOffLatLng'))?.Longitude?.toString()
            : '',
          hourly:
            searchParams.get('searchType')?.toLowerCase() === 'hourly'
              ? searchParams.get('hourly')
              : '',
          pickLocationType: searchParams.get('locationTypePick'),
          dropLocationType: searchParams.get('locationTypeDrop'),
          airport_name: searchParams.get('aiport_name'),
        };

        console.log('transferSearchParam', transferSearchParam);

        // Set currency header
        const selectedCurrency = Cookies.get(SELECTED_CURRENCY) || DEFAULT_CURRENCY;
        axiosFrontNodeInstance.defaults.headers.common['currency'] = selectedCurrency;
        axiosFrontNodeInstance.defaults.headers.admin_token = Cookies.get('tempValidation');

        // Fetch data
        const responseData = await axiosFrontNodeInstance.post(
          '/transfer/list',
          transferSearchParam
        );

        setData(responseData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transfer listings:', error);
        setLoading(false);
      }
    };

    if (searchParams.get('pickUpLocation')) {
      fetchTransferListings();
    }
  }, [searchParams, width]);

  // Update perPage when width changes (skip first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Build new query params
    const params = new URLSearchParams(searchParams.toString());
    params.set('perPage', width >= 1200 ? '10' : '2');

    // Navigate with updated params
    router.push(`/travel/transfers/listing?${params.toString()}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  // Convert searchParams to object for header prop
  const queryObject = {};
  searchParams.forEach((value, key) => {
    queryObject[key] = value;
  });

  if (loading) {
    return (
      <>
        {/* <Header /> */}
        <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
          <h2>Loading transfer options...</h2>
        </div>
        <MiddleComponent />
        {/* <Footer /> */}
      </>
    );
  }

  return (
    <>
      {width >= 1200 && <Desktop response={data} header={queryObject} />}
      {/* {width <= 1200 && <Mobile response={data} header={queryObject} />} */}
      <MiddleComponent />
    </>
  );
};

export default Listing;
