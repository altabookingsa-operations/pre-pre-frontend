'use client';

import LandingViewLoader from '@/components/SkeletonLoader/landingView';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const LandingView = dynamic(() => import('../../../components/buses/LandingView'), {
  loading: () => <LandingViewLoader />,
  ssr: true,
});
const Buses = () => {
  const [activeTab, setActiveTab] = useState('oneway');
  const router = useRouter();
  useEffect(() => {
    if (router?.query?.search_type) {
      const { search_type } = router.query;
      if (search_type === 'oneway') {
        setActiveTab('oneway');
      } else if (search_type === 'roundTrip') {
        setActiveTab('roundTrip');
      }
    }
  }, [router.query]);
  return (
    <>
      {/* <div
        className="hotel-src-banner-section"
        style={{ backgroundImage: 'url(/images/buses-image.png)' }}
      > */}

      {/* <div className="container">
          <h1>Stop searching, start booking your buses at once</h1>
          <div className="new-transfer-new-form">
            <div className="inner-hotel-book-form-bx inner-hotel-book-form-bx333"> */}
      {/* <OneWay /> */}
      {/* <OneWay /> */}
      <LandingView setActiveTab={setActiveTab} activeTab={activeTab} />
      {/* </div>
          </div>
        </div> */}
      {/* </div> */}
    </>
  );
};

export default Buses;
