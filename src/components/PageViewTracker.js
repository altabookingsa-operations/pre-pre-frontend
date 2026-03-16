'use client';

import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axiosFrontNodeInstance from '../utils/axiosFrontNodeInstance';
// import axiosFrontNodeInstance from '../utils/axiosFrontNodeInstance';

// export default function PageViewTracker() {
//   useEffect(() => {
//     const trackPageView = async () => {
//       try {
//         if (typeof window === 'undefined') return;
//         if (sessionStorage.getItem('pageview_home_sent')) return;

//         const [ipResponse, pageListResponse] = await Promise.all([
//           fetch('https://pro.ip-api.com/json/?key=OviSLFVZm5We5p7'),
//           fetch('/pagewiseid.json'),
//         ]);

//         const ipData = await ipResponse.json();
//         const pageList = await pageListResponse.json();
//         const homePage = pageList.find(page => page.page_name === 'Home');

//         if (!homePage) return;

//         let sessionId = uuidv4();
//         const existingSessionId = sessionStorage.getItem('uid');
//         sessionId = existingSessionId || sessionId;
//         if (!existingSessionId) {
//           sessionStorage.setItem('uid', sessionId);
//         }

//         const pageViewPayload = {
//           page_id: homePage.page_id,
//           session_id: sessionId,
//           user_id: null,
//           page_name: homePage.page_name,
//           city: ipData?.city ?? null,
//           country: ipData?.country ?? null,
//           country_code: ipData?.countryCode ?? null,
//           lat: ipData?.lat ?? null,
//           lng: ipData?.lon ?? null,
//           ip: ipData?.query ?? null,
//           region: ipData?.region ?? null,
//           region_name: ipData?.regionName ?? null,
//           timezone: ipData?.timezone ?? null,
//         };

//         // console.log('Saving page view (Home):', pageViewPayload);
//         // await axiosFrontNodeInstance.post('savepageview', pageViewPayload);
//         // sessionStorage.setItem('pageview_home_sent', 'true');
//       } catch (error) {
//         console.error('Error tracking page view:', error);
//       }
//     };

//     trackPageView();
//   }, []);

//   return null; // This component doesn't render anything
// }
