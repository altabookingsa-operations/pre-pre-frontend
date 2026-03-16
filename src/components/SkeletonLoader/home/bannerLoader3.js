import React from 'react';
import Skeleton from 'react-loading-skeleton';
import Slider from 'react-slick/lib/slider';
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: 'block' }} onClick={onClick} />;
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: 'block' }} onClick={onClick} />;
}
const settings2 = {
  autoplay: true,
  swipeToSlide: true,
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
        slidesToScroll: 5,

        speed: 500,
        infinite: true,
        dots: false,
        swipeToSlide: true,
        centerMode: true,
        centerPadding: '70px',
      },
    },
  ],
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};
const BannerLoader3 = () => {
  return (
    <>
      <section
        className="trending-event-new-section"
        style={{ backgroundImage: 'url(images/trending-event-back.png)' }}
      >
        <div className="container">
          <div className="heading-hd-new-home">
            <h2>
              <Skeleton variant="rectangular" width={'20%'} height={20} />{' '}
              <span>
                <Skeleton variant="rectangular" width={'50%'} height={20} />{' '}
              </span>
            </h2>
          </div>
          <div className="trending-event-desktop">
            <div className="row">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div className="col-sm-4 pr-lg-0" key={i}>
                  <div className="trending-event-main-bx">
                    <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
                    <div className="trending-event-mn-cptn">
                      <h4>
                        {' '}
                        <Skeleton variant="rectangular" width={'20%'} height={20} />{' '}
                      </h4>
                      <p>
                        <Skeleton variant="rectangular" width={'80%'} height={20} />{' '}
                      </p>
                      <p>
                        <b>
                          <Skeleton variant="rectangular" width={'90%'} height={20} />{' '}
                        </b>
                      </p>
                      <p>
                        <Skeleton variant="rectangular" width={'100%'} height={20} />{' '}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="trending-event-mobile">
          <Slider {...settings2}>
            {[1, 2, 3, 4].map(i => (
              <div className="trending-event-main-bx" key={i}>
                {/* <img src={item.img} alt="" /> */}
                <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
                <div className="trending-event-mn-cptn">
                  <h4>
                    <Skeleton variant="rectangular" width={'100%'} height={20} />{' '}
                  </h4>
                  <p>
                    <Skeleton variant="rectangular" width={'100%'} height={20} />{' '}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default BannerLoader3;
