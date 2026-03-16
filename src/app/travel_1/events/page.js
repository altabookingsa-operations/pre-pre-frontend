'use client';
import React from 'react';
import OneWay from './OneWay';
// import Oneway from './OneWay';

const Events = () => {
  return (
    <>
      <div
        className="hotel-src-banner-section"
        style={{ backgroundImage: 'url(/images/eventsBG.jpg)' }}
      >
        {/* <LandingView setGetDestinationLoading={setGetDestinationLoading} /> */}
        <div className="container">
          <h1>Stop searching, start booking your events at once</h1>
          <div className="new-transfer-new-form">
            <div className="inner-hotel-book-form-bx inner-hotel-book-form-bx333">
              {/* <OneWay /> */}
              <OneWay />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
