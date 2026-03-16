'use client';

import LandingViewLoader from '@/components/SkeletonLoader/landingView';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const LandingView = dynamic(() => import('@/components/flights/landingView'), {
  loading: () => <LandingViewLoader />,
  ssr: true,
});
const FlightIndex = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('oneway');

  useEffect(() => {
    const searchType = searchParams.get('search_type');
    if (searchType) {
      setTimeout(() => {
        if (searchType === 'oneway') {
          setActiveTab('oneway');
        } else if (searchType === 'roundTrip') {
          setActiveTab('roundTrip');
        } else if (searchType === 'multicity') {
          setActiveTab('multicity');
        }
      }, 0);
    }
  }, [searchParams]);
  return (
    <>
      <h1>
        <title>Stop searching, start booking your flights at once</title>
      </h1>
      <LandingView setActiveTab={setActiveTab} activeTab={activeTab} />
    </>
  );
};

export default FlightIndex;
