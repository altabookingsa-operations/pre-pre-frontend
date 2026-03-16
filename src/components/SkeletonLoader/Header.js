import Skeleton from 'react-loading-skeleton';

const HeaderLoader = () => {
  return (
    <>
      <header className="header-start">
        <div className="container-fluid">
          <div className="logo-bx">
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
          </div>
          <div className="travel-drop-login-map">
            <div className="nav-drop-icon">
              <Skeleton
                animation="wave"
                variant="circular"
                style={{
                  borderRadius: '50%',
                }}
                width={50}
                height={50}
              />
            </div>

            <div className="nav-money-selector">
              <div className="nav-drop-icon">
                <Skeleton
                  animation="wave"
                  variant="circular"
                  style={{
                    borderRadius: '50%',
                  }}
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <div className="nav-map-icon">
              <div className="nav-drop-icon">
                <Skeleton
                  animation="wave"
                  variant="circular"
                  style={{
                    borderRadius: '50%',
                  }}
                  width={50}
                  height={50}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderLoader;
