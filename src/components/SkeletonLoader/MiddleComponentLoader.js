import React from 'react';
import Skeleton from 'react-loading-skeleton';

const MiddleComponentLoader = () => {
  return (
    <>
      <section className="home-new-discover-section">
        <Skeleton
          variant="rectangular"
          width={'100%'}
          height={'100%'}
          className="d-none d-sm-block"
        />{' '}
        <div className="home-discover-mobile-sec">
          <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
          <p>
            <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
          </p>
          <Skeleton
            // src="/images/discover-bottom-img.png"
            className="discover-bottom-img-new"
            width={'100%'}
            height={150}
            // alt=""
          />
        </div>
      </section>
    </>
  );
};

export default MiddleComponentLoader;
