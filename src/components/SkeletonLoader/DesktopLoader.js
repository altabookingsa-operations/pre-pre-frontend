import React, { useRef } from 'react';
import SearchHeaderLoader from './SearchHeader';
import Slider from 'react-slick';
import Skeleton from 'react-loading-skeleton';
import MapLoader from './MapLoader';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: 'block' }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: 'block' }} onClick={onClick} />;
}
const settings2 = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

const DesktopLoader = () => {
  return (
    <>
      <div
        className="hotel-suggetion-banner-section"
        style={{ backgroundImage: 'url(/images/banner-img.jpg)' }}
      >
        <div className="hotel-suggestion-ban-bx1">
          <div className="container-fluid">
            <SearchHeaderLoader />
          </div>
        </div>

        <div
          id="dynamic-hotel-sugg2"
          className="hotel-suggestion-ban-bx2 hotel-suggestion-ban-bx-main11"
        >
          <div className="htl-sugg-nw-close-btn">
            <i className="fa-solid fa-xmark" />
          </div>
          <div className="container">
            <h3>
              {' '}
              <Skeleton variant="rectangular" width={210} />{' '}
            </h3>
            <Slider {...settings2}>
              {[1, 3, 4, 5, 6, 7].map(i => (
                <div className="ban-new-srvc-slide-bx" key={i}>
                  <div className={'ban-main-srvc-slide-bx'}>
                    {/* <img src="/images/meet-and-greet-view-img.jpg" alt="" /> */}
                    <Skeleton variant="rectangular" width={210} height={90} />

                    <a href="#" className="ban-srvc-btn">
                      <Skeleton variant="rectangular" />
                    </a>
                  </div>
                  <div className="htl-sugg-srvc-plus-bx">
                    <i className="fa-solid fa-plus" />
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      <div className="hotel-suggetions-main-three-bx m-0">
        <div className="container-fluid">
          <div className="row">
            {/*date column start */}
            <div className="col-xl-3 pl-xl-0 d-flex align-items-stretch">
              <div className="plan-suggetions-itinerary-bx">
                <div className="plan-sugg-itinerary-hd">
                  <h4>
                    {' '}
                    <Skeleton variant="rectangular" width={90} />{' '}
                  </h4>
                  <div className="itinerary-hd-close">
                    <i className="fa-solid fa-xmark" />
                  </div>
                </div>
                <div className="plan-suggetions-itinerary-section-main">
                  <div className="accordion">
                    {[1, 2, 3, 4, 5, 6, 7].map(i => (
                      <div className="card" key={i}>
                        <div className="itinerary-add-btn">
                          <Skeleton
                            variant="rectangular"
                            width={50}
                            //   height={90}
                          />
                        </div>
                        <div className="card-header collapsed">
                          <a className="card-title">
                            {/* {item.format("ddd D MMM yyyy")} */}
                            <Skeleton
                              variant="rectangular"
                              width={140}
                              //   height={90}
                            />
                          </a>
                        </div>
                        <div className="card-body collapse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/*date column end */}

            <div className={'col-xl-6 d-flex align-items-stretch pl-lg-0 pr-lg-0'}>
              <div className="hotel-suggetions-middle-main-box">
                <div className="hotel-sugg-mid-heading-bx transfer-new-hd-box">
                  <div>
                    <h3>
                      {' '}
                      <Skeleton variant="rectangular" width={90} />{' '}
                    </h3>
                    <p className="hotel-sugg-slct-optn-text-hd">
                      <Skeleton variant="rectangular" width={200} />{' '}
                    </p>
                  </div>
                  <div></div>
                </div>

                <div className="transfer-sugg-promain-start">
                  <div className="transfer-pick-drop-box">
                    <div className="transfer-pick-drop-main-bx">
                      <Skeleton
                        variant="rectangular"
                        width={30}
                        height={30}
                        style={{
                          borderRadius: '50%',
                          paddingLeft: '5px',
                        }}
                      />
                      <div>
                        <h5>
                          <Skeleton variant="rectangular" width={90} />
                        </h5>

                        <h4>
                          <Skeleton variant="rectangular" width={200} />
                        </h4>
                      </div>

                      <Skeleton variant="rectangular" width={90} className="long-arrow" />
                    </div>
                    <div className="transfer-pick-drop-main-bx">
                      <Skeleton
                        variant="rectangular"
                        width={30}
                        height={30}
                        style={{
                          borderRadius: '50%',
                          paddingLeft: '5px',
                        }}
                      />
                      <div>
                        <h5>
                          <Skeleton variant="rectangular" width={90} />
                        </h5>

                        <h4>
                          <Skeleton variant="rectangular" width={200} />
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="transfer-car-main-box-newscrollbar">
                    {/*list column start */}
                    {[1, 2, 3, 4].map(i => (
                      <div key={i}>
                        <div className="transfer-car-main-box-new">
                          <div className="row align-items-center">
                            <div className="col-xl-5">
                              <div className="trnsfr-car-img-bx-start">
                                <div className="trnsfr-car-img-new">
                                  <Skeleton
                                    variant="rectangular"
                                    width={100}
                                    height={96}
                                    className="transfer-car-img-main"
                                  />{' '}
                                </div>
                                <h4>
                                  <Skeleton variant="rectangular" width={120} />{' '}
                                </h4>
                              </div>
                            </div>
                            <div className="col-xl-4">
                              <ul className="list-unstyled transfer-carnew-option">
                                {[1, 2, 3, 4].map(j => (
                                  <li key={j}>
                                    <Skeleton variant="rectangular" width={120} />
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div className="col-xl-3">
                              <div className="htl-sugg-pro-price-bx">
                                <p>
                                  <Skeleton variant="rectangular" width={80} />
                                </p>
                                <h4>
                                  <Skeleton variant="rectangular" width={100} />
                                </h4>
                                <div className="htl-sugg-pro-two-btn">
                                  <button type="button" className="btn htl-sugg-new-btn1">
                                    <Skeleton variant="rectangular" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/*list column end */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 pr-xl-0 d-flex align-items-stretch">
              <div className="trnsfer-cart-right-bx">
                <div className="trip-planner-nw-map">
                  <MapLoader />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesktopLoader;
