"use client";
import React, { useContext, useEffect } from "react";
import Modal from "react-modal";
import { Formik, Field, Form } from "formik";
import { Context } from "@/app/context";
import { useVerifyMobileOtp, useVerifyEmailOtp } from "@/app/hooks/useRegistration";
import { useBoardingPassCreate, useBoardingPassDetails } from "@/app/hooks/useBoardingPass";
import { useLogin } from "@/app/hooks/useLogin";
import { parsePhoneNumber } from "react-phone-number-input";
import { useRouter } from "next/navigation";
import { deviceType, browserName, browserVersion, osName } from 'react-device-detect';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import axiosFrontNodeInstance from "@/utils/axiosFrontNodeInstance";
const MobileOtpSection = ({ otpLength, setFieldValue }) => {
  const otpIndexes = Array.from({ length: otpLength });
 
  const handleInput = (e, index) => {
    const value = e.target.value;
    if (value.length > 0 && index < otpLength - 1) {
      const nextInput = document.getElementById(`otp${index + 2}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      const prevInput = document.getElementById(`otp${index}`);
      if (prevInput) prevInput.focus();
    }
  };

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
            onInput={(e) => handleInput(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
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
 
const EmailOtpSection = ({ otpLength, setFieldValue }) => {
  const otpIndexes = Array.from({ length: otpLength });
 
  const handleInput = (e, index) => {
    const value = e.target.value;
    if (value.length > 0 && index < otpLength - 1) {
      const nextInput = document.getElementById(`eotp${index + 2}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      const prevInput = document.getElementById(`eotp${index}`);
      if (prevInput) prevInput.focus();
    }
  };

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
            onInput={(e) => handleInput(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
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
 
const VerifyNumberModal = ({setType, registrationValues, requireEmailOtp = false}) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = React.useState(requireEmailOtp ? 'email' : 'mobile');

  const { mutate: verifyMobileOtp, isLoading: isVerifyingMobile } = useVerifyMobileOtp({
    onSuccess: (data) => {
      console.log("Mobile Verification success", data);
      setCurrentStep('email');
    },
    onError: (error) => {
      console.error("Mobile Verification failed", error);
      alert("Mobile verification failed. Please check the OTP and try again.");
    }
  });

  const { mutateAsync: createBoardingPass } = useBoardingPassCreate();
  const { mutateAsync: getBoardingPassDetails } = useBoardingPassDetails();
  const { mutateAsync: login } = useLogin();

  const { mutate: verifyEmailOtp, isLoading: isVerifyingEmail } = useVerifyEmailOtp({
    onSuccess: async (data) => {
      console.log("Email Verification success", data);
      const userId = data?.id;
      if (userId) {
        try {
          await createBoardingPass(userId);
          // Implicit login
          await login({
            email: registrationValues?.email,
            password: registrationValues?.password
          });
          router.push('/boarding-pass');
        } catch (error) {
          console.error("Error in registration/login chain", error);
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
    },
    onError: (error) => {
      console.error("Email Verification failed", error);
      alert("Email verification failed. Please check the OTP and try again.");
    }
  });

  const getGeoLocation = async () => {
    try {
      const res = await axios.get('https://pro.ip-api.com/json/?key=OviSLFVZm5We5p7');
      return res.data;
    } catch (error) {
      console.error("Geo Location fetch failed", error);
      return {};
    }
  };

  const handleEmailOtpSubmit = async (values) => {
    const otpCode = `${values.eotp1}${values.eotp2}${values.eotp3}${values.eotp4}${values.eotp5}${values.eotp6}`;
    if (otpCode.length !== 6) {
      alert("Please enter a 6-digit email OTP");
      return;
    }

    const geoData = await getGeoLocation();
    const pn = registrationValues?.mobile_number ? parsePhoneNumber(registrationValues.mobile_number) : null;

    const payload = {
      title: registrationValues?.title || "Mr.",
      gender: registrationValues?.gender || "Male",
      dob: registrationValues?.dateOfBirth ? new Date(registrationValues.dateOfBirth).toISOString().split('T')[0] : "2008-01-27",
      currency_code: registrationValues?.currency_code || "EUR",
      first_name: registrationValues?.firstName || "",
      last_name: registrationValues?.lastName || "",
      nationality_id: parseInt(registrationValues?.nationality) || 4,
      email: registrationValues?.email || "",
      password: registrationValues?.password || "",
      iso: geoData.countryCode || "IN",
      dial_code: pn ? `+${pn.countryCallingCode}` : "+91",
      mobile_number: pn ? pn.nationalNumber : "",
      currency_id: registrationValues?.currency_id || 17,
      device_type: deviceType || "Desktop",
      screen_width: window.innerWidth,
      screen_height: window.innerHeight,
      browser_name: browserName || "Chrome",
      browser_version: browserVersion || "",
      os_type: osName || "Windows",
      reg_start: new Date().toISOString(),
      city: geoData.city || "",
      country: geoData.country || "",
      country_code: geoData.countryCode || "",
      lat: geoData.lat || 0,
      lon: geoData.lon || 0,
      ip: geoData.query || "",
      region: geoData.region || "",
      region_name: geoData.regionName || "",
      timezone: geoData.timezone || "",
      zip: geoData.zip || "",
      session_id: uuidv4(),
      otp: otpCode,
      home_airport: registrationValues?.home_airport || "",
      platform: registrationValues?.platform || "PRETOPRE"
    };

    verifyEmailOtp(payload);
  };
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
        <Formik 
          initialValues={{ otp1: '', otp2: '', otp3: '', otp4: '', otp5: '', otp6: '' }}
          onSubmit={(values) => {
            const otpCode = `${values.otp1}${values.otp2}${values.otp3}${values.otp4}${values.otp5}${values.otp6}`;
            if (otpCode.length !== 6) {
              alert("Please enter a 6-digit OTP");
              return;
            }

            const pn = registrationValues?.mobile_number ? parsePhoneNumber(registrationValues.mobile_number) : null;
            
            const payload = {
              mobile_number: pn ? `+${pn.countryCallingCode}${pn.nationalNumber}` : '',
              otp: otpCode,
              first_name: registrationValues?.firstName || '',
              last_name: registrationValues?.lastName || '',
              email: registrationValues?.email || '',
            };

            verifyMobileOtp(payload);
          }}
        >
          {({ errors, setFieldValue, handleSubmit }) => {
            return (
              <Form autoComplete="off" onSubmit={handleSubmit}>
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
                      <span>{registrationValues?.mobile_number}</span>
                    </h5>
                    <MobileOtpSection otpLength={6} setFieldValue={setFieldValue} />
                  </div>
                  <button
                    type="submit"
                    className="btn prtnr-verify-new-btn p-[10px] w-full bg-[#01bdd6] text-[#fff]"
                    disabled={isVerifyingMobile}
                  >
                    {isVerifyingMobile ? "Verifying..." : "Verify"}
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
      <Formik 
        initialValues={{ eotp1: '', eotp2: '', eotp3: '', eotp4: '', eotp5: '', eotp6: '' }}
        onSubmit={handleEmailOtpSubmit}
      >
        {({ errors, setFieldValue, handleSubmit }) => {
          return (
            <Form autoComplete="off" onSubmit={handleSubmit}>
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
                    <span>{registrationValues?.email}</span>
                  </h5>

                  <EmailOtpSection otpLength={6} setFieldValue={setFieldValue} />
                </div>
                <button 
                  type="submit" 
                  className="btn prtnr-verify-new-btn p-[10px] w-full bg-[#01bdd6] text-[#fff]"
                  disabled={isVerifyingEmail}
                >
                  {isVerifyingEmail ? "Verifying..." : "Verify"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
  return <>{currentStep === 'email' ? renderEmailModal() : renderMobileModal()}</>;
};
 
export const MobileVerifyNumberModal = (props) => (
  <VerifyNumberModal {...props} requireEmailOtp={false} />
);
 
export const EmailVerifyNumberModal = (props) => (
  <VerifyNumberModal {...props} requireEmailOtp={true} />
);
 
export default VerifyNumberModal;
 
 