'use client';
import dynamic from 'next/dynamic';

import Loader from '@/components/Loader';
import { useState } from 'react';
import LandingViewLoader from '@/components/SkeletonLoader/landingView';

const LandingView = dynamic(() => import('@/components/ferries/landingView'), {
  loading: () => <LandingViewLoader />,
  ssr: true,
});
const FerriesIndex = () => {
  const [getPortLoading, setGetPortLoading] = useState(false);
  return (
    <>
      <h1>
        <title>Stop searching, start booking your ferries at once</title>
      </h1>
      {getPortLoading && <Loader />}
      <LandingView setGetPortLoading={setGetPortLoading} />
    </>
  );
};

export default FerriesIndex;
