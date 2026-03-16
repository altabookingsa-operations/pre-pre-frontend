'use client';

import Loader from '@/components/Loader';
import LandingView from '@/components/tours/LandingView';
import { useState } from 'react';
// import TourBanner from '@/components/tours/TourBanner';
// import Loader from '@/components/Loader';

export default function LandingTours() {
  const [getDestinationLoading, setGetDestinationLoading] = useState(false);

  return (
    <>
      {getDestinationLoading && <Loader />}

      <div
        className="hotel-src-banner-section"
        style={{ backgroundImage: 'url(/images/tour-act-banner.png)' }}
      >
        <LandingView setGetDestinationLoading={setGetDestinationLoading} />
      </div>
    </>
  );
}
