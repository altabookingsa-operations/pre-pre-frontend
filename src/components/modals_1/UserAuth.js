import LoginModal from './LoginModal';
import RegistrationModal from './RegistrationModal';
import ForgotPassword from './ForgotPassword';
import { useState } from 'react';
import GuestLoginModal from './GuestLoginModal';
const UserAuth = () => {
  return (
    <>
      <div className="modalnew">
        <div className="modal-content2">
          <span
            className="close-button"
            onClick={() => {
              $('.modalnew').removeClass('show-modal');
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </span>
          <div className="log-reg-popup-start">
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="main-modal-tab-bx-start">
                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item">
                        <a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">
                          <h2>Login</h2>
                          <p>Login with your registered details</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">
                          <h2>Guest Login</h2>
                          <p>Login with your mobile number</p>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" data-toggle="tab" href="#tabs-3" role="tab">
                          <h2>Register</h2>
                          <p>Provide your details to create an account</p>
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <LoginModal />
                      <GuestLoginModal />
                      <RegistrationModal />
                    </div>
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

export default UserAuth;
