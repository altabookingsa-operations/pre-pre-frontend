import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Slider from 'react-slick/lib/slider';
const settings2 = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 2,
  autoplay: true,
  swipeToSlide: true,
  // className: "center",
  // centerMode: true,
  // centerPadding: "60px",
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
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
        slidesToScroll: 5,

        speed: 500,
        infinite: true,
        dots: true,
        swipeToSlide: true,
        centerMode: true,
        centerPadding: '90px',
      },
    },
  ],
};
const BannerLoader4 = () => {
  return (
    <>
      <section
        className="explore-trending-destination-section"
        style={{
          backgroundImage: 'url(images/explore-trending-destination.png)',
        }}
      >
        <div className="container">
          <div className="heading-hd-new-home">
            <h2>
              <Skeleton variant="rectangular" width={'50%'} height={30} />{' '}
            </h2>
          </div>
        </div>
        <div className="explore-trending-slider-start">
          <div className="explore-trending-slider">
            <Slider {...settings2}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                <div className="item" key={i}>
                  <div className="explore-trending-main-box">
                    <Skeleton variant="rectangular" width={'100%'} height={'100%'} />{' '}
                    <p className="explore-srvc-btn">
                      <Skeleton variant="rectangular" width={'50%'} height={30} />{' '}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    </>
  );
};

export default BannerLoader4;
