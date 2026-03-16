import React from 'react';
import Slider from 'react-slick/lib/slider';
import Skeleton from 'react-loading-skeleton';

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
  autoplay: true,
  swipeToSlide: true,
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
        slidesToScroll: 1,
      },
    },
  ],
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};
const BannerLoader = () => {
  return (
    <>
      <div
        className="banner-start new-banner-home-start"
        style={{ backgroundImage: `url("images/banner-img.jpg")` }}
      >
        <div className="container">
          <div className="banner-caption">
            <h1>
              {' '}
              <Skeleton variant="rectangular" width={'50%'} height={30} />{' '}
            </h1>
            <h4>
              <Skeleton variant="rectangular" width={'100%'} height={30} />
            </h4>
            {/* <SearchBox /> */}
            <div className="row">
              <div className="col-lg-11 m-auto">
                <div className="banner-src-maike-box">
                  <div className="banner-search">
                    <div className="input-group">
                      <div className="new-inputcntrl-home">
                        <Skeleton
                          variant="rectangular"
                          width={'100%'}
                          className="form-control"
                          height={30}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="ban-voice-strt">
                    <div>
                      {/* <img src="images/mike.png" alt="" /> */}
                      <Skeleton
                        // className="btn btn-secondary"
                        variant="rectangular"
                        width={50}
                        height={50}
                        style={{
                          borderRadius: '50%',
                          //   paddingLeft: "5px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Slider {...settings2}>
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div className="item" key={i}>
                  <div>
                    <div className="ban-main-srvc-slide-bx">
                      <Skeleton
                        variant="rectangular"
                        width={'100%'}
                        height={'100%'}
                        className="transfer-car-img-main"
                      />{' '}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        {/* <img
          src="/images/home-shape-new.png"
          className="home-shape-new"
          alt=""
        /> */}
      </div>
    </>
  );
};

export default BannerLoader;
