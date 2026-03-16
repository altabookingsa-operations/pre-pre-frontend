import React from 'react';
import Skeleton from 'react-loading-skeleton';

const LandingViewLoader = () => {
  return (
    <>
      <div
        className="hotel-src-banner-section"
        style={{ backgroundImage: 'url(/images/banner-srvc-img6.jpg)' }}
      >
        <div className="container">
          <h1>
            {' '}
            <Skeleton variant="rectangular" width={'100%'} height={20} />{' '}
            <Skeleton variant="rectangular" width={'50%'} height={20} />{' '}
          </h1>
          <div className="new-transfer-new-form">
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" data-toggle="tab" href="#oneway" role="tab">
                  <Skeleton
                    variant="rectangular"
                    width={20}
                    height={20}
                    style={{
                      borderRadius: '50%',
                    }}
                  />
                  <Skeleton variant="rectangular" width={100} />{' '}
                </a>
              </li>
            </ul>
            <div className="tab-content">
              <div className="tab-pane in active" id="oneway" role="tabpanel">
                <div className="inner-hotel-book-form-bx">
                  {/* <OneWay /> */}

                  <div className="row">
                    <div className="col-lg-5">
                      <div className="form-group">
                        <label>
                          {' '}
                          <Skeleton variant="rectangular" width={100} />{' '}
                        </label>
                        <div className="frm-new-icon-box-all">
                          <Skeleton variant="rectangular" width={'100%'} height={50} />{' '}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 d-none d-lg-block">
                      <div className="new-double-arrow-img">
                        <Skeleton
                          variant="rectangular"
                          width={20}
                          height={20}
                          style={{
                            borderRadius: '50%',
                          }}
                        />
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="form-group">
                        <label>
                          {' '}
                          <Skeleton variant="rectangular" width={100} />{' '}
                        </label>
                        <div className="frm-new-icon-box-all">
                          <Skeleton variant="rectangular" width={'100%'} height={50} />{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-3">
                      <div className="form-group">
                        <label>
                          {' '}
                          <Skeleton variant="rectangular" width={100} />{' '}
                        </label>
                        <div className="frm-new-icon-box-all">
                          <Skeleton variant="rectangular" width={'100%'} height={50} />{' '}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="form-group">
                        <label>
                          {' '}
                          <Skeleton variant="rectangular" width={100} />{' '}
                        </label>
                        <div className="frm-new-icon-box-all">
                          <Skeleton variant="rectangular" width={'100%'} height={50} />{' '}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="form-group">
                        <label>
                          {' '}
                          <Skeleton variant="rectangular" width={100} />{' '}
                        </label>
                        <div className="frm-new-icon-box-all">
                          <Skeleton variant="rectangular" width={'100%'} height={50} />{' '}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3">
                      <div className="form-group">
                        <label>
                          {' '}
                          <Skeleton variant="rectangular" width={100} />{' '}
                        </label>
                        <div className="frm-new-icon-box-all">
                          <Skeleton variant="rectangular" width={'100%'} height={50} />{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hotel-ban-form-submit-btn">
                    <button className="btn new-submit-btn" type="submit">
                      <Skeleton variant="rectangular" width={100} />{' '}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingViewLoader;
