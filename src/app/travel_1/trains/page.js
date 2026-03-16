'use client';
import { useState } from 'react';
import LandingViewLoader from '@/components/SkeletonLoader/landingView';
import dynamic from 'next/dynamic';

const LandingView = dynamic(() => import('@/components/trains/landingView'), {
  loading: () => <LandingViewLoader />,
  ssr: true,
});
const TrainIndex = () => {
  const [activeTab, setActiveTab] = useState('oneway');

  return (
    <>
      <h1>
        <title>Alta Booking</title>
      </h1>
      <LandingView setActiveTab={setActiveTab} activeTab={activeTab} />
    </>
  );
};

export default TrainIndex;
