import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="container">
        <div className="row">
          {/* LEFT */}
          <div className="col-lg-4">
            <div className="footer-logo-wrap">
              <div className="footer-logo-main">
                <img src="/images/logo.png" alt="Logo" />
              </div>

              <p>Designed by AI. Inspired by You.</p>
              <div className="d-none d-lg-block">
                <div className="footer-certificates-logo">
                  <img src="/images/ft-new-logo.png" alt="" />
                  <img src="/images/Asset.png" alt="" />
                </div>
              </div>
              <div className="d-block d-lg-none">
                <ul className="footer-social-icons ">
                  <li className="social-icon-box">
                    <a href="#">
                      <i className="fa-brands fa-facebook-f" />
                    </a>
                  </li>
                  <li className="social-icon-box">
                    <a href="#">
                      <i className="fa-brands fa-linkedin-in" />
                    </a>
                  </li>
                  <li className="social-icon-box">
                    <a href="#">
                      <i className="fa-brands fa-instagram" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-lg-8">
            <div className="footer-links-main">
              <div className="row">
                {/* Customer Support */}
                <div className="col-lg-5">
                  <div className="footer-contact-wrap">
                    <div className="footer-heading">
                      <h6>Customer Support</h6>
                    </div>

                    <ul className="footer-contact-main">
                      <li className="footer-contact">
                        <div className="contact-icon-wrap">
                          <img src="/images/help.svg" alt="" />
                        </div>
                        <Link href="#">Frequently Asked Questions</Link>
                      </li>

                      <li className="footer-contact">
                        <div className="contact-icon-wrap">
                          <img src="/images/customer-service.svg" alt="" />
                        </div>
                        <Link href="#">Contact us</Link>
                      </li>

                      <li className="footer-contact">
                        <div className="contact-icon-wrap">
                          <img src="/images/mail.svg" alt="" />
                        </div>
                        <span>Email :</span>
                        <a className="links" href="mailto:support@altabooking.com">
                          support@altabooking.com
                        </a>
                      </li>

                      <li className="footer-contact">
                        <div className="contact-icon-wrap">
                          <img src="/images/call-assistance.svg" alt="" />
                        </div>
                        <span>Tel :</span>
                        <a className="links" href="tel:+44(0)204-586-0592">
                          +44(0)204-586-0592
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Company */}
                <div className="col-lg-3 col-6">
                  <div className="footer-menu-wrap">
                    <div className="footer-heading">
                      <h6>Company</h6>
                    </div>

                    <ul className="footer-menu">
                      <li>
                        <Link className="links" href="#">
                          About
                        </Link>
                      </li>
                      <li>
                        <a className="links" href="#">
                          Help Center
                        </a>
                      </li>
                      <li>
                        <a className="links" href="#">
                          Careers
                        </a>
                      </li>
                      <li>
                        <Link className="links" href="#">
                          Become a Partner
                        </Link>
                      </li>
                      <li>
                        <a className="links" href="#">
                          Terms &amp; Privacy
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Legal */}
                <div className="col-lg-4 col-6">
                  <div className="footer-menu-wrap">
                    <div className="footer-heading">
                      <h6>Legal</h6>
                    </div>

                    <ul className="footer-menu">
                      <li>
                        <Link className="links" href="#">
                          Cookies Policy
                        </Link>
                      </li>
                      <li>
                        <Link className="links" href="#">
                          Website Terms &amp; Conditions
                        </Link>
                      </li>
                      <li>
                        <Link className="links" href="#">
                          Website Acceptable Use Policy
                        </Link>
                      </li>
                      <li>
                        <Link className="links" href="#">
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <Link className="links" href="#">
                          Terms &amp; Conditions
                        </Link>
                      </li>
                    </ul>
                    <div className="d-none d-lg-block">
                      <ul className="footer-social-icons ">
                        <li className="social-icon-box">
                          <a href="#">
                            <i className="fa-brands fa-facebook-f" />
                          </a>
                        </li>
                        <li className="social-icon-box">
                          <a href="#">
                            <i className="fa-brands fa-linkedin-in" />
                          </a>
                        </li>
                        <li className="social-icon-box">
                          <a href="#">
                            <i className="fa-brands fa-instagram" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-block d-lg-none">
          <div className="footer-certificates-logo">
            <img src="/images/ft-new-logo.png" alt="" />
            <img src="/images/Asset.png" alt="" />
          </div>
        </div>
      </div>

      {/* LOWER */}
      <div className="footer-lower">
        <div className="container">
          <ul className="lower-footer-main">
            <li>
              <p>
                Copyright © {new Date().getFullYear()} Alta Booking Ltd. Alta Booking is owned and
                operated by Alta Booking Ltd, United Kingdom
              </p>
            </li>

            <li className="footer-icons">
              <div className="icon-box">
                <img src="/images/visa-four.png" alt="" />
              </div>
              <div className="icon-box">
                <img src="/images/visa-three.png" alt="" />
              </div>
              <div className="icon-box">
                <img src="/images/visa-two.png" alt="" />
              </div>
              <div className="icon-box">
                <img src="/images/visa-one.png" alt="" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
