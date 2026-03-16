import React from 'react';
import ModalWarpper from './ModalWarpper';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import RingLoader from 'react-spinners/RingLoader';
import { setToast, toastConfig } from '../../utils/commonUtil';
import axiosInstance from '../../utils/axiosInstance';
import axiosFrontNodeInstance from '../../utils/axiosFrontNodeInstance';

const ForgotPassword = ({ isOpen, onCloseModal, id }) => {
  async function forgotPass(values) {
    let args = {
      email: values.email,
    };

    const response = await axiosFrontNodeInstance.post('/auth/forgot-password-by-email', args);
    return response;
  }

  return (
    <div>
      <ModalWarpper isOpen={isOpen} onCloseModal={onCloseModal} id={id}>
        <div className="container-custom-992 bg-grey-dark container">
          <div className="justify-content-center row">
            <div className="col-lg-11 col-12">
              <div className="row">
                <div className="py-3 mt-2 mb-4 border-bottom border-white-opacity-03 col-12">
                  <h4 className="font-size-28 text-white text-weight-semi-bold m-0">
                    Forgot Password
                  </h4>
                </div>
              </div>
              <div className="row">
                <div className="pb-3 m-0 col-12">
                  <Formik
                    initialValues={{
                      email: '',
                    }}
                    validationSchema={Yup.object({
                      email: Yup.string()
                        .email('Invalid email address')
                        .required('Please enter email'),
                    })}
                    onSubmit={(values, { resetForm, setSubmitting }) => {
                      forgotPass(values)
                        .then(
                          function (response) {
                            if (response.res_code === 200) {
                              setSubmitting(false);
                              resetForm();
                              onCloseModal();
                              toastConfig.type = 'success';
                              setToast(toastConfig, response.data);
                              $('.modalnew').removeClass('show-modal');
                            } else {
                              setSubmitting(false);
                              toastConfig.type = 'error';
                              setToast(toastConfig, response.data);
                              $('.modalnew').removeClass('show-modal');
                            }
                          },
                          function (error) {
                            setSubmitting(false);
                            toastConfig.type = 'error';
                            setToast(toastConfig, 'Unexpected error occured');
                          }
                        )
                        .finally(function () {
                          setSubmitting(false);
                        });
                    }}
                  >
                    {formik => (
                      <Form id="forgotPassForm">
                        <div className="row">
                          <div className="col-12">
                            <div className="mb-4 font-size-18 text-white text-weight-semi-bold form-group">
                              <label className="mb-4 text-weight-regular form-label">
                                Enter your account email to receive a link allowing you to reset
                                your password
                              </label>
                              <Field
                                autoComplete="nope"
                                name="email"
                                type="email"
                                className="form-control"
                              />
                              <span style={{ color: 'red' }}>
                                <ErrorMessage name="email" />
                              </span>
                            </div>
                          </div>
                          <div className="col-12">
                            {!formik.isSubmitting && (
                              <button type="submit" className="btn btn-primary">
                                Request Password Reset
                              </button>
                            )}
                            {formik.isSubmitting && <RingLoader color="#03d8f4" size={80} />}
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
              <div className="row">
                <div className="pb-3 mt-0 mb-3 col-12">
                  <button
                    type="submit"
                    className="bg-none border-0 px-0 py-2 font-size-18 line-height-extra text-grey text-weight-regular forgot-close btn btn-secondary"
                  >
                    Go to{' '}
                    <strong className="text-primary" onClick={onCloseModal}>
                      Sign In
                    </strong>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalWarpper>
    </div>
  );
};

export default ForgotPassword;
