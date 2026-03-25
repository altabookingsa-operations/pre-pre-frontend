"use client";
import React, { useContext, useEffect } from "react";
import Modal from "react-modal";
import { Formik, Field, Form } from "formik";
import { Context } from "@/app/context";
const MobileOtpSection = ({ otpLength, hasError }) => {
  const otpIndexes = Array.from({ length: otpLength });
 
  return (
    <>
      <h4 className="font-medium text-[24px] pb-[20px] pt-[40px]">
        Enter the mobile code here:
      </h4>
      <div className="partner-verfy-number-form">
        {otpIndexes.map((_, index) => (
          <Field
            key={`otp-${index}`}
            id={`otp${index + 1}`}
            name={`otp${index + 1}`}
            type="text"
            maxLength="1"
            className="
              form-control
              w-12 h-12
              text-center text-lg font-semibold
              border border-gray-300
              rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-blue-500
              transition-all duration-200
              bg-white text-black
            "
          />
        ))}
      </div>
      <span style={{ color: "red" }}>Please fill out valid mobile OTP.</span>
    </>
  );
};
 
const EmailOtpSection = ({ otpLength, hasError }) => {
  const otpIndexes = Array.from({ length: otpLength });
 
  return (
    <>
      <h4>Enter the email code here:</h4>
      <div className="partner-verfy-number-form">
        {otpIndexes.map((_, index) => (
          <Field
            key={`eotp-${index}`}
            id={`eotp${index + 1}`}
            name={`eotp${index + 1}`}
            type="text"
            maxLength="1"
            className="
              form-control
              w-12 h-12
              text-center text-lg font-semibold
              border border-gray-300
              rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-blue-500
              transition-all duration-200
              bg-white text-black
            "
          />
        ))}
      </div>
 
      <span style={{ color: "red" }}>Please fill out valid email OTP.</span>
    </>
  );
};
 
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px"
  },
  overlay: {
    zIndex: 2
  }
};
 
const VerifyNumberModal = ({setType, requireEmailOtp = false}) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement(document.body);
    }
  }, []);
  const {dispatch} = useContext(Context);
  //   const [emailOtp, setEmailOtp] = useState(() => Array.from({ length: otpLength }, () => ''));
  //   const [isMobileVerified, setIsMobileVerified] = useState(() => !requireEmailOtp);
  //   const [formError, setFormError] = useState('');
  //   const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  //   const [isVerifying, setIsVerifying] = useState(false);
  //   const cookies = new Cookies();
 
  //   useEffect(() => {
  //     if (otpVerifyModalIsOpen) {
  //       setFormError('');
  //       setMobileOtp(Array.from({ length: otpLength }, () => ''));
  //       setEmailOtp(Array.from({ length: otpLength }, () => ''));
  //       setIsMobileVerified(!requireEmailOtp);
  //       setIsEmailModalOpen(false);
  //       setIsVerifying(false);
  //     } else {
  //       setIsVerifying(false);
  //     }
  //   }, [otpVerifyModalIsOpen, otpLength, requireEmailOtp]);
 
  //   useEffect(() => {
  //     if (otpVerificationResponce?.res_code === 200) {
  //       storageInstance?.setStorageObj(
  //         'authDataUserRoleIdNode',
  //         otpVerificationResponce?.data?.profile?.role_id
  //       );
  //       // cookies.set('authDataUserRoleIdNode', otpVerificationResponce?.data?.profile?.role_id, {
  //       //   maxAge: 172800,
  //       //   path: '/',
  //       //   domain: '',
  //       // });
  //       cookieInstance?.setStorageObj(
  //         'authDataUserRoleIdNode',
  //         otpVerificationResponce?.data?.profile?.role_id
  //       );
  //       storageInstance?.setStorageObj(
  //         'authDataTokenNode',
  //         otpVerificationResponce?.data?.profile?.token
  //       );
  //       // cookieInstance?.setStorageObj('authDataTokenNode', otpVerificationResponce?.data?.profile?.token);
  //     }
  //   }, [otpVerificationResponce, cookies]);
 
  //   const mobileInitialValues = useMemo(() => {
  //     const values = {};
  //     for (let index = 1; index <= otpLength; index += 1) {
  //       values[`otp${index}`] = '';
  //     }
  //     return values;
  //   }, [otpLength]);
 
  //   const emailInitialValues = useMemo(() => {
  //     const values = {};
  //     for (let index = 1; index <= otpLength; index += 1) {
  //       values[`eotp${index}`] = '';
  //     }
  //     return values;
  //   }, [otpLength]);
 
  //   const mobileOnlySchema = useMemo(() => {
  //     const shape = {};
  //     for (let index = 1; index <= otpLength; index += 1) {
  //       shape[`otp${index}`] = Yup.string()
  //         .required('Required')
  //         .matches(/^[0-9]$/, 'Must be a number');
  //     }
  //     return Yup.object(shape);
  //   }, [otpLength]);
 
  //   const emailOnlySchema = useMemo(() => {
  //     const shape = {};
  //     for (let index = 1; index <= otpLength; index += 1) {
  //       shape[`eotp${index}`] = Yup.string()
  //         .required('Required')
  //         .matches(/^[0-9]$/, 'Must be a number');
  //     }
  //     return Yup.object(shape);
  //   }, [otpLength]);
 
  //   async function resendOTP(values) {
  //     if (addressFormData) {
  //       let args = {
  //         dial_code: addressFormData?.mobile_code,
  //         mobile_number: addressFormData?.mobile_number,
  //         type: 'Contact',
  //       };
 
  //       const response = await axiosFrontNodeInstance.post(
  //         'customer/resend-user-mobile-verification-code',
  //         args
  //       );
  //       return response;
  //     } else {
  //       let args = {
  //         dial_code: userUpdateDetails?.mobile_code,
  //         mobile_number: userUpdateDetails?.mobile_number,
  //         type: 'Profile',
  //       };
  //       const response = await axiosFrontNodeInstance.post(
  //         'customer/resend-user-mobile-verification-code',
  //         args
  //       );
  //       return response;
  //     }
  //   }
 
  //   const handleInputChange = (e, index, setFieldValue, prefix, length, otpState, setOtpState) => {
  //     const { value } = e.target;
  //     if (/^[0-9]$/.test(value)) {
  //       const newOtp = [...otpState];
  //       newOtp[index] = value;
  //       setOtpState(newOtp);
  //       setFieldValue(`${prefix}${index + 1}`, value);
 
  //       if (index < length - 1) {
  //         const nextEl = document.getElementById(`${prefix}${index + 2}`);
  //         if (nextEl) nextEl.focus();
  //       }
  //     }
  //   };
 
  //   const handleBackspace = (e, index, setFieldValue, prefix, otpState, setOtpState) => {
  //     if (e.key === 'Backspace' || e.key === 'Delete') {
  //       const newOtp = [...otpState];
 
  //       if (newOtp[index] === '') {
  //         if (index > 0) {
  //           const prevEl = document.getElementById(`${prefix}${index}`);
  //           if (prevEl) prevEl.focus();
  //           newOtp[index - 1] = '';
  //           setOtpState(newOtp);
  //           setFieldValue(`${prefix}${index}`, '');
  //         }
  //       } else {
  //         newOtp[index] = '';
  //         setOtpState(newOtp);
  //         setFieldValue(`${prefix}${index + 1}`, '');
  //       }
  //     }
  //   };
 
  const renderMobileModal = () => {
    return (
      <Modal
        isOpen={true}
        style={customStyles}
        ariaHideApp={false} //
        contentLabel="Verify Mobile Modal"
        id="modalOtp-verify-mobile"
      >
        <Formik enableReinitialize={false}>
          {({ errors, setFieldValue }) => {
            return (
              <Form autoComplete="off">
                <div className="partner-verfy-number-section">
                  <div className="prtnr-vrfy-close-btn" onClick={()=>{dispatch({type:"BACKGROUND_SHOW", payload: true});setType('register');}}>
                    <img src="/images/close.png"  alt=""/>
                  </div>
                  <h3 className="p-[15px_20px] bg-[#01bdd6] text-[#fff] text-[24px] text-center font-medium">
                    Verify Phone Number
                  </h3>
                  <div className="partner-verfy-number-middle">
                    <h5 className="text-[16px]">
                      A text message with a verification code has been sent
                      to{" "}
                    </h5>
                    <MobileOtpSection otpLength={6} />
                  </div>
                  <button
                    type="submit"
                    className="btn prtnr-verify-new-btn p-[10px] w-full bg-[#01bdd6] text-[#fff]"
                  >
                    Verify
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Modal>
    );
  };
 
  const renderEmailModal = () => (
    <Modal
      isOpen={true}
      style={customStyles}
      ariaHideApp={false} //
      contentLabel="Verify Email Modal"
      id="modalOtp-verify-email"
    >
      <Formik enableReinitialize={false}>
        {({ errors, setFieldValue }) => {
          return (
            <Form autoComplete="off">
              <div className="partner-verfy-number-section">
                <div className="prtnr-vrfy-close-btn" onClick={()=>setType('register')}>
                  <img src="/images/close.png"  alt=""/>
                </div>
                <h3 className="p-[15px_20px] bg-[#01bdd6] text-[#fff] text-[24px] text-center font-medium">
                  Verify Email
                </h3>
                <div className="partner-verfy-number-middle">
                  <h5 className="text-[16px]">
                    A verification code has been sent to{" "}
                    <span>@altabooking.com</span>
                  </h5>
 
                  <EmailOtpSection otpLength={6} />
                </div>
                <button type="submit" className="btn prtnr-verify-new-btn p-[10px] w-full bg-[#01bdd6] text-[#fff]">
                  Verify
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
  return <>{requireEmailOtp ? renderEmailModal() : renderMobileModal()}</>;
};
 
export const MobileVerifyNumberModal = (props) => (
  <VerifyNumberModal {...props} requireEmailOtp={false} />
);
 
export const EmailVerifyNumberModal = (props) => (
  <VerifyNumberModal {...props} requireEmailOtp={true} />
);
 
export default VerifyNumberModal;
 
 