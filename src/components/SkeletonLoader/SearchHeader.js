import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SearchHeaderLoader = () => {
  return (
    <>
      <div className="row">
        <div className="col-xl-4">
          <div className="hotel-suggetion-check-in-out">
            <div className="row">
              <div className="col-lg-6">
                <div className="form-group">
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" height={50} />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <Skeleton animation="wave" />
                  <Skeleton animation="wave" height={50} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-5">
          <div className="row">
            <div className="col-lg-3">
              <div className="form-group">
                <Skeleton animation="wave" />
                <Skeleton animation="wave" height={50} />
              </div>
            </div>
            <div className="col-lg-3">
              <div className="form-group">
                <Skeleton animation="wave" />
                <Skeleton animation="wave" height={50} />
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="form-group">
                <Skeleton animation="wave" />
                <Skeleton animation="wave" height={50} />
              </div>
            </div>
            <div className="col-6 col-lg-3">
              <div className="form-group">
                <Skeleton animation="wave" />
                <Skeleton animation="wave" height={50} />
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-2">
          <div className="hotel-suggetion-last-two-btn">
            <button className="btn new-submit-btn" type="submit">
              <Skeleton animation="wave" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchHeaderLoader;
