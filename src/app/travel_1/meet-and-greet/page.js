'use client';
import React, { useEffect, useState } from 'react';
import OneWay from './OneWay';
import Connection from './Connection';
import { useRouter } from 'next/navigation';

const TravelMeetGreet = () => {
  const [activeTab, setActiveTab] = useState('oneway');
  const router = useRouter();
  useEffect(() => {
    if (router?.query?.search_type) {
      const { search_type } = router.query;
      if (search_type === 'oneway') {
        setActiveTab('oneway');
      } else if (search_type === 'connection') {
        setActiveTab('connection');
      }
    }
  }, [router.query]);
  return (
    <>
      <div
        className="hotel-src-banner-section"
        style={{ backgroundImage: 'url(/images/meet-and-greet-view-img.jpg)' }}
      >
        <div className="container">
          <h1>Stop searching, start booking your Airport Meet & Greet at once</h1>
          <div className="new-transfer-new-form">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item">
                <button
                  id="oneway"
                  className={activeTab === 'oneway' ? 'nav-link active' : 'nav-link'}
                  style={{
                    outline: 'none',
                    padding: '14px',
                  }}
                  onClick={() => setActiveTab('oneway')}
                >
                  <img src="/images/transfer-icon1.png" alt="" />
                  One way
                </button>
              </li>
              <li className="nav-item">
                <button
                  id="connection"
                  className={activeTab === 'connection' ? 'nav-link active' : 'nav-link'}
                  style={{
                    outline: 'none',
                    padding: '14px',
                  }}
                  onClick={() => setActiveTab('connection')}
                >
                  <img src="/images/multicity-icon.png" alt="" />
                  {/* Round trip */}
                  Connection
                </button>
              </li>
            </ul>
            <div className="tab-content">
              {/* <div className="tab-pane in active" id="oneway" role="tabpanel">
                <div className="inner-hotel-book-form-bx" style={{ paddingBottom: '60px' }}>
                  <OneWay setActiveTab={setActiveTab} />
                </div>
              </div> */}
              {activeTab === 'oneway' && (
                <div id="oneway">
                  <div className="inner-hotel-book-form-bx" style={{ paddingBottom: '60px' }}>
                    <OneWay setActiveTab={setActiveTab} />
                  </div>
                </div>
              )}
              {activeTab === 'connection' && (
                <div id="connection">
                  <div className="inner-hotel-book-form-bx" style={{ paddingBottom: '60px' }}>
                    <Connection setActiveTab={setActiveTab} />
                  </div>
                </div>
              )}
              {/* <div className="tab-pane" id="connection" role="tabpanel">
                <div className="inner-hotel-book-form-bx" style={{ paddingBottom: '60px' }}>
                  <Connection setActiveTab={setActiveTab} />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TravelMeetGreet;
