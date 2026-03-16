import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Slider from 'react-slick/lib/slider';
import MapLoader from './MapLoader';
const settings2 = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: false,
        infinite: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: false,
        infinite: true,
      },
    },
  ],
};
const MobileLoader = () => {
  return (
    <>
      <div
        className="hotel-suggetion-banner-section-new-mobile"
        style={{ backgroundImage: 'url(/images/banner-img.jpg)' }}
      >
        <div className="slct-srvc-add-modify-src-sec">
          <h4>
            <Skeleton variant="rectangular" width={140} />
          </h4>
          <a href="#!" className="btn htl-sugg-new-btn1">
            <Skeleton variant="rectangular" width={50} />
          </a>
        </div>
        <div className="new-hotel-suggestion-ban-bx">
          <div className="transfer-banner-srvc-slider owl-carousel owl-theme">
            {[1, 2, 3, 4].map(i => (
              <div className="item" key={i}>
                <div className={'ban-main-srvc-slide-bx'}>
                  <div className="ban-main-srvc-slide-bx">
                    {/* <img src="/images/banner-srvc-img6.jpg" alt="" /> */}
                    <Skeleton variant="rectangular" width={'100%'} height={90} />
                    <button className="ban-srvc-btn">
                      {' '}
                      <Skeleton variant="rectangular" width={50} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>{' '}
      <div className="mobile-sugg-transfer-section">
        <div className="hotel-sugg-mid-heading-bx transfer-new-hd-box">
          <div>
            <h3>
              {' '}
              <Skeleton variant="rectangular" width={100} />
            </h3>
            <p className="hotel-sugg-slct-optn-text-hd">
              <Skeleton variant="rectangular" width={210} />
            </p>
          </div>
          <div />
          <ul className="list-inline list-map-view-btn">
            <li>
              <Skeleton variant="rectangular" width={30} height={30} />
            </li>
          </ul>
        </div>

        <div className="transfer-pick-drop-box transfer-pick-drop-box-new-bobile">
          <div className="transfer-pick-drop-main-bx">
            <Skeleton
              variant="rectangular"
              width={20}
              height={20}
              style={{
                borderRadius: '50%',
                paddingLeft: '5px',
              }}
            />
            <div>
              <div className="transfer-pick-left-padd">
                <h5>
                  <Skeleton variant="rectangular" width={100} />
                </h5>

                <h4>
                  {' '}
                  <Skeleton variant="rectangular" width={100} />
                </h4>
              </div>
            </div>
            {/* <img src="/images/long-arrow.png" className="long-arrow" alt="" /> */}
            <Skeleton variant="rectangular" width={30} className="long-arrow" />
          </div>
          <div className="transfer-pick-drop-main-bx pl-2">
            <Skeleton
              variant="rectangular"
              width={20}
              height={20}
              style={{
                borderRadius: '50%',
                paddingLeft: '5px',
              }}
            />
            <div>
              <div className="transfer-pick-left-padd">
                <h5>
                  <Skeleton variant="rectangular" width={100} />
                </h5>

                <h4>
                  {' '}
                  <Skeleton variant="rectangular" width={100} />
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-listing-slick-slider">
          <Slider {...settings2}>
            {[1, 2].map(i => (
              <div className="item" key={i}>
                <div className="mobile-sugg-transfer-main-pro-bx">
                  <div className="mobile-sugg-transfer-car-img">
                    <Skeleton
                      variant="rectangular"
                      width={100}
                      height={96}
                      className="transfer-car-img-main"
                    />{' '}
                  </div>
                  <div className="mobile-sugg-transfer-car-caption">
                    <h4>
                      <Skeleton variant="rectangular" width={100} />
                    </h4>
                    <div className="mobile-sugg-transfer-captn2">
                      <p>
                        {' '}
                        <Skeleton variant="rectangular" width={100} />
                      </p>
                      <h5>
                        <Skeleton variant="rectangular" width={150} />
                      </h5>
                      <button type="button" className="btn htl-sugg-new-btn1">
                        <Skeleton variant="rectangular" width={50} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="mobile-trip-planner-nw-map" id="cartSection">
        <MapLoader />
      </div>
    </>
  );
};

export default MobileLoader;
