'use client';
import dynamic from 'next/dynamic';
import MiddleComponentLoader from '@/components/SkeletonLoader/MiddleComponentLoader';

const MiddleComponent = dynamic(() => import('@/components/middleComponent'), {
  loading: () => <MiddleComponentLoader />,
  ssr: true,
});

export default function TravelLayout({ children }) {
  return (
    <>
      {children}
      <MiddleComponent />
    </>
  );
}
