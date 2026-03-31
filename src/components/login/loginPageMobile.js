'use client';
import { useLogin } from '@/app/hooks/useLogin';
import { Formik, Field, Form, ErrorMessage, setIn } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
const LoginPageMobile = () => {
  const router = useRouter();
  const { mutate: login, isPending: loginLoading } =
    useLogin({
      onSuccess: (res) => {
        router.push('/boarding-pass');
      },
      onError: (error) => {
        console.log("error occured", error);
      },
    });
  return (
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
          .min(8, 'Password must be at least 8 characters')
          .matches(
            /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/,
            'Password must be at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
          )
          .required('Password is required'),
      })}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        let loginPayload = {
          email: values.email.toLowerCase(),
          password: values.password,
        }
        console.log("loginPayload", loginPayload)
        //ankush.banerjee@pixelconsultancy.in
        //Ankush@9748
        login(loginPayload);
        resetForm();

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
          <section className="relative pb-[50px] lg:pb-[70px] w-full text-white bg-cover bg-center brding-pass-registration min-h-[1100px]" style={{ backgroundImage: 'url(images/mobile-registration-back.png)' }}>
            <div className="relative z-21 justify-between lg:px-16 lg:py-6 lg:pb-0 pt-[10px] ">
            </div>
            <div className=" border border-[#72b4d1] rounded-[22px] px-5 lg:px-12 py-5 mb-8 bg-center bg-cover table m-[0_auto] text-center mt-[20px] lg:mt-[-30px] lg:min-w-[506px]" style={{ backgroundImage: 'url(images/banner-big-text-back.png)', boxShadow: '0 4px 8px 0 rgb(0 0 0)' }}>
              <p className="tracking-[4px] lg:tracking-[8px] text-white text-[14px] lg:text-[18px] uppercase">
                Get Your Alta Booking
              </p>
              <h1 className="text-[24px] lg:text-[40px] font-bold ">
                Boarding Pass
              </h1>
            </div>
            <div className="mt-[40px] table m-[0_auto] text-[#fff] w-[93%] text-cty-bx">
              <div className="flex border-b-2 border-dashed pb-[5px] mb-[8px] justify-center">
                <h4 className="text-[11px] sm:text-[12px] md:text-[13px] lg:text-[18px] font-semibold">HOME CITY</h4>
                <div className="mx-[10px] mt-[-7px] relative">
                  <div className="absolute top-[-10px] left-[0] right-[0] m-[0_auto] w-[25px] h-[25px] bg-[#3DC7DB] rounded-[50%] flex items-center justify-center">
                    <img src="/images/plane.png" className="w-[20px]" alt="" />
                  </div>
                  <img src="/images/line-shape2.png" className="w-[85px] lg:w-[122px] mb-[2px]" alt="" />
                  <img src="/images/line-shape.png" className="w-[85px] lg:w-[122px]" alt="" />
                </div>
                <h4 className="text-[11px] sm:text-[12px] md:text-[13px] lg:text-[18px] font-semibold">ALTA BOOKING EARLY ACCESS</h4>
              </div>
              <div className="bg-[#0092A8] p-[1px] flex flex-wrap justify-center gap-[40px] text-[12px] md:text-[14px] lg:text-[16px]">
                <p>FLIGHT <span className="font-semibold">AB2026</span></p>
                <p>GATE <span className="font-semibold">A1</span></p>
                <p>CHECK-IN <span className="font-semibold">OPEN</span></p>
              </div>
            </div>
            {/* <div className="flex mt-[40px] lg:w-[70%] m-[0_auto] flex_main_reg_frm"> */}
            <div className="mt-[40px] w-[94%] mx-auto block md:w-[97%] lg:w-[95%] xl:w-[70%]">
              <div className="lg:w-[70%] rounded-[20px] bg-[#0000002e] border border-[#368BFA] relative lg:border-r-0" style={{ backdropFilter: 'blur(8px)', zIndex: 2, borderBottomLeftRadius: '0!important', borderBottomRightRadius: '0!important' }}>
                <img
                  src="/images/dotted-line.png"
                  className="hidden lg:block absolute right-[-6px] top-[20px]"
                  alt=""
                />
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
                    <div className="bg-[#1ABDD6] p-[8px_3px] after-shape-nw relative" style={{ borderBottomRightRadius: 10, borderTopRightRadius: 10 }}>
                      <p className="uppercase">flight <span className="uppercase font-semibold bg-[#008397] p-[5px] after-shape-nw2 relative ml-[10px]" style={{ borderBottomRightRadius: 10, borderTopRightRadius: 10 }}>ab2026</span></p>
                    </div>
                    <h3 className="font-bold text-[20px] uppercase">check-in</h3>
                  </div>
                  <div className="flex flex-col gap-5 lg:grid grid-cols-2 gap-3 pt-4 items-baseline">
                    <div className="w-full">
                      <label className="text-[16px] font-regular mb-2 block">Email Address*</label>
                      <Field
                        type="email"
                        name="email"
                        className="bg-[#00000038] border border-slate-700 rounded-lg p-3 w-full shadow-[inset_0px_2px_14px_0px_#000000b8]"
                        onClick={(e) => setFieldValue('email', e?.target?.value)} />
                      <ErrorMessage
                        name="email"
                        component="div"
                        style={{ color: "red", fontSize: 12 }}
                      />
                    </div>
                    <div className="w-full">
                      <label className="text-[16px] font-regular mb-2 block">Password*</label>
                      <Field
                        type="password"
                        name="password"
                        className="bg-[#00000038] border border-slate-700 rounded-lg p-3 w-full shadow-[inset_0px_2px_14px_0px_#000000b8]"
                      onClick={(e) => setFieldValue('password', e?.target?.value)}
                        />
                      <ErrorMessage
                        name="password"
                        component="div"
                        style={{ color: "red", fontSize: 12 }}
                      />
                    </div>
                    <button className="col-span-2 bg-[#01BDD6] hover:bg-cyan-400 text-[#fff] text-[18px] font-semibold py-3 mt-[10px] rounded-xl w-full">
                      Log In
                    </button>
                  </div>
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
            </div>
          </section>
        </Form>
      )}
    </Formik>
  )
}
export default LoginPageMobile;