// import Footer from '@/components/footer/page';
// import Header from '@/components/header/page';
// import MiddleComponent from '@/components/middleComponent';
import FooterLoader from '@/components/SkeletonLoader/FooterLoader';
import HeaderLoader from '@/components/SkeletonLoader/Header';
import LandingViewLoader from '@/components/SkeletonLoader/landingView';
import MiddleComponentLoader from '@/components/SkeletonLoader/MiddleComponentLoader';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { Suspense } from 'react';

export const metadata = {
  title: 'Stop searching, start booking your hotels at once',
};

// const Header = dynamic(() => import('../../../components/Header'), {
// const Header = dynamic(() => import('../../../components/header/page'), {
//   loading: () => <HeaderLoader />,
//   ssr: true,
// });
// const Footer = dynamic(() => import('../../../components/Footer'), {
//   loading: () => <FooterLoader />,
//   ssr: true,
// });
const MiddleComponent = dynamic(() => import('../../../components/middleComponent'), {
  loading: () => <MiddleComponentLoader />,
  ssr: true,
});

// const LandingView = dynamic(() => import('../../../components/hotels/landingView'), {
//   loading: () => <LandingViewLoader />,
//   ssr: true,
// });
const TravelHotelLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Stop searching, start booking your hotels at once</title>
      </Head>
      {/* <Header /> */}
      {children}
      {/* <LandingView /> */}
      {/* <MiddleComponent /> */}
      {/* <Suspense fallback={<MiddleComponentLoader />}> */}
      {/* <MiddleComponent /> */}
      {/* </Suspense> */}
      {/* <Footer /> */}
    </>
  );
};

export default TravelHotelLayout;
