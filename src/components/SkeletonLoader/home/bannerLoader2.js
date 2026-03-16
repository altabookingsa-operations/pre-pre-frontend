import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Slider from 'react-slick/lib/slider';
const settings2 = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  // autoplay: true,
  swipeToSlide: true,
  className: 'center',
  centerMode: true,
  centerPadding: '260px',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
  // nextArrow: <SampleNextArrow />,
  // prevArrow: <SamplePrevArrow />,
};
const BannerLoader2 = () => {
  return (
    <>
      <section className="alta-booking-glance">
        <img src="/images/glance-right-img.png" className="glance-right-img" alt="" />
        <div className="container">
          <div className="heading-hd-new-home">
            <h2>
              <Skeleton variant="rectangular" width={'50%'} height={30} />{' '}
            </h2>
            {/* <p>
              De nombreuses suites logicielles de mise en page ou éditeurs de
              sites Web ont fait du Lorem Ipsum leur faux texte par défaut
            </p> */}
          </div>
        </div>
        <div className="alta-booking-glance-tab-start">
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a className="nav-link active show" data-toggle="tab" href="#glance1" role="tab">
                <div className="glnc-tb-numb">
                  <Skeleton
                    variant="rectangular"
                    width={30}
                    height={30}
                    style={{
                      borderRadius: '50%',
                    }}
                    className="glnc-tb-numb-middle"
                  />{' '}
                </div>
                <p>
                  {' '}
                  <Skeleton variant="rectangular" width={'50%'} height={30} />{' '}
                </p>
              </a>
            </li>{' '}
            <li className="nav-item">
              <a className="nav-link active show" data-toggle="tab" href="#glance1" role="tab">
                <div className="glnc-tb-numb">
                  <Skeleton
                    variant="rectangular"
                    width={30}
                    height={30}
                    style={{
                      borderRadius: '50%',
                    }}
                    className="glnc-tb-numb-middle"
                  />{' '}
                </div>
                <p>
                  {' '}
                  <Skeleton variant="rectangular" width={'50%'} height={30} />{' '}
                </p>
              </a>
            </li>{' '}
            <li className="nav-item">
              <a className="nav-link active show" data-toggle="tab" href="#glance1" role="tab">
                <div className="glnc-tb-numb">
                  <Skeleton
                    variant="rectangular"
                    width={30}
                    height={30}
                    style={{
                      borderRadius: '50%',
                    }}
                    className="glnc-tb-numb-middle"
                  />{' '}
                </div>
                <p>
                  {' '}
                  <Skeleton variant="rectangular" width={'50%'} height={30} />{' '}
                </p>
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-pane active show" id="glance1" role="tabpanel">
              <div className="glance-srvc-slider-start">
                <div className="alta-booking-glance-slider">
                  <Slider {...settings2}>
                    {[1, 2, 3, 4].map((item, i) => (
                      <div className="item" key={i}>
                        <div className="glance-img-slider">
                          <Skeleton
                            className="glance-new-img"
                            variant="rectangular"
                            width={'100%'}
                            height={'100%'}
                          />
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BannerLoader2;
