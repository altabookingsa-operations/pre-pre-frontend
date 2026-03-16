import MiddleComponentLoader from '@/components/SkeletonLoader/MiddleComponentLoader';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';

import LandingViewLoader from '@/components/SkeletonLoader/landingView';

export const metadata = {
  title: 'Stop searching, start booking your tours at once',
};
// const MiddleComponent = dynamic(() => import('../../../components/middleComponent'), {
//   loading: () => <MiddleComponentLoader />,
//   ssr: true,
// });
// const Tours = dynamic(() => import('./page'), {
//   loading: () => <LandingViewLoader />,
//   ssr: true,
// });
const TravelTourLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Stop searching, start booking your tours at once</title>
      </Head>
      {/* <Header /> */}
      {children}

      {/* <MiddleComponent /> */}
      {/* </Suspense> */}
      {/* <Footer /> */}
    </>
  );
};

export default TravelTourLayout;
