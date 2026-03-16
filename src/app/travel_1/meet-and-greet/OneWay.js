// 'use client';

// import { useState, useEffect } from 'react';
// import { Formik, Field, Form, ErrorMessage } from 'formik';
// import { useRouter } from 'next/navigation';
// import * as Yup from 'yup';
// import getMonth from 'date-fns/getMonth';
// import getYear from 'date-fns/getYear';
// import gb from 'date-fns/locale/en-GB';
// import DatePicker, { registerLocale } from 'react-datepicker';
// import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
// // import storageInstance from '../../utils/storageInstance';
// // import axiosInstance from '../../utils/axiosInstance';
// import storageInstance from '@/utils/storageInstance';
// import axiosFrontNodeInstance from '@/utils/axiosFrontNodeInstance';
// import moment from 'moment';
// import { setToast, toastConfig } from '@/utils/commonUtil';
// // import { setToast, toastConfig } from '../../utils/commonUtil';
// registerLocale('gb', gb);
// const months = [
//   'January',
//   'February',
//   'March',
//   'April',
//   'May',
//   'June',
//   'July',
//   'August',
//   'September',
//   'October',
//   'November',
//   'December',
// ];
// const OneWay = ({ setActiveTab }) => {
//   const router = useRouter();
//   const [pickUpDate, setpickUpDate] = useState('');
//   const [adultNo, setAdultNo] = useState(1);
//   const [childNo, setChildNo] = useState(0);
//   const [infantNo, setInfantNo] = useState(0);
//   const [popup, setPopup] = useState('');

//   const currentDate = new Date();
//   const initialDate = currentDate.setDate(currentDate.getDate() + 1);
//   const startDate = new Date(initialDate);
//   const currentYear = new Date().getFullYear();
//   const range = (start, end) => {
//     return new Array(end - start).fill(null).map((d, i) => i + start);
//   };
//   const years = range(currentYear, getYear(new Date()) + 30);
//   const CheckInCurrentDate = new Date(pickUpDate);
//   const checkOutInitialDate = CheckInCurrentDate.setDate(CheckInCurrentDate.getDate() + 7);
//   //   const endDate = new Date(checkOutInitialDate);

//   const incrementCount = traveller => {
//     if (traveller === 'adult') {
//       if (adultNo < 6) setAdultNo(adultNo + 1);
//     }

//     if (traveller === 'child') {
//       if (childNo < 3) {
//         setChildNo(childNo + 1);
//       }
//     }
//     if (traveller === 'infant') {
//       if (infantNo < 6) {
//         setInfantNo(infantNo + 1);
//       }
//     }
//   };

//   const decrementCount = traveller => {
//     if (traveller === 'adult') {
//       if (adultNo > 1) setAdultNo(adultNo - 1);
//     }

//     if (traveller === 'child') {
//       if (childNo > 0) {
//         setChildNo(childNo - 1);
//       }
//     }
//     if (traveller === 'infant') {
//       if (infantNo > 0) {
//         setInfantNo(infantNo - 1);
//       }
//     }
//   };

//   return (
//     <>
//       <Formik
//         enableReinitialize={false}
//         initialValues={{
//           pickUpDate: '',
//           adults: Number(adultNo),
//           youths: Number(childNo),
//           infantNo: Number(infantNo),
//           flightNo: '',
//           luggages: 1,
//         }}
//         validationSchema={Yup.object({
//           flightNo: Yup.string().trim().required('Flight Number is required'),
//           pickUpDate: Yup.string().nullable().required('Departure Date is required'),
//         })}
//         onSubmit={async (values, { resetForm, setSubmitting }) => {
//           setActiveTab(true);

//           const outPutVal = {
//             flight_number: values.flightNo,
//             dates: moment(values.pickUpDate).format('YYYY-MM-DD'),
//           };

//           const responseData = await axiosInstance.post('flight/get-route-by-flight', outPutVal);

//           if (responseData.res_code === 200) {
//             const services = {
//               flights: [
//                 {
//                   arrival_airport: {
//                     iata: responseData?.data[0].flightPoints[1]?.iataCode,
//                   },
//                   departure_airport: {
//                     iata: responseData?.data[0].flightPoints[0].iataCode,
//                   },
//                   flight_no: values.flightNo,
//                   departure_date: moment(values.pickUpDate).format('YYYY-MM-DD'),
//                 },
//               ],
//               date: values.pickUpDate.toString(),
//               adult: Number(adultNo),
//               // infantNo: values.infantNo,
//               youths: Number(childNo),
//               luggages: values.luggages,
//               departingTo: responseData?.data[0].flightPoints[1].iataCode,
//               departingFrom: responseData?.data[0].flightPoints[0].iataCode,
//               arrivingFrom: '',
//               arrivingTo: '',
//               departingToIata: responseData?.data[0].flightPoints[1].iataCode,
//               departingFromIata: responseData?.data[0].flightPoints[0].iataCode,
//               travelType: 'oneway',
//             };

//             storageInstance?.setStorageObj('MEET_AND_GREET_DATA', JSON?.stringify(services));

//             services.flights = JSON?.stringify(services.flights);

//             router.push(
//               {
//                 pathname: '/travel/meet-and-greet/listing',
//                 query: services,
//               },
//               undefined,
//               { shallow: false }
//             );
//           } else if (responseData.res_code === 201) {
//             setActiveTab(false);
//             toastConfig.type = 'error';
//             setToast(toastConfig, responseData.data.errorMessage);
//           }
//         }}
//       >
//         {({
//           values,
//           errors,
//           touched,
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           isSubmitting,
//           setFieldValue,
//         }) => (
//           <Form autoComplete="off" id="transferLandingOneWay">
//             <div className="row ferriesLandingForm">
//               <div className="col-lg-12">
//                 <div className="form-group">
//                   <label>Flight Number</label>
//                   <Field
//                     name="flightNo"
//                     type="text"
//                     className="form-control query-input"
//                     placeholder="Flight Number"
//                     value={values.flightNo}
//                     onChange={e => {
//                       setFieldValue('flightNo', e.target.value.toUpperCase());
//                     }}
//                   />
//                   {touched.flightNo && errors.flightNo ? (
//                     <div
//                       style={{
//                         marginTop: '6px',
//                       }}
//                     >
//                       <span style={{ color: 'red' }}>{errors.flightNo}</span>
//                     </div>
//                   ) : null}
//                 </div>
//               </div>

//               <div className="col-lg-4">
//                 <div className="form-group">
//                   <label>Departure Date</label>
//                   <div className="frm-new-icon-box-all">
//                     <img src="/images/calender.png" alt="" />
//                     <DatePicker
//                       className="form-control"
//                       placeholderText="Departure Date"
//                       calendarStartDay={1}
//                       renderCustomHeader={({
//                         date,
//                         changeYear,
//                         changeMonth,
//                         decreaseMonth,
//                         increaseMonth,
//                         prevMonthButtonDisabled,
//                         nextMonthButtonDisabled,
//                       }) => (
//                         <div className="datepicker-custom-bx">
//                           <div className="datepicker-custom-header">
//                             <button
//                               type="button"
//                               className="cstm-date-btn1"
//                               onClick={decreaseMonth}
//                               disabled={prevMonthButtonDisabled}
//                             >
//                               <IoIosArrowDropleft className={`datePickerArrowIcon`} />
//                             </button>
//                             <div className="cstm-select-start">
//                               <Field
//                                 as="select"
//                                 value={months[getMonth(date)]}
//                                 onChange={({ target: { value } }) =>
//                                   changeMonth(months.indexOf(value))
//                                 }
//                                 className="cstm-date-select"
//                               >
//                                 {months.map(option => (
//                                   <option key={option} value={option}>
//                                     {option}
//                                   </option>
//                                 ))}
//                               </Field>

//                               <Field
//                                 as="select"
//                                 value={getYear(date)}
//                                 onChange={({ target: { value } }) => changeYear(Number(value))}
//                                 className="cstm-date-select"
//                               >
//                                 {years.map(option => (
//                                   <option key={option} value={option}>
//                                     {option}
//                                   </option>
//                                 ))}
//                               </Field>
//                             </div>
//                             <button
//                               type="button"
//                               className="cstm-date-btn2"
//                               onClick={increaseMonth}
//                               disabled={nextMonthButtonDisabled}
//                             >
//                               <IoIosArrowDropright className={`datePickerArrowIcon`} />
//                             </button>
//                           </div>
//                         </div>
//                       )}
//                       calendarClassName="rastaStripesCalendat"
//                       id="pickUpDate"
//                       name="pickUpDate"
//                       selected={values.pickUpDate}
//                       onChange={date => {
//                         const CheckInCurrentDate = new Date(date);
//                         const checkOutInitialDate = CheckInCurrentDate.setDate(
//                           CheckInCurrentDate.getDate() + 7
//                         );
//                         const endDate = new Date(checkOutInitialDate);
//                         setpickUpDate(date);
//                         setFieldValue('pickUpDate', date);
//                         setFieldValue('dropOffDate', endDate);
//                         handleChange;
//                       }}
//                       onBlur={handleBlur}
//                       locale="gb"
//                       minDate={new Date()}
//                       startDate={startDate}
//                       showDisabledMonthNavigation
//                       dateFormat="EEE d MMM yyyy"
//                       value={values.pickUpDate}
//                       onKeyDown={e => {
//                         e.preventDefault();
//                       }}
//                     />
//                   </div>
//                   {touched.pickUpDate && errors.pickUpDate ? (
//                     <div
//                       style={{
//                         marginTop: '6px',
//                       }}
//                     >
//                       <span style={{ color: 'red' }}>{errors.pickUpDate}</span>
//                     </div>
//                   ) : null}
//                 </div>
//               </div>

//               <div className="col-lg-4">
//                 <div className="form-group home-src-dropdown">
//                   <label>Traveller(s)</label>
//                   <div className="dropdown">
//                     <div className="frm-new-icon-box-all">
//                       <img src="/images/dropdown-arrow.png" alt="" />
//                       <button
//                         type="button"
//                         className="btn dropdown-toggle"
//                         onClick={() => setPopup('guestPopup')}
//                       >
//                         <i className="zmdi zmdi-account"></i>
//                         <div className="home-srvc-element">
//                           <p>
//                             <span>{adultNo} Adults</span>
//                           </p>
//                           <p>
//                             <span>{childNo} Child</span>
//                           </p>
//                           {/* <p>
//                             <span>{infantNo} Infant</span>
//                           </p> */}
//                         </div>
//                       </button>
//                     </div>
//                     {popup === 'guestPopup' && (
//                       <div className="travelerDetailsPopup-new">
//                         <h5>Travellers</h5>
//                         <div className="guest-plus-minus-bx">
//                           <h6>Adults</h6>
//                           <div className="number">
//                             <button
//                               type="button"
//                               className="minus"
//                               disabled={adultNo > 1 ? false : true}
//                               onClick={() => decrementCount('adult')}
//                             >
//                               -
//                             </button>
//                             <input
//                               type="text"
//                               value={adultNo}
//                               disabled
//                               onChange={event => {
//                                 setAdultNo(parseInt(event.target.value));
//                               }}
//                             />
//                             <button
//                               type="button"
//                               className="plus"
//                               disabled={adultNo < 20 ? false : true}
//                               onClick={() => incrementCount('adult')}
//                             >
//                               +
//                             </button>
//                           </div>
//                         </div>
//                         <div className="guest-plus-minus-bx">
//                           <h6>Children (3-12 yrs.) </h6>
//                           <div className="number">
//                             <button
//                               type="button"
//                               className="minus"
//                               disabled={childNo > 0 ? false : true}
//                               onClick={() => {
//                                 decrementCount('child');
//                               }}
//                             >
//                               -
//                             </button>
//                             <input
//                               type="text"
//                               value={childNo}
//                               disabled
//                               onChange={event => {
//                                 setChildNo(event.target.value);
//                               }}
//                             />
//                             <button
//                               type="button"
//                               className="plus"
//                               disabled={childNo < 6 ? false : true}
//                               onClick={() => {
//                                 incrementCount('child');
//                               }}
//                             >
//                               +
//                             </button>
//                           </div>
//                         </div>
//                         {/* <div className="guest-plus-minus-bx">
//                           <h6>Infant (0-2 yrs.) </h6>
//                           <div className="number">
//                             <button
//                               type="button"
//                               className="minus"
//                               disabled={infantNo > 0 ? false : true}
//                               onClick={() => {
//                                 decrementCount("infant");
//                               }}
//                             >
//                               -
//                             </button>
//                             <input
//                               type="text"
//                               value={infantNo}
//                               disabled
//                               onChange={(event) => {
//                                 setInfantNo(event.target.value);
//                               }}
//                             />
//                             <button
//                               type="button"
//                               className="plus"
//                               disabled={infantNo < 6 ? false : true}
//                               onClick={() => {
//                                 incrementCount("infant");
//                               }}
//                             >
//                               +
//                             </button>
//                           </div>
//                         </div> */}

//                         <div className="guest-select-done-btn">
//                           <button
//                             type="button"
//                             className="btn done-btn"
//                             onClick={() => {
//                               setPopup('');
//                             }}
//                           >
//                             Done
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               <div className="col-lg-4">
//                 <div className="form-group">
//                   <label>Luggage(s)</label>
//                   <div className="frm-new-icon-box-all">
//                     <img src="/images/dropdown-arrow.png" alt="" />
//                     <Field
//                       as="select"
//                       name="luggages"
//                       value={values.luggages}
//                       onChange={handleChange}
//                       onBlur={handleBlur}
//                       className="form-control"
//                     >
//                       <option value="0">0</option>
//                       <option value="1">1</option>
//                       <option value="2">2</option>
//                       <option value="3">3</option>
//                       <option value="4">4</option>
//                       <option value="5">5</option>
//                       <option value="6">6</option>
//                       <option value="7">7</option>
//                       <option value="8">8</option>
//                       <option value="9">9</option>
//                       <option value="10">10</option>
//                     </Field>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="hotel-ban-form-submit-btn">
//               <button className="btn new-submit-btn" type="submit">
//                 Submit
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </>
//   );
// };

// export default OneWay;
'use client';
import { useState } from 'react';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import getYear from 'date-fns/getYear';
import gb from 'date-fns/locale/en-GB';
import { registerLocale } from 'react-datepicker';
import moment from 'moment';
// import storageInstance from '../../utils/storageInstance';
// import axiosInstance from '../../utils/axiosInstance';
// import { setToast, toastConfig } from '../../utils/commonUtil';
import OnewayForm from './OnewayForm';
// import OneWayForm from './OneWayForm';
import storageInstance from '@/utils/storageInstance';
// import axiosFrontNodeInstance from '@/utils/axiosFrontNodeInstance';

import { setToast, toastConfig } from '@/utils/commonUtil';
registerLocale('gb', gb);

const OneWay = ({ setActiveTab }) => {
  const router = useRouter();
  const [pickUpDate, setpickUpDate] = useState('');
  const [adultNo, setAdultNo] = useState(1);
  const [childNo, setChildNo] = useState(0);
  const [infantNo, setInfantNo] = useState(0);
  const [popup, setPopup] = useState('');

  const currentDate = new Date();
  const initialDate = currentDate.setDate(currentDate.getDate() + 1);
  const startDate = new Date(initialDate);

  const currentYear = new Date().getFullYear();
  const range = (start, end) => new Array(end - start).fill(null).map((d, i) => i + start);

  const years = range(currentYear, getYear(new Date()) + 30);

  const incrementCount = traveller => {
    if (traveller === 'adult' && adultNo < 6) setAdultNo(adultNo + 1);
    if (traveller === 'child' && childNo < 3) setChildNo(childNo + 1);
    if (traveller === 'infant' && infantNo < 6) setInfantNo(infantNo + 1);
  };

  const decrementCount = traveller => {
    if (traveller === 'adult' && adultNo > 1) setAdultNo(adultNo - 1);
    if (traveller === 'child' && childNo > 0) setChildNo(childNo - 1);
    if (traveller === 'infant' && infantNo > 0) setInfantNo(infantNo - 1);
  };

  return (
    <Formik
      initialValues={{
        pickUpDate: null,
        flightNo: '',
        luggages: 1,
      }}
      validationSchema={Yup.object({
        flightNo: Yup.string().required('Flight Number is required'),
        pickUpDate: Yup.string().nullable().required('Departure Date is required'),
      })}
      onSubmit={async values => {
        setActiveTab(true);

        const outPutVal = {
          flight_number: values.flightNo,
          dates: moment(values.pickUpDate).format('YYYY-MM-DD'),
        };

        const responseData = await axiosInstance.post('flight/get-route-by-flight', outPutVal);

        if (responseData.res_code === 200) {
          const services = {
            flights: [
              {
                flight_no: values.flightNo,
                departure_date: moment(values.pickUpDate).format('YYYY-MM-DD'),
              },
            ],
            adult: Number(adultNo),
            youths: Number(childNo),
            luggages: values.luggages,
            travelType: 'oneway',
          };

          storageInstance?.setStorageObj('MEET_AND_GREET_DATA', JSON.stringify(services));

          router.push('/travel/meet-and-greet/listing');
        } else {
          setActiveTab(false);
          toastConfig.type = 'error';
          setToast(toastConfig, responseData.data.errorMessage);
        }
      }}
    >
      {formikProps => (
        <OnewayForm
          {...formikProps}
          adultNo={adultNo}
          childNo={childNo}
          infantNo={infantNo}
          popup={popup}
          setPopup={setPopup}
          incrementCount={incrementCount}
          decrementCount={decrementCount}
          startDate={startDate}
          years={years}
          setpickUpDate={setpickUpDate}
          pickUpDate={pickUpDate}
          setAdultNo={setAdultNo}
          setChildNo={setChildNo}
          //   setInfantNo={setInfantNo}
        />
      )}
    </Formik>
  );
};

export default OneWay;
