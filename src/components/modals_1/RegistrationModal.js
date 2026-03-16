import { Formik, Field, Form, ErrorMessage, FastField } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import PhoneInput, { parsePhoneNumber, isPossiblePhoneNumber } from 'react-phone-number-input';
import RingLoader from 'react-spinners/RingLoader';
import codes from 'country-calling-code';
import axiosFrontNodeInstance from '../../utils/axiosFrontNodeInstance';
import axiosInstance from '../../utils/axiosInstance';
import storageInstance from '../../utils/storageInstance';
import { setToast, toastConfig } from '../../utils/commonUtil';

const RegistrationModal = () => {
  const [mobile, setPhone] = useState('');
  const [customerCountryCode, setCustomerCountryCode] = useState('');
  const [customerISO, setCustomerISO] = useState('');
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [confirmPasswordCheck, setConfirmPasswordCheck] = useState(false);
  const [isSubmitBtnLoading, setIsSubmitBtnLoading] = useState(false);
  async function submit(values) {
    let args = {
      title: values.title.trim(),
      dial_code: customerCountryCode.trim(),
      iso: customerISO.trim(),
      mobile_number: parsePhoneNumber(mobile).nationalNumber.trim(),
      first_name: values.firstName.trim(),
      last_name: values.lastName.trim(),
      email: values.email.trim().toLowerCase(),
      password: values.password.trim(),
    };
    // console.log(args,"args==>")

    // For PHP registration
    // const response = await axiosInstance.post("/auth/registration", args);

    // For node registration
    const response = await axiosFrontNodeInstance.post('/auth/registration', args);

    return response;
  }

  // useEffect(() => {
  //   if (mobile === "") {
  //     $("#errPhone").text("Please enter Phone Number");
  //   }
  // }, [mobile]);

  return (
    <div className="tab-pane" id="tabs-3" role="tabpanel">
      <div className="main-login-popup-form">
        <Formik
          initialValues={{
            title: 'Mr.',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            policyCheck: false,
            mobile_number: '',
          }}
          validationSchema={Yup.object({
            firstName: Yup.string()
              .min(3, 'Must be 3 characters or higher')
              .required('Please enter First Name'),
            lastName: Yup.string()
              .min(3, 'Must be 3 characters or higher')
              .required('Please enter Last Name'),
            email: Yup.string()
              .email('Invalid Email Address')
              .required('Please enter Email Address'),
            password: Yup.string()
              .min(8, 'Password must be at least 8 characters')
              .matches(
                /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
                'Password must be at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
              )
              .required('Password is required'),

            // phone: Yup.string()
            //   .required("Please enter Phone Number")
            //   .test("is-valid-phone", "Invalid Phone Number", function (value) {
            //     const { path, createError } = this;
            //     if (!value) {
            //       return createError({
            //         path,
            //         message: "Please enter Phone Number",
            //       });
            //     }
            //     if (!isPossiblePhoneNumber(value)) {
            //       return createError({ path, message: "Invalid Phone Number" });
            //     }
            //     return true; // If valid
            //   }),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('password'), null], 'Confirm Password must match')
              .min(8, 'Password must be at least 8 characters')
              .matches(
                /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
                'Confirm Password must be at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
              )
              .required('Confirm Password is required'),

            policyCheck: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
          })}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            // if (!isPossiblePhoneNumber(mobile)) {
            //   setSubmitting(false);
            // } else {
            //   submit(values)
            //     .then(
            //       function (response) {
            //         if (response.res_code === 200) {
            //           storageInstance?.setStorageObj(
            //             "userRegistrationData",
            //             response.data
            //           );
            //           setSubmitting(false);
            //           resetForm();
            //           setPhone(undefined);
            //           $(".modalnew").removeClass("show-modal");
            //           toastConfig.type = "success";
            //           setToast(toastConfig, response.response);
            //         } else {
            //           setSubmitting(false);
            //           toastConfig.type = "error";
            //           setToast(toastConfig, response.response);
            //         }
            //       },
            //       function (error) {
            //         setSubmitting(false);
            //         toastConfig.type = "error";
            //         setToast(toastConfig, "Unexpected error occured");
            //       }
            //     )
            //     .finally(function () {
            //       setSubmitting(false);
            //     });
            // }
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            resetForm,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            validateForm,
            setFieldTouched,
          }) => (
            <Form>
              <div className="row">
                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Title*</label>
                    <div className="reg-pop-four-radio">
                      <div className="frm-custom-radio-btn">
                        <Field id="mr" type="radio" name="title" value="Mr." />
                        <label htmlFor="mr">Mr.</label>
                      </div>
                      <div className="frm-custom-radio-btn">
                        <Field id="mrs" type="radio" name="title" value="Mrs." />
                        <label htmlFor="mrs">Mrs.</label>
                      </div>
                      <div className="frm-custom-radio-btn">
                        <Field id="miss" type="radio" name="title" value="Miss" />
                        <label htmlFor="miss">Miss</label>
                      </div>
                      <div className="frm-custom-radio-btn">
                        <Field id="dr" type="radio" name="title" value="Dr." />
                        <label htmlFor="dr">Dr.</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>First Name*</label>
                    <Field
                      autoComplete="nope"
                      name="firstName"
                      type="text"
                      className="form-control"
                      maxLength="50"
                    />
                    <span style={{ color: 'red' }}>
                      <ErrorMessage name="firstName" />
                    </span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Last Name*</label>
                    <Field
                      name="lastName"
                      type="text"
                      className="form-control"
                      autoComplete="nope"
                      maxLength="50"
                    />
                    <span style={{ color: 'red' }}>
                      <ErrorMessage name="lastName" />
                    </span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Email Address*</label>
                    <Field
                      autoComplete="nope"
                      name="email"
                      type="email"
                      className="form-control"
                      maxLength="100"
                    />
                    <span style={{ color: 'red' }}>
                      <ErrorMessage name="email" />
                    </span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Phone Number*</label>
                    <PhoneInput
                      className="form-control"
                      autoComplete="nope"
                      name="phone"
                      international
                      defaultCountry="GB"
                      countryCallingCodeEditable={false}
                      placeholder="Enter phone number"
                      inputProps={{ name: 'phone' }}
                      value={mobile}
                      onChange={(phone, country, e) => {
                        // console.log("🚀 ~ RegistrationModal ~ phone:", phone);
                        // if (phone === undefined) {
                        //   $("#errPhone").text("Please enter Phone Number");
                        // } else if (!isPossiblePhoneNumber(phone)) {
                        //   $("#errPhone").text("Invalid Phone Number");
                        // } else {
                        //   $("#errPhone").text("");
                        // }
                        // handleChange(e.target.value);
                        if (phone !== undefined) {
                          let ph = parsePhoneNumber(phone);
                          if (ph !== undefined) {
                            setCustomerCountryCode(ph.countryCallingCode);
                            setCustomerISO(
                              codes.filter(c => c.countryCodes[0] == ph.countryCallingCode)[0]
                                .isoCode2
                            );
                            setPhone(phone);
                            // formik.setFieldValue(
                            //   "mobile_number",
                            //   ph?.nationalNumber
                            // );
                          }
                        }
                      }}
                      onBlur={e => {
                        if (e.target.value.indexOf(' ') < 0) {
                          $('#errPhone').text('Please enter Phone Number');
                        } else if (!isPossiblePhoneNumber(e.target.value)) {
                          $('#errPhone').text('Invalid phone Number');
                        } else {
                          $('#errPhone').text('');
                        }
                      }}
                    />
                    <span id="errPhone" style={{ color: 'red' }}>
                      <ErrorMessage name="mobile_number" />
                    </span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Password*</label>
                    <div className="log-reg-pass-eye-box">
                      <Field
                        // maxLength="20"
                        autoComplete="nope"
                        name="password"
                        type={passwordCheck ? 'text' : 'password'}
                        className="form-control"
                      />

                      <i
                        className={
                          passwordCheck ? 'fa-solid fa-eye' : 'fa-sharp fa-solid fa-eye-slash'
                        }
                        onClick={() => {
                          setPasswordCheck(!passwordCheck);
                        }}
                      ></i>
                    </div>
                    <span style={{ color: 'red' }}>
                      <ErrorMessage name="password" />
                    </span>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Confirm Password*</label>
                    <div className="log-reg-pass-eye-box">
                      <Field
                        // maxLength="20"
                        name="confirmPassword"
                        type={confirmPasswordCheck ? 'text' : 'password'}
                        className="form-control"
                        autoComplete="nope"
                      />
                      <i
                        className={
                          confirmPasswordCheck
                            ? 'fa-solid fa-eye'
                            : 'fa-sharp fa-solid fa-eye-slash'
                        }
                        onClick={() => {
                          setConfirmPasswordCheck(!confirmPasswordCheck);
                        }}
                      ></i>
                    </div>
                    <span style={{ color: 'red' }}>
                      <ErrorMessage name="confirmPassword" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="frm-lst-check-txt">
                <Field type="checkbox" name="policyCheck" />

                <label htmlFor="policyCheck">
                  By signing up or logging into an account, you are agreeing with our{' '}
                  <a href="/terms-conditions" target="_blank">
                    {' '}
                    Terms &amp; Conditions
                  </a>
                  &nbsp; &amp;{' '}
                  <a href="/privacy-policy" target="_blank">
                    Privacy Policy
                  </a>{' '}
                  of Alta Booking
                </label>
                <div style={{ color: 'red' }}>
                  <ErrorMessage name="policyCheck" />
                </div>
              </div>

              <div>
                {!isSubmitBtnLoading && (
                  <button
                    className="btn mdl-frm-btn"
                    type="submit"
                    onClick={() => {
                      if (mobile === '') {
                        $('#errPhone').text('Please enter Phone Number');
                      }
                      setFieldTouched('firstName', true);
                      setFieldTouched('lastName', true);
                      setFieldTouched('email', true);
                      setFieldTouched('password', true);
                      setFieldTouched('confirmPassword', true);
                      setFieldTouched('policyCheck', true);

                      validateForm().then(err => {
                        if ($.isEmptyObject(err)) {
                          if (!isPossiblePhoneNumber(mobile)) {
                            setIsSubmitBtnLoading(false);
                          } else {
                            setIsSubmitBtnLoading(true);
                            submit(values)
                              .then(
                                function (response) {
                                  if (response.res_code === 200) {
                                    storageInstance?.setStorageObj(
                                      'userRegistrationData',
                                      response.data
                                    );
                                    setIsSubmitBtnLoading(false);
                                    resetForm();
                                    setPhone(undefined);
                                    $('.modalnew').removeClass('show-modal');
                                    toastConfig.type = 'success';
                                    setToast(toastConfig, response.response);
                                  } else {
                                    setIsSubmitBtnLoading(false);
                                    toastConfig.type = 'error';
                                    setToast(toastConfig, response.response);
                                  }
                                },
                                function (error) {
                                  setIsSubmitBtnLoading(false);
                                  toastConfig.type = 'error';
                                  setToast(toastConfig, 'Unexpected error occured');
                                }
                              )
                              .finally(function () {
                                setIsSubmitBtnLoading(false);
                              });
                          }
                        }
                      });
                    }}
                  >
                    Register
                  </button>
                )}
                {isSubmitBtnLoading && <RingLoader color="#03d8f4" size={80} />}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegistrationModal;
