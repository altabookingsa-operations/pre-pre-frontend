'use client';
import { useContext, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Context } from '@/app/context';
import VerifyNumberModal from './otpPopup';
const RegistrationPage = ({  }) => {
  const { dispatch } = useContext(Context);
  const [type, setType] = useState('register');
  const today = new Date();
  const maxSelectableDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  if (type === 'otp') {
    return <VerifyNumberModal setType={setType} />;
  }

  return (
    <>
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
          nationality: '',
          dateOfBirth: '',
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
          confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Confirm Password must match')
            .min(8, 'Password must be at least 8 characters')
            .matches(
              /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
              'Confirm Password must be at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
            )
            .required('Confirm Password is required'),
          nationality: Yup.string().required('Please select Nationality'),
          dateOfBirth: Yup.string()
            .required('Please select Date of Birth')
            .test('age', 'You must be at least 18 years old', function (value) {
              if (!value) return false;
              const dob = new Date(value);
              if (Number.isNaN(dob.getTime())) return false;
              const today = new Date();
              let age = today.getFullYear() - dob.getFullYear();
              const m = today.getMonth() - dob.getMonth();
              if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
                age--;
              }
              return age >= 18;
            }),
          policyCheck: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
        })}
        onSubmit={(values, { resetForm, setSubmitting }) => { }}
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
            <section className="relative pb-[50px] lg:pb-[70px] w-full text-white bg-cover bg-center brding-pass-registration min-h-[1100px]"
            // style={{ backgroundImage: 'url(images/brdngpass-registration-back.png)' }}
            >
              {/* <div className="relative z-21 justify-between lg:px-16 lg:py-6 lg:pb-0 pt-[10px]">
              <div >
                <img src="images/logo.png" className="w-[230px] main-logo m-[0_auto] block lg:m-[0]" />
              </div>
            </div> */}
              <div className="border border-[#72b4d1] rounded-[22px] px-5 lg:px-12 py-5 mb-8 bg-center bg-cover table m-[0_auto] text-center mt-[20px] lg:mt-[-30px] lg:min-w-[506px]" style={{ backgroundImage: 'url(images/banner-big-text-back.png)', boxShadow: '0 4px 8px 0 rgb(0 0 0)' }}>
                <p className="tracking-[4px] lg:tracking-[8px] text-white text-[14px] lg:text-[18px] uppercase">
                  Get Your Alta Booking
                </p>
                <h1 className="text-[24px] lg:text-[40px] font-bold ">
                  Boarding Pass
                </h1>
              </div>
              <div className="mt-[40px] table m-[0_auto] text-[#fff]">
                <div className="flex border-b-2 border-dashed pb-[5px] mb-[8px]">
                  <h4 className="text-[12px] lg:text-[18px] font-semibold">HOME CITY</h4>
                  <div className="mx-[10px] mt-[-7px] relative">
                    <div className="absolute top-[-10px] left-[0] right-[0] m-[0_auto] w-[25px] h-[25px] bg-[#3DC7DB] rounded-[50%] flex items-center justify-center">
                      <img src="/images/plane.png" className="w-[20px]" alt="" />
                    </div>
                    <img src="/images/line-shape2.png" className="w-[85px] lg:w-[122px] mb-[2px]" alt="" />
                    <img src="/images/line-shape.png" className="w-[85px] lg:w-[122px]" alt="" />
                  </div>
                  <h4 className="text-[12px] lg:text-[18px] font-semibold">ALTA BOOKING EARLY ACCESS</h4>
                </div>
                <div className="bg-[#0092A8] p-[1px] flex justify-center gap-[40px] text-[12px] lg:text-[16px]">
                  <p>FLIGHT <span className="font-semibold">AB2026</span></p>
                  <p>GATE <span className="font-semibold">A1</span></p>
                  <p>CHECK-IN <span className="font-semibold">OPEN</span></p>
                </div>
              </div>
              {/* <div className="flex mt-[40px] lg:w-[70%] m-[0_auto] flex_main_reg_frm "> */}
              <div className="flex mt-[40px] lg:w-[70%] mx-auto max-[990px]:block max-[990px]:w-[97%]">
                <div className="lg:w-[70%] rounded-[20px] bg-[#0000002e] border border-[#368BFA] relative lg:border-r-0" style={{ backdropFilter: 'blur(8px)', zIndex: 2 }}>
                  <img src="/images/dotted-line.png" alt=""
                    // style={{ position: 'absolute', right: '-6px', top: 20 }}
                    className="absolute right-[-6px] top-[20px] max-[990px]:hidden" />

                  <div className="p-[10px_20px] flex-col lg:flex-row flex justify-center lg:justify-between" style={{ backgroundImage: 'linear-gradient(to right, #00e4f3 ,#00a2e5,#00d3f0)', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <img src="/images/alta-white-logo.png" className="w-[200px] object-contain m-[0_auto] block lg:m-[0]" alt="" />
                    <div className="flex items-center justify-center lg:justify-start">
                      <h5 className="text-[13px] lg:text-[18px] font-semibold text-[#000] uppercase">LONDON</h5>
                      <img src="/images/plane2.png" className="w-[50px] object-contain mx-[10px]" alt="" />
                      <h5 className="text-[13px] lg:text-[18px] font-semibold text-[#000] uppercase">alta booking early access</h5>
                    </div>
                  </div>
                  <div className="px-[20px] lg:px-[30px] py-[20px]">
                    <div className="flex gap-[15px] text-[#fff] items-center">
                      {/* <div className="bg-[#1ABDD6] p-[8px_3px] after-shape-nw relative" style={{ borderBottomRightRadius: 10, borderTopRightRadius: 10 }}>
                      <p className="uppercase">flight <span className="uppercase font-semibold bg-[#008397] p-[5px] after-shape-nw2 relative ml-[10px]" style={{ borderBottomRightRadius: 10, borderTopRightRadius: 10 }}>ab2026</span></p>
                    </div> */}
                      <div className="bg-[#1ABDD6] p-[8px_3px] relative rounded-r-[10px]
                        after:content-[''] after:absolute after:left-[-16px] after:top-0
                        after:w-0 after:h-0 after:border-l-[16px] after:border-l-transparent
                        after:border-b-[40px] after:border-b-[#1ABDD6]">

                        <p className="uppercase">
                          flight
                          <span className="uppercase font-semibold bg-[#008397] p-[5px] relative ml-[10px] rounded-r-[10px]
                        after:content-[''] after:absolute after:left-[-9px] after:top-0
                        after:w-0 after:h-0 after:border-l-[9px] after:border-l-transparent
                        after:border-b-[33px] after:border-b-[#008397]">
                            ab2026
                          </span>
                        </p>

                      </div>
                      <h3 className="font-bold text-[20px] uppercase">check-in</h3>
                    </div>
                    <div className="flex flex-col gap-5 lg:grid grid-cols-2 gap-3 pt-4 items-baseline">
                      <div className="mt-[20px] text-[16px] ">
                        <label className="text-[16px] font-medium">Title*</label>
                        <div className="flex gap-6 ">
                          <label className="flex items-center gap-2">
                            <input type="radio" name="title" defaultChecked /> Mr.
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="radio" name="title" /> Mrs.
                          </label>
                          <label className="flex items-center gap-2">
                            <input type="radio" name="title" /> Miss
                          </label>
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="text-[16px] font-regular mb-2 block">Home City*</label>
                        <input type="text" className="bg-[#00000038] border border-slate-700 rounded-lg p-3 w-full shadow-[inset_0px_2px_14px_0px_#000000b8]" />
                      </div>
                      <div className="w-full">
                        <label className="text-[16px] font-regular mb-2 block">First Name*</label>
                        <input type="text" className="bg-[#00000038] border border-slate-700 rounded-lg p-3 w-full shadow-[inset_0px_2px_14px_0px_#000000b8]" />
                      </div>
                      <div className="w-full">
                        <label className="text-[16px] font-regular mb-2 block">Last Name*</label>
                        <input type="text" className="bg-[#00000038] border border-slate-700 rounded-lg p-3 w-full shadow-[inset_0px_2px_14px_0px_#000000b8]" />
                      </div>
                      <div className="w-full">
                        <label className="text-[16px] font-regular mb-2 block">Phone Number*</label>
                        <input type="text" className="bg-[#00000038] border border-slate-700 rounded-lg p-3 w-full shadow-[inset_0px_2px_14px_0px_#000000b8]" />
                      </div>
                      <div className="w-full">
                        <label className="text-[16px] font-regular mb-2 block">Email Address*</label>
                        <input type="email" className="bg-[#00000038] border border-slate-700 rounded-lg p-3 w-full shadow-[inset_0px_2px_14px_0px_#000000b8]" />
                      </div>
                      <div className="w-full">
                        <label className="text-[16px] font-regular mb-2 block">Nationality*</label>
                        <select className="bg-[#00000038] border border-slate-700 rounded-lg p-3 w-full shadow-[inset_0px_2px_14px_0px_#000000b8]">
                          <option>Nationality</option>
                        </select>
                      </div>
                      <div className="w-full">
                        <label className="text-[16px] font-regular mb-2 block text-[#fff]">Date of Birth*</label>
                        {/* <input type="date" className="bg-[#00000038] border border-slate-700 rounded-lg p-3 w-full shadow-[inset_0px_2px_14px_0px_#000000b8]" /> */}
                        <div className="w-full [&_.react-datepicker-wrapper]:w-full 
                        [&_.react-datepicker__input-container]:w-full">
                          <DatePicker
                            className="bg-[#00000038] border border-slate-700 rounded-lg p-3 w-full shadow-[inset_0px_2px_14px_0px_#000000b8] placeholder-opacity-100"
                            dateFormat="EEE dd MMM yyyy" // 👈 updated format
                            showYearDropdown
                            showMonthDropdown
                            dropdownMode="select"
                            maxDate={maxSelectableDate}
                            inputReadOnly={true}
                            placeholderText="dd-mm-yyyy"
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <label className="text-[16px] font-regular mb-2 block">Password*</label>
                        <div className="flex bg-[#00000038] rounded-lg p-3 border border-slate-700 shadow-[inset_0px_2px_14px_0px_#000000b8]">
                          <Field
                            autoComplete="nope"
                            name="password"
                            type="password"
                            className="w-full outline-none focus:outline-none focus:ring-0 border-none focus:border-none"
                          />
                          <i
                            className={
                              true ? 'fa-solid fa-eye mt-1' : 'fa-sharp fa-solid fa-eye-slash mt-1'
                            }
                          ></i>
                        </div>
                        {/* <input type="password" className="bg-[#00000038] border border-slate-700 rounded-lg p-3 w-full shadow-[inset_0px_2px_14px_0px_#000000b8]" /> */}
                      </div>
                      <div className="w-full">
                        <label className="text-[16px] font-regular mb-2 block">Confirm Password*</label>
                        {/* <input type="password" className="bg-[#00000038] border border-slate-700 rounded-lg p-3 w-full shadow-[inset_0px_2px_14px_0px_#000000b8]" /> */}
                        <div className="flex bg-[#00000038] rounded-lg p-3 border border-slate-700 shadow-[inset_0px_2px_14px_0px_#000000b8]">
                          <Field
                            autoComplete="nope"
                            name="confirmPassword"
                            type="password"
                            className="w-full outline-none focus:outline-none focus:ring-0 border-none focus:border-none"
                          />
                          <i
                            className={
                              true ? 'fa-solid fa-eye mt-1' : 'fa-sharp fa-solid fa-eye-slash mt-1'
                            }
                          ></i>
                        </div>
                      </div>
                      <button className="col-span-2 bg-[#01BDD6] hover:bg-cyan-400 text-[#fff] text-[18px] font-semibold py-3 mt-[10px] rounded-xl w-full"
                        //onClick={() => { dispatch({ type: "BACKGROUND_SHOW", payload: false }); setType('otp'); }}
                        >
                        Complete Check-In
                      </button>
                    </div>
                    <p className="text-[14px] text-center py-[15px] relative log_txt mb-[15px]
                    after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0
                    after:mx-auto after:w-[80%] after:h-[1px]
                    after:bg-[linear-gradient(to_right,#fff0,#00CEFF,#fff0)]">
                      Already have an account ? <span className="italic font-bold"
                        //onClick={() => setType('login')}
                      >
                        Login
                      </span>
                    </p>
                    {/* <p className="text-[14px] text-center py-[15px] relative log_txt mb-[15px]">Already have an account ? <span className="italic font-bold">Login</span></p> */}
                    <div className="flex flex-col lg:flex-row lg:gap-[60px]">
                      <div>
                        <p className="font-medium text-[16px] flex items-center gap-[5px] pb-[10px]"><img src="/images/tick2.png" className="w-[20px]" alt="" /> Early access to Alta Booking</p>
                        <p className="font-medium text-[16px] flex items-center gap-[5px] pb-[10px]"><img src="/images/tick2.png" className="w-[20px]" alt="" /> Chance to win dream trips</p>
                      </div>
                      <div>
                        <p className="font-medium text-[16px] flex items-center gap-[5px] pb-[10px]"><img src="/images/tick2.png" className="w-[20px]" alt="" /> Founding Traveller status</p>
                        <p className="font-medium text-[16px] flex items-center gap-[5px] pb-[10px]"><img src="/images/tick2.png" className="w-[20px]" alt="" /> Chance to win dream trips</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:w-[30%] mt-[20px] lg:mt-0 rounded-[20px] bg-[#0000002e] border border-[#368BFA] lg:border-l-0" style={{ backdropFilter: 'blur(8px)' }}>
                  <div className="p-[10px_20px] flex justify-between" style={{ backgroundImage: 'linear-gradient(to right, #00e4f3 ,#00a2e5,#00d3f0)', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <img src="/images/alta-white-logo.png" className="w-[200px] object-contain" alt="" />
                  </div>
                  <div className="p-[15px_20px]">
                    <div className="min-h-[94px] bg-center bg-cover p-[10px]" style={{ backgroundImage: 'url(images/erly_arr_back.png)' }}>
                      <h5 className="rounded-[44px] p-[5px_10px] bg-[#EAFCFF] text-[#131313] text-[14px] font-regular table mb-[5px]">CHECK-IN STATUS</h5>
                      <h4 className="font-semibold text-[20px]">Early Arrived</h4>
                    </div>
                    <div className="mt-[30px] relative pb-[15px] mb-[15px]">
                      <h4 className="uppercase text-[#01DEFF] font-semibold pb-[5px] text-[14px]">PASSENGER NAME</h4>
                      <p className="uppercase text-[#fff] font-semibold pb-[5px] text-[16px] lg:tracking-[8px]">nada de turckheim</p>
                      <div style={{ position: 'absolute', bottom: 0, width: '100%', height: 1, margin: '0 auto', left: 0, backgroundImage: 'linear-gradient(to right, #fff0, #00CEFF, #fff0)', content: '" "' }} />
                    </div>
                    <div className="relative pb-[15px] mb-[15px]">
                      <table className="w-full">
                        <tbody><tr>
                          <td className="uppercase text-[#01DEFF] font-semibold pb-[5px] text-[14px]">booking REF</td>
                          <td className="text-[16px] font-semibold">h179lp</td>
                        </tr>
                        </tbody></table>
                      <div style={{ position: 'absolute', bottom: 0, width: '100%', height: 1, margin: '0 auto', left: 0, backgroundImage: 'linear-gradient(to right, #fff0, #00CEFF, #fff0)', content: '" "' }} />
                    </div>
                    <div className="relative pl-[50px] pb-[15px] mb-[15px]">
                      <img src="/images/lin-2.png" className="absolute left-[20px] top-[5px]" alt="" />
                      <div className="absolute top-[45px] left-[10px] w-[25px] h-[25px] bg-[#2DA3BF] rounded-[50%] flex items-center justify-center"><img src="/images/plane3.png" className="w-[15px]" alt="" /></div>
                      <div className="pb-[30px]">
                        <h5 className="font-regular pb-[5px] text-[14px]">From</h5>
                        <h4 className="font-semibold text-[16px]">London (LHR)</h4>
                      </div>
                      <div>
                        <h5 className="font-regular pb-[5px] text-[14px]">To</h5>
                        <h4 className="font-semibold text-[16px]">Alta Booking Early Access(ABE)</h4>
                      </div>
                      <div style={{ position: 'absolute', bottom: 0, width: '100%', height: 1, margin: '0 auto', left: 0, backgroundImage: 'linear-gradient(to right, #fff0, #00CEFF, #fff0)', content: '" "' }} />
                    </div>
                    <div className="relative pb-[15px] mb-[15px]">
                      <table className="w-full">
                        <tbody><tr>
                          <td className="uppercase font-regular pb-[5px] text-[14px]">Flight <span className="font-semibold ml-[5px]">AB2026</span></td>
                          <td className="uppercase font-regular pb-[5px] text-[14px]">gate <span className="font-semibold ml-[5px]">A1</span></td>
                        </tr>
                          <tr>
                            <td className="uppercase font-regular pb-[5px] text-[14px]">cabin <span className="font-semibold ml-[5px]">FOUNDERS CLASS</span></td>
                            <td className="uppercase font-regular pb-[5px] text-[14px]">seat <span className="font-semibold ml-[5px]">1A</span></td>
                          </tr>
                        </tbody></table>
                      <div style={{ position: 'absolute', bottom: 0, width: '100%', height: 1, margin: '0 auto', left: 0, backgroundImage: 'linear-gradient(to right, #fff0, #00CEFF, #fff0)', content: '" "' }} />
                    </div>
                    <div className="relative pb-[15px] mb-[15px]">
                      <table className="w-full">
                        <tbody><tr>
                          <td className="uppercase text-[#01DEFF] font-semibold pb-[5px] text-[14px]">bOARDING GROUP 1</td>
                          <td className="text-[16px] font-semibold">56701</td>
                        </tr>
                        </tbody></table>
                      <div style={{ position: 'absolute', bottom: 0, width: '100%', height: 1, margin: '0 auto', left: 0, backgroundImage: 'linear-gradient(to right, #fff0, #00CEFF, #fff0)', content: '" "' }} />
                    </div>
                    <div className="relative pb-[15px] mb-[15px]">
                      <table className="w-full">
                        <tbody><tr>
                          <td className="uppercase text-[#01DEFF] font-semibold pb-[5px] text-[14px]">Arrival time</td>
                          <td className="text-[16px] font-semibold">5 hrs Before Departure</td>
                        </tr>
                        </tbody></table>
                    </div>
                    <div className="p-[15px_30px] bg-center bg-cover m-[-20px] mt-[20px]" style={{ backgroundImage: 'url(images/white-qr-back.png)', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                      <div className="flex items-center justify-center gap-[20px] text-[#0097AD] mb-[15px]">
                        <p className="text-[15px] font-regular">TICKET ID</p>
                        <p className="text-[16px] font-semibold">AB-47291853</p>
                      </div>
                      <img src="/images/qr.png" alt="" />
                      <p className="text-center text-[#000] mt-[10px] font-medium relative"><img src="/images/line-nw-2.png" className="absolute top-[12px] left-[-20px] w-[20%]" alt="" /> Gate closes at takeoff <img src="/images/line-nw-3.png" className="absolute top-[12px] right-[-20px] w-[20%]" alt="" /></p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </>
  )
}
export default RegistrationPage;