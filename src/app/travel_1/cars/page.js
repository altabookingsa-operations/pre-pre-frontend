'use client';
import React from 'react';
import OneWay from './OneWay';

const LandingView = () => {
  return (
    <>
      <div
        className="hotel-src-banner-section"
        style={{ backgroundImage: 'url(/images/banner-srvc-img5.webp)' }}
      >
        <div className="container">
          <h1>Stop searching, start booking your cars at once</h1>
          <div className="new-transfer-new-form">
            <div className="inner-hotel-book-form-bx">
              <OneWay />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingView;
