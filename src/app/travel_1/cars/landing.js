'use client';
import dynamic from 'next/dynamic';
import MiddleComponentLoader from '@/components/middleComponent';
import LandingViewLoader from '@/components/SkeletonLoader/landingView';

const LandingView = dynamic(() => import('@/app/travel/cars/page'), {
  loading: () => <LandingViewLoader />,
  ssr: true,
});
const MiddleComponent = dynamic(() => import('@/components/middleComponent'), {
  loading: () => <MiddleComponentLoader />,
  ssr: true,
});

const CarIndex = () => {
  return (
    <>
      <h1>Stop searching, start booking your cars at once</h1>
      <LandingView />
      <MiddleComponent />
    </>
  );
};

export default CarIndex;
