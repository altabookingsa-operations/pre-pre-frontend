import React, { useState } from 'react';
import PhoneInput, { parsePhoneNumber, isPossiblePhoneNumber } from 'react-phone-number-input';
import VerifyNumberModal from './VerifyNumberModal';
import { useGuestVerifyOtp } from '../../hooks/useUserProfile';
import axiosFrontNodeInstance from '../../utils/axiosFrontNodeInstance';
import { setToast, toastConfig } from '../../utils/commonUtil';

const GuestLoginModal = () => {
  const [phone, setPhone] = useState('');
  const [companyCountryCode, setCompanyCountryCode] = useState('');
  const [mobile, setMobile] = useState('');
  const [otpVerifyModalIsOpen, setOtpVerifyModalIsOpen] = useState(false);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    mutate: otpSent,
    data: otpVerificationResponce,
    isLoading: isOTPVerifyLoading,
  } = useGuestVerifyOtp();

  const otpHandler = () => {
    setLoading(true);
    let args = {
      mobile: mobile,
      country_code: companyCountryCode,
      login_type: 'mobile',
    };
    axiosFrontNodeInstance
      .post('/auth/login', args)
      .then(response => {
        if (response.res_code === 200) {
          setOtpVerifyModalIsOpen(true);
          setLoading(false);
          setUserId(response.data?.userId);
        } else {
          setLoading(false);
          toastConfig.type = 'error';
          setToast(toastConfig, response.response);
        }
      })
      .catch(error => {
        setLoading(false);
        toastConfig.type = 'error';
        setToast(toastConfig, error?.response);
      });
  };
  return (
    <>
      <div className="tab-pane" id="tabs-2" role="tabpanel">
        <div className="main-login-popup-form">
          <div className="row">
            <div className="col-xl-6 ">
              <div className="you-can-login-section you-can-login-section-new">
                <PhoneInput
                  className="form-control"
                  autoComplete="nope"
                  name="mobile"
                  international
                  defaultCountry="GB"
                  countryCallingCodeEditable={false}
                  inputProps={{ name: 'mobile' }}
                  value={phone}
                  onChange={(phone, country, e) => {
                    if (phone !== undefined) {
                      let ph = parsePhoneNumber(phone);
                      if (ph !== undefined) {
                        setCompanyCountryCode(ph.countryCallingCode);
                        setPhone(phone);
                        setMobile(parsePhoneNumber(phone)?.nationalNumber);
                      }
                    }
                  }}
                />
                <button
                  className="btn mdl-frm-btn mt-3"
                  disabled={loading}
                  onClick={() => otpHandler()}
                >
                  {loading ? 'Sending...' : 'Get OTP'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <VerifyNumberModal
        companyCountryCode={companyCountryCode}
        otpSent={otpSent}
        userId={userId}
        mobile={mobile}
        mobileLogin={true}
        otpVerifyModalIsOpen={otpVerifyModalIsOpen}
        setOtpVerifyModalIsOpen={setOtpVerifyModalIsOpen}
        isOTPVerifyLoading={isOTPVerifyLoading}
        otpVerificationResponce={otpVerificationResponce}
      />
    </>
  );
};

export default GuestLoginModal;
