import MiddleComponentLoader from '@/components/SkeletonLoader/MiddleComponentLoader';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React from 'react';
export const metadata = {
  title: 'Stop searching, start booking your buses at once',
};
const MiddleComponent = dynamic(() => import('../../../components/middleComponent'), {
  loading: () => <MiddleComponentLoader />,
  ssr: true,
});
const TravelBusLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Stop searching, start booking your events at once</title>
      </Head>
      {/* <Header /> */}
      {children}

      {/* <MiddleComponent /> */}
    </>
  );
};

export default TravelBusLayout;
