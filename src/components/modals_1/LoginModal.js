import React, { useEffect, useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import RingLoader from 'react-spinners/RingLoader';
import Link from 'next/link';
import axiosFrontNodeInstance from '../../utils/axiosFrontNodeInstance';
import axiosInstance from '../../utils/axiosInstance';
import cookieInstance from '../../utils/cookieInstance';
import storageInstance from '../../utils/storageInstance';
import { setToast, toastConfig } from '../../utils/commonUtil';
import { Context } from '../../context';
import { useRouter } from 'next/navigation';
import ForgotPassword from './ForgotPassword';
import { useState } from 'react';
import Cookies from 'universal-cookie';
import { UserAccessFun } from '../../hooks/UserAccessFun';
// import { GoogleLogin } from "react-google-login";
import { useLinkedIn } from 'react-linkedin-login-oauth2';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useGuestVerifyOtp } from '../../hooks/useUserProfile';

const LoginModal = () => {
  const { state, dispatch } = useContext(Context);
  const [isOpenForgotPass, setIsOpenForgotPass] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isLinkedinLoading, setIsLinkedinLoading] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);

  const { linkedInLogin } = useLinkedIn({
    clientId: process.env.NEXT_PUBLIC_REACT_APP_LINKEDIN_CLIENT_ID,
    redirectUri: `${window.location.origin}/auth/linkedin/callback`,
    onSuccess: async code => {
      setIsLinkedinLoading(true);
      if (code) {
        const headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
        };
        axios
          .get(
            `${process.env.NEXT_PUBLIC_API_FRONT_NODE_BASE_URL}/auth/get-linkeding-profile?code=${code}&client_id=${process.env.NEXT_PUBLIC_REACT_APP_LINKEDIN_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_REACT_APP_LINKEDIN_CLIENT_SECRET}&redirect_uri=${window.location.origin}/auth/linkedin/callback`,
            {
              headers: headers,
            }
          )
          .then(async res => {
            const userDetails = {
              type: 'Linkedin',
              social_id: res?.data?.data?.sub,
              email: res?.data?.data?.email,
              first_name: res?.data?.data?.given_name,
              last_name: res?.data?.data?.family_name,
              profile_image: res?.data?.data?.picture,
            };

            axiosFrontNodeInstance.defaults.headers.common['Authorization'] =
              'Bearer ' + storageInstance?.getStorage('authDataTokenNode');
            await axiosFrontNodeInstance.post('/auth/social-login', userDetails).then(
              response => {
                if (response.res_code === 200) {
                  setIsLinkedinLoading(false);
                  setCookiesSocial(response);

                  $('.modalnew').removeClass('show-modal');
                  toastConfig.type = 'success';
                  setToast(toastConfig, response.response);
                  router.push('/');
                } else {
                  toastConfig.type = 'error';
                  setToast(toastConfig, response.response);
                }
              },
              function (error) {
                setIsLinkedinLoading(false);
                toastConfig.type = 'error';
                setToast(toastConfig, 'Unexpected error occured');
              }
            );
          });
      }
    },
    scope: 'profile email w_member_social openid',
    onError: error => {},
  });

  var cookies = new Cookies();

  const router = useRouter();
  async function login(values) {
    let args = {
      email: values.email.toLowerCase(),
      password: values.password,
    };

    // For PHP login
    // const response = await axiosInstance.post("/auth/login", args);

    // For Node login
    const response = await axiosFrontNodeInstance.post('/auth/login', args);

    return response;
  }

  const setCookies = response => {
    // set Cookies for PHP
    // storageInstance?.setStorageObj("authData", response.data?.phpLogin);

    // storageInstance?.setStorageObj(
    //   "authDataTokenHolderId",
    //   response.data?.phpLogin?.profile.id.toString()
    // );
    // storageInstance?.setStorageObj(
    //   "authDataTokenNode",
    //   response.data?.phpLogin?.profile.token
    // );
    // storageInstance?.setStorageObj(
    //   "authDataPriorityList",
    //   response.data?.phpLogin?.priority_list
    // );
    // storageInstance?.setStorageObj(
    //   "authDataUserRoleId",
    //   response.data?.phpLogin?.profile?.role_id
    // );

    // cookies.set(
    //   "authDataUserRoleId",
    //   response.data?.phpLogin?.profile?.role_id,
    //   {
    //     maxAge: 172800,
    //     path: "/",
    //     domain: "",
    //   }
    // );
    // if (response.data?.phpLogin?.profile?.role_id === 4) {
    //   cookies.set("userchnagess", "both", {
    //     maxAge: 172800,
    //     path: "/",
    //     domain: "",
    //   });
    //   UserAccessFun(response.data?.profile?.id);
    // }
    // cookieInstance?.setStorageObj(
    //   "authDataTokenNode",
    //   response.data?.phpLogin?.profile.token
    // );
    // cookieInstance?.setStorage(
    //   "authDataTokenHolderId",
    //   response.data?.phpLogin?.profile.id.toString()
    // );
    // dispatch({
    //   type: "UPDATE_USER",
    //   payload: response.data?.phpLogin,
    // });

    // set Cookies for Node
    storageInstance?.setStorageObj('authDataNode', response.data);

    storageInstance?.setStorageObj(
      'authDataTokenHolderIdNode',
      response.data?.profile.id.toString()
    );
    storageInstance?.setStorageObj('authDataTokenNode', response.data?.profile.token);
    storageInstance?.setStorageObj('authDataPriorityListNode', response.data?.priority_list);
    storageInstance?.setStorageObj('authDataUserRoleIdNode', response.data?.profile?.role_id);

    cookies.set('authDataUserRoleIdNode', response.data?.profile?.role_id, {
      maxAge: 172800,
      path: '/',
      domain: '',
    });
    if (response.data?.profile?.role_id === '665d529d6caaa43c454087df') {
      cookies.set('userchnagessNode', 'both', {
        maxAge: 172800,
        path: '/',
        domain: '',
      });
      UserAccessFun(response.data?.profile?.id);
    }
    cookieInstance?.setStorageObj('authDataTokenNode', response.data?.profile.token);
    cookieInstance?.setStorageObj(
      'authDataTokenHolderIdNode',
      response.data?.profile.id.toString()
    );
    dispatch({
      type: 'UPDATE_USER_NODE',
      payload: response.data,
    });
  };
  const setCookiesSocial = response => {
    // set Cookies for Node
    storageInstance?.setStorageObj('authDataNode', response.data);

    storageInstance?.setStorageObj('authDataTokenHolderIdNode', response.data?.id.toString());
    storageInstance?.setStorageObj('authDataTokenNode', response.data?.token);
    storageInstance?.setStorageObj('authDataPriorityListNode', response.data?.priority_list);
    storageInstance?.setStorageObj('authDataUserRoleIdNode', response.data?.role_id);

    cookies.set('authDataUserRoleIdNode', response.data?.role_id, {
      maxAge: 172800,
      path: '/',
      domain: '',
    });
    if (response.data?.role_id === '665d529d6caaa43c454087df') {
      cookies.set('userchnagessNode', 'both', {
        maxAge: 172800,
        path: '/',
        domain: '',
      });
      UserAccessFun(response.data?.id);
    }
    cookieInstance?.setStorageObj('authDataTokenNode', response.data?.token);
    cookieInstance?.setStorageObj('authDataTokenHolderIdNode', response.data?.id.toString());
    dispatch({
      type: 'UPDATE_USER_NODE',
      payload: response.data,
    });
  };

  const googleLoginData = useGoogleLogin({
    onSuccess: async codeResponse => {
      setIsGoogleLoading(true);
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
              Accept: 'application/json',
            },
          }
        )
        .then(async ({ data }) => {
          const userDetails = {
            type: 'Google',
            social_id: data?.id,
            email: data?.email,
            first_name: data?.given_name,
            last_name: data?.family_name,
            profile_image: data?.picture,
          };
          // For PHP
          // axiosInstance.defaults.headers.common["Authorization"] =
          //   "Bearer " + storageInstance?.getStorage("authDataTokenNode");
          // await axiosInstance.post("/auth/social-login", userDetails).then(
          // For Node
          axiosFrontNodeInstance.defaults.headers.common['Authorization'] =
            'Bearer ' + storageInstance?.getStorage('authDataTokenNode');
          await axiosFrontNodeInstance.post('/auth/social-login', userDetails).then(
            response => {
              if (response.res_code === 200) {
                setIsGoogleLoading(false);
                setCookiesSocial(response);

                $('.modalnew').removeClass('show-modal');
                toastConfig.type = 'success';
                setToast(toastConfig, response.response);
                router.push('/');
              } else {
                toastConfig.type = 'error';
                setToast(toastConfig, response.response);
              }
            },
            function (error) {
              setIsGoogleLoading(false);
              toastConfig.type = 'error';
              setToast(toastConfig, 'Unexpected error occured');
            }
          );
        })
        .catch(err => {
          setIsGoogleLoading(false);
          toastConfig.type = 'error';
          setToast(toastConfig, 'Unexpected error occured');
        });
    },
    onError: error => {
      setIsGoogleLoading(false);
      toastConfig.type = 'error';
      setToast(toastConfig, 'Unexpected error occured');
    },
  });

  return (
    <div className="tab-pane active" id="tabs-1" role="tabpanel">
      <div className="main-login-popup-form">
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email('Invalid Email Address')
              .required('Please enter Email Address'),
            password: Yup.string()
              .min(6, 'Password must be atleast 6 characters')
              .max(100, 'Password must be less than 100 characters')
              .matches(
                /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
                'Password must be minimum 8 and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character'
              )
              .required('Password is required'),
          })}
          onSubmit={(values, { resetForm, setSubmitting }) => {
            login(values)
              .then(
                function (response) {
                  if (response.res_code === 200) {
                    setSubmitting(false);
                    setCookies(response);
                    resetForm();

                    $('.modalnew').removeClass('show-modal');
                    toastConfig.type = 'success';
                    setToast(toastConfig, response.response);
                    router.push('/');
                  } else {
                    setSubmitting(false);
                    toastConfig.type = 'error';
                    setToast(toastConfig, response.response);
                  }
                },
                function (error) {
                  setSubmitting(false);
                  toastConfig.type = 'error';
                  setToast(toastConfig, 'Unexpected error occurred.');
                }
              )
              .finally(function () {
                setSubmitting(false);
              });
          }}
        >
          {formik => (
            <Form autoComplete="off">
              <div className="row">
                <div className="col-xl-6">
                  <div className="form-group">
                    <label>Email Address*</label>
                    <Field autoComplete="off" name="email" type="email" className="form-control" />
                    <span style={{ color: 'red' }}>
                      <ErrorMessage name="email" />
                    </span>
                  </div>
                  <div className="form-group">
                    <label>Password*</label>
                    <div className="log-reg-pass-eye-box">
                      <Field
                        autocomplete="off"
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
                      {/* <i class="fa-sharp fa-solid fa-eye-slash"></i> */}
                    </div>
                    <span style={{ color: 'red' }}>
                      <ErrorMessage name="password" />
                    </span>
                  </div>
                  <div className="frgt-txt-btn-line">
                    {!formik.isSubmitting && (
                      <button
                        className="btn mdl-frm-btn"
                        type="submit"
                        disabled={isGoogleLoading || isLinkedinLoading}
                      >
                        Login
                      </button>
                    )}
                    {formik.isSubmitting && <RingLoader color="#03d8f4" size={80} />}

                    <div className="forgot-pass-txt">
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          $('.modalnew').removeClass('show-modal');
                          setIsOpenForgotPass(!isOpenForgotPass);
                        }}
                      >
                        Forgot password?
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className="you-can-login-section">
                    <div className="or-style-bx">
                      <p className="or-txt">OR</p>
                    </div>
                    <h5>You can Login with</h5>
                    <div className="row">
                      <div className="col-lg-6">
                        {/* <GoogleLogin
                          clientId={
                            process.env
                              .NEXT_PUBLIC_REACT_APP_GOOGLE_CLIENT_ID || ""
                          }
                          onSuccess={responseGoogle}
                          onFailure={responseGoogle}
                          cookiePolicy={"single_host_origin"}
                          // isSignedIn={true}
                          buttonText="Login"
                          render={(renderProps) => (
                            <button
                              className="pop-up-new-btn1"
                              variant="link"
                              onClick={renderProps.onClick}
                              disabled={renderProps.disabled}
                            >
                              <img
                                src="/images/login-social1.png"
                                className="login-social-new"
                                alt=""
                              />
                              Login with Google
                            </button>
                          )}
                        ></GoogleLogin> */}
                        <button
                          className="pop-up-new-btn1"
                          // variant="link"
                          onClick={e => {
                            e.preventDefault();
                            googleLoginData();
                          }}
                          disabled={isGoogleLoading}
                        >
                          {isGoogleLoading ? (
                            <div className="spinner-border" role="status">
                              <span className="visually-hidden"></span>
                            </div>
                          ) : (
                            <>
                              <img
                                src="/images/login-social1.png"
                                className="login-social-new"
                                alt=""
                              />
                              Login with Google
                            </>
                          )}
                        </button>
                      </div>
                      <div className="col-lg-6">
                        {/* <LoginSocialLinkedin
                          client_id={"81pl08y8qkolzf"}
                          client_secret={"mBvZ9wHN1vOsly2c"}
                          redirect_uri={"https://oauth.io/auth"}
                          onLoginStart={(e) => {
                            console.log(e);
                          }}
                          onResolve={({ provider, data }) => {
                            console.log(
                              "🚀 ~ file: LoginModal.js:310 ~ LoginModal ~ provider, data:",
                              provider,
                              data
                            );
                          }}
                          onReject={(err) => {
                            console.log(err);
                          }}
                        >
                          <button className="pop-up-new-btn2">
                            <img
                              src="/images/login-social2.png"
                              className="login-social-new"
                              alt=""
                            />
                            Login with Linkedin
                          </button>
                        </LoginSocialLinkedin> */}
                        <button
                          className="pop-up-new-btn2"
                          onClick={e => {
                            e.preventDefault();
                            linkedInLogin();
                          }}
                          disabled={isLinkedinLoading}
                        >
                          {isLinkedinLoading ? (
                            <div className="spinner-border" role="status">
                              <span className="visually-hidden"></span>
                            </div>
                          ) : (
                            <>
                              <img
                                src="/images/login-social2.png"
                                className="login-social-new"
                                alt=""
                              />
                              Login with Linkedin
                            </>
                          )}
                        </button>
                      </div>
                      <div className="col-lg-12">
                        <Link href="/service-provider/welcome" className="pop-up-new-btn3">
                          <div className="pop-up-new-btn3">
                            <img
                              src="/images/login-social3.png"
                              className="login-social-new"
                              alt=""
                            />
                            Become a partner
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <ForgotPassword
        isOpen={isOpenForgotPass}
        onCloseModal={() => {
          $('.modalnew').addClass('show-modal');
          setIsOpenForgotPass(false);
        }}
        id="forgot-password-modal"
      />
    </div>
  );
};

export default LoginModal;
