import React, { useEffect, useState, useRef } from 'react';
import Modal from 'react-modal';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { setToast, toastConfig } from '../../utils/commonUtil';
import { useRouter } from 'next/navigation';
import axiosFrontNodeInstance from '../../utils/axiosFrontNodeInstance';
import storageInstance from '../../utils/storageInstance';
import Cookies from 'universal-cookie';
import cookieInstance from '../../utils/cookieInstance';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0px',
  },
  overlay: {
    zIndex: 2,
  },
};
const VerifyNumberModal = ({
  mobileLogin,
  companyCountryCode,
  mobile,
  userId,
  otpSent,
  otpVerificationResponce,
  updateProfileOtpSent,
  addressFormData,
  userUpdateDetails,
  otpVerifyModalIsOpen,
  setOtpVerifyModalIsOpen,
  profileDetails,
  setLoading,
  isOTPVerifyLoading,
}) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  var cookies = new Cookies();

  const router = useRouter();

  useEffect(() => {
    if (otpVerificationResponce?.res_code === 200) {
      storageInstance?.setStorageObj(
        'authDataUserRoleIdNode',
        otpVerificationResponce?.data?.profile?.role_id
      );
      cookies.set('authDataUserRoleIdNode', otpVerificationResponce?.data?.profile?.role_id, {
        maxAge: 172800,
        path: '/',
        domain: '',
      });
      storageInstance?.setStorageObj(
        'authDataTokenNode',
        otpVerificationResponce?.data?.profile?.token
      );
      cookieInstance?.setStorageObj(
        'authDataTokenNode',
        otpVerificationResponce?.data?.profile?.token
      );
      router.push('/dashboard/bookings');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otpVerificationResponce]);

  if (!otpVerifyModalIsOpen) return null; // Don't render if modal is closed

  async function resendOTP(values) {
    if (addressFormData) {
      let args = {
        dial_code: addressFormData?.mobile_code,
        mobile_number: addressFormData?.mobile_number,
        type: 'Contact',
      };

      const response = await axiosFrontNodeInstance.post(
        'customer/resend-user-mobile-verification-code',
        args
      );
      return response;
    } else {
      let args = {
        dial_code: userUpdateDetails?.mobile_code,
        mobile_number: userUpdateDetails?.mobile_number,
        type: 'Profile',
      };
      const response = await axiosFrontNodeInstance.post(
        'customer/resend-user-mobile-verification-code',
        args
      );
      return response;
    }
  }

  // Handle input change and focus on next input
  const handleInputChange = (e, index, setFieldValue) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setFieldValue(`otp${index + 1}`, value);

      // Move to next input if there is one
      if (index < 3) {
        document.getElementById(`otp${index + 2}`).focus();
      }
    }
  };

  // Handle backspace and move focus to previous input
  const handleBackspace = (e, index, setFieldValue) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      const newOtp = [...otp];

      // If current input is empty, move focus to the previous input
      if (newOtp[index] === '') {
        if (index > 0) {
          document.getElementById(`otp${index}`).focus();
          newOtp[index - 1] = ''; // Clear previous input value
          setOtp(newOtp);
          setFieldValue(`otp${index}`, ''); // Clear previous Formik value
        }
      } else {
        // If current input has a value, clear it
        newOtp[index] = '';
        setOtp(newOtp);
        setFieldValue(`otp${index + 1}`, ''); // Clear current Formik value
      }
    }
  };

  return (
    <>
      <Modal isOpen={otpVerifyModalIsOpen} style={customStyles} contentLabel="Verify Modal">
        <Formik
          enableReinitialize={false}
          initialValues={{
            otp1: '',
            otp2: '',
            otp3: '',
            otp4: '',
          }}
          validationSchema={Yup.object({
            otp1: Yup.string()
              .required('Required')
              .matches(/^[0-9]$/, 'Must be a number'),
            otp2: Yup.string()
              .required('Required')
              .matches(/^[0-9]$/, 'Must be a number'),
            otp3: Yup.string()
              .required('Required')
              .matches(/^[0-9]$/, 'Must be a number'),
            otp4: Yup.string()
              .required('Required')
              .matches(/^[0-9]$/, 'Must be a number'),
          })}
          onSubmit={(values, { resetForm }) => {
            const otpValue = Object.values(values).join('');

            if (mobileLogin) {
              let args = {
                code: otpValue,
                user_id: userId,
              };
              console.log(args);
              otpSent(args);
            } else {
              let args = {
                user_id: profileDetails?.id,
                code: Number(otpValue),
                first_name: addressFormData?.first_name,
                last_name: addressFormData?.last_name,
                email: addressFormData?.email,
                mobile_code: addressFormData?.mobile_code,
                mobile_number: addressFormData?.mobile_number,
                country_id: addressFormData?.country_id,
                state_id: addressFormData?.state_id,
                city: addressFormData?.city,
                post_code: addressFormData?.post_code,
                address: addressFormData?.address,
                address_id: addressFormData?.address_id > 0 ? addressFormData?.address_id : 0,
                is_default: addressFormData?.is_default,
              };
              otpSent(args);

              if (updateProfileOtpSent) {
                let updateProfileArgs = {
                  title: userUpdateDetails?.title,
                  code: Number(otpValue),
                  first_name: userUpdateDetails?.first_name,
                  last_name: userUpdateDetails?.last_name,
                  email: userUpdateDetails?.email,
                  mobile_code: userUpdateDetails?.mobile_code,
                  mobile_number: userUpdateDetails?.mobile_number,
                  birthday: userUpdateDetails?.birthday,
                  gender: userUpdateDetails?.gender,
                  profile_image: userUpdateDetails?.profile_image,
                  iso: userUpdateDetails?.iso,
                  user_id: userUpdateDetails?.user_id,
                  company_name: userUpdateDetails?.company_name,
                };

                updateProfileOtpSent(updateProfileArgs);
              }
            }

            resetForm();
            setLoading(false);
            setOtp(['', '', '', '']);
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form autoComplete="off">
              <div className="partner-verfy-number-section">
                <div
                  className="prtnr-vrfy-close-btn"
                  onClick={() => {
                    setOtpVerifyModalIsOpen(false);
                  }}
                >
                  <i className="fa-solid fa-xmark" />
                </div>
                <h3>Verify Phone Number</h3>
                <div className="partner-verfy-number-middle">
                  <h5>
                    A text message with a verification code has been sent to{' '}
                    {addressFormData && <span>{addressFormData?.mobile_number}</span>}
                    {userUpdateDetails && (
                      <span>
                        +{userUpdateDetails?.mobile_code}
                        {userUpdateDetails?.mobile_number}
                      </span>
                    )}
                    {mobileLogin && (
                      <span>
                        +{companyCountryCode}
                        {mobile}
                      </span>
                    )}
                  </h5>
                  <h4>Enter the code here:</h4>
                  <div className="partner-verfy-number-form">
                    {[0, 1, 2, 3].map(index => (
                      <>
                        <Field
                          id={`otp${index + 1}`}
                          name={`otp${index + 1}`}
                          type="text"
                          maxLength="1"
                          className="form-control"
                          value={otp[index]}
                          onChange={e => handleInputChange(e, index, setFieldValue)}
                          onKeyDown={e => handleBackspace(e, index, setFieldValue)}
                        />
                      </>
                    ))}
                  </div>

                  {(errors.otp1 || errors.otp2 || errors.otp3 || errors.otp4) && (
                    <span style={{ color: 'red' }}>Please fill out valid OTP.</span>
                  )}
                  {otpVerificationResponce?.res_code === 201 && (
                    <span style={{ color: 'red' }}>{otpVerificationResponce?.response}</span>
                  )}
                  <p className="rsend-code-txt">
                    Didn&apos;t receive a verification code?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        resendOTP(values)
                          .then(
                            function (response) {
                              if (response.res_code === 200) {
                                setLoading(false);
                                toastConfig.type = 'success';
                                setToast(toastConfig, response.response);
                              } else {
                                setLoading(false);
                                toastConfig.type = 'error';
                                setToast(toastConfig, response.response);
                              }
                            }
                            // function (error) {
                            //   setLoading(false);
                            //   toastConfig.type = "error";
                            //   setToast(toastConfig, "Unexpected error occured");
                            // }
                          )
                          .finally(function () {
                            setLoading(false);
                          });
                      }}
                    >
                      Resend
                    </button>
                  </p>
                </div>
                <button type="submit" className="btn prtnr-verify-new-btn">
                  {isOTPVerifyLoading ? 'Loading..' : 'Verify'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default VerifyNumberModal;
