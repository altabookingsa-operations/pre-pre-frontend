'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { LoadScriptNext } from '@react-google-maps/api';
import OneWay from './OneWay';
import Hourly from './Hourly';
// import RoundTripAirport from './RoundTripNew';

const libraries = ['drawing', 'places'];

const LandingView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read from URL
  const searchType = searchParams.get('search_type');

  // Derive active tab safely
  const activeTab = ['oneway', 'hourly'].includes(searchType) ? searchType : 'oneway';

  // Update URL when tab changes
  const handleTabChange = tab => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('search_type', tab);

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <LoadScriptNext
        libraries={libraries}
        id="script-loader"
        googleMapsApiKey={process.env.NEXT_PUBLIC_REACT_APP_GOOGLE}
        loadingElement={<>Loading...</>}
      >
        <div
          className={'hotel-src-banner-section'}
          style={{ backgroundImage: 'url(/images/banner-srvc-img6.jpg)' }}
        >
          <div className="container">
            <h1>Stop searching, start booking your transfer at once</h1>

            <div className="new-transfer-new-form">
              <ul className="nav nav-tabs" role="tablist">
                {['oneway', 'hourly'].map(tab => (
                  <li className="nav-item" key={tab}>
                    <button
                      className={`nav-link ${activeTab === tab ? 'active' : ''}`}
                      style={{ outline: 'none' }}
                      onClick={() => handleTabChange(tab)}
                    >
                      <img src="/images/transfer-icon1.png" alt={tab} />
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="tab-content">
                {activeTab === 'oneway' && (
                  <div className="inner-hotel-book-form-bx">
                    <OneWay />
                  </div>
                )}

                {activeTab === 'hourly' && (
                  <div className="inner-hotel-book-form-bx">
                    <Hourly />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </LoadScriptNext>
    </>
  );
};

export default LandingView;
