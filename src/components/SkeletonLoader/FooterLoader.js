import React from 'react';
import Skeleton from 'react-loading-skeleton';

const FooterLoader = () => {
  return (
    <>
      <footer
        className="footer-section"
        style={{ backgroundImage: `url("/images/footer-back.jpg")` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-sm-6">
              <h4>
                {' '}
                <Skeleton variant="rectangular" width={'100%'} />{' '}
              </h4>
              <ul className="list-unstyled ft-nav">
                {[1, 2].map(i => (
                  <li key={i}>
                    <Skeleton variant="rectangular" width={90} />
                  </li>
                ))}
              </ul>

              <h4 className="ft-new-h4">
                {/* < href={"/service-provider/welcome"}>Become a partner</> */}
              </h4>
            </div>
            <div className="col-lg-3 col-sm-6">
              <h4>
                <Skeleton variant="rectangular" width={'100%'} />{' '}
              </h4>
              <ul className="list-unstyled ft-nav">
                {[1, 2, 3, 4].map(i => (
                  <li key={i}>
                    <Skeleton variant="rectangular" width={150} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-2 col-sm-6">
              <h4>
                {' '}
                <Skeleton variant="rectangular" width={'100%'} />{' '}
              </h4>
              <ul className="list-unstyled ft-nav">
                {[1, 2, 3, 4].map(i => (
                  <li key={i}>
                    <Skeleton variant="rectangular" width={150} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-lg-3 col-sm-6">
              <div className="row">
                <div className="col-lg-12 col-sm-12">
                  <h4>
                    {' '}
                    <Skeleton variant="rectangular" width={'100%'} />{' '}
                  </h4>
                  <ul className="list-unstyled ft-nav">
                    {[1, 2, 3, 4].map(i => (
                      <li key={i}>
                        <Skeleton variant="rectangular" width={150} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 legal-menu2">
              <Skeleton
                variant="rectangular"
                className="new-ft-logo"
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'contain',
                  marginLeft: 'auto',
                  display: 'block',
                  borderRadius: '50%',
                }}
              />
            </div>
          </div>
        </div>
        <div className="ft-copyright-txt">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-9">
                <p>
                  <Skeleton variant="rectangular" width={'100%'} />
                </p>
              </div>
              <div className="col-lg-3">
                <ul className="list-inline ft-payment ">
                  <li>
                    <div>
                      <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
                    </div>
                  </li>
                  <li>
                    <div>
                      <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
                    </div>
                  </li>{' '}
                  <li>
                    <div>
                      <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
                    </div>
                  </li>
                  <li>
                    <div>
                      <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterLoader;
