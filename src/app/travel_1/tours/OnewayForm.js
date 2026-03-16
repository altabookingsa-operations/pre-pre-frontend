// import React from 'react'

// const OnewayForm = () => {
//   return (
//       <>
//           <div>OnewayForm</div>
//     </>
//   )
// }

// export default OnewayForm

import React from 'react';
import { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation'; // Updated import for App Router
// import { useRouter } from "next/router";
// import * as Yup from "yup";
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
// import storageInstance from "../../utils/storageInstance";
// import gb from "date-fns/locale/en-GB";
// import moment from "moment";
import DatePicker, { registerLocale } from 'react-datepicker';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
// import AutoSuggest from "react-autosuggest";
// import axiosInstance from "../../utils/axiosInstance";
// import TravellersMode from "./TravellersMode";
import NProgress from 'nprogress';
import axiosFrontNodeInstance from '@/utils/axiosFrontNodeInstance';
// import axiosFrontNodeInstance from "../../utils/axiosFrontNodeInstance";

const OnewayForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  pickUpDate,
  setpickUpDate,
  suggestions,
  setSuggestions,
  countryValue,
  setCountryValue,
  allDestinationList,
  setAllDestinationList,
  setGetDestinationLoading,
  setFieldTouched,
  setFieldError,
}) => {
  // console.log('🚀 ~ OnewayForm ~ allDestinationList:', allDestinationList);
  const router = useRouter();
  /**
   * FOR DATE PICKER
   */
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const currentDate = new Date();
  const initialDate = currentDate.setDate(currentDate.getDate() + 1);
  const startDate = new Date(initialDate);
  const currentYear = new Date().getFullYear();
  const range = (start, end) => {
    return new Array(end - start).fill(null).map((d, i) => i + start);
  };
  const years = range(currentYear, getYear(new Date()) + 30);
  const CheckInCurrentDate = new Date(pickUpDate);
  const checkOutInitialDate = CheckInCurrentDate.setDate(CheckInCurrentDate.getDate() + 7);
  const endDate = new Date(checkOutInitialDate);

  const searchCity = async () => {
    const responseData = await axiosFrontNodeInstance.get('/activities/get-countries');
    return setSuggestions(responseData.data ? responseData.data : []);
  };

  const getDestination = async data => {
    NProgress.done();
    setGetDestinationLoading(true);
    const responseData = await axiosFrontNodeInstance.post('/activities/get-destinations', data);
    if (responseData?.data) {
      setAllDestinationList(responseData?.data);
      NProgress.done();
      setGetDestinationLoading(false);
    } else {
      NProgress.done();
      setGetDestinationLoading(false);
    }
  };
  useEffect(() => {
    searchCity();
  }, []);

  useEffect(() => {
    if (
      router?.query?.pickUpDate ||
      router?.query?.country_musement_id ||
      router?.query?.destination ||
      router?.query?.youths ||
      router?.query?.youthDateOfBirth ||
      router?.query?.country_name ||
      router?.query?.destination_code ||
      router?.query?.destination_name ||
      router?.query?.destination_lat ||
      router?.query?.destination_lng ||
      router?.query?.musement_city_id ||
      router?.query?.hotelbed_code
    ) {
      // Handle country and musement ID
      if (
        router?.query?.destination_code ||
        router?.query?.destination_name ||
        router?.query?.destination_lat ||
        router?.query?.destination_lng ||
        router?.query?.musement_city_id
      ) {
        const data = {
          code: router?.query?.destination_code,
          name: router?.query?.destination_name,
          lat: parseFloat(router?.query?.destination_lat),
          lng: parseFloat(router?.query?.destination_lng),
          musement_city_id: Number(router?.query?.musement_city_id),
        };
        setFieldValue('destination', JSON.stringify(data));
      }
      // Handle country and musement ID
      if (
        router?.query?.country_musement_id ||
        router?.query?.country_name ||
        router?.query?.hotelbed_code
      ) {
        const data = {
          hotelbed_code: router?.query?.hotelbed_code,
          musement_id: Number(router?.query?.country_musement_id),
          name: router?.query?.country_name,
        };
        setCountryValue(data);
        setFieldValue('country_code', JSON.stringify(data));

        if (data.hotelbed_code || data.musement_id) {
          getDestination({
            country_code: data.hotelbed_code,
            musement_country_id: data.musement_id,
          });
        }
      }
      // Handle pickUpDate
      if (router.query.pickUpDate) {
        const pickUpDate = router.query.pickUpDate;

        // Ensure pickUpDate is a valid string before processing
        if (typeof pickUpDate === 'string' && pickUpDate.trim()) {
          const startDate = new Date(pickUpDate.trim());

          if (!isNaN(startDate.getTime())) {
            // Valid date
            setpickUpDate(startDate);
            setFieldValue('pickUpDate', startDate ?? '');

            // Calculate drop-off date (7 days later)
            const dropOffDate = router?.query?.dropOffDate
              ? new Date(router?.query?.dropOffDate.trim())
              : new Date(startDate.setDate(startDate.getDate() + 7));

            if (!isNaN(dropOffDate.getTime())) {
              setFieldValue('dropOffDate', dropOffDate ?? '');
            } else {
              console.error('Invalid dropOffDate:', router.query.dropOffDate);
            }

            setFieldError('pickUpDate', '');
            setFieldTouched('pickUpDate', false);
          } else {
            console.error('Invalid pickUpDate:', pickUpDate);
          }
        } else {
          console.error('pickUpDate is not a valid string:', pickUpDate);
        }
      }
    }
  }, [router?.query, setFieldValue]);

  return (
    <>
      <div className="row ferriesLandingForm">
        <div className="col-lg-4">
          <div className="form-group">
            <label>Country</label>
            <div className="frm-new-icon-box-all">
              <img src="/images/map.png" alt="" />
              <Field
                as="select"
                name="country_code"
                value={values.country_code}
                onChange={e => {
                  const data = JSON.parse(e.target.value);
                  setCountryValue(data);
                  setFieldValue('country_code', e.target.value);
                  getDestination({
                    country_code: data?.hotelbed_code,
                    musement_country_id: data?.musement_id,
                  });
                }}
                onBlur={handleBlur}
                className="form-control"
              >
                <option value="">Select Country</option>
                {suggestions?.map((item, i) => (
                  <option value={JSON.stringify(item)} key={i}>
                    {item.name}
                  </option>
                ))}
              </Field>
            </div>
            {touched.country_code && errors.country_code ? (
              <div
                style={{
                  marginTop: '6px',
                }}
              >
                <span style={{ color: 'red' }}>{errors.country_code}</span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="form-group">
            <label>Destination</label>
            <Field
              as="select"
              name="destination"
              value={values.destination}
              onChange={e => {
                setFieldValue('destination', e.target.value);
              }}
              onBlur={handleBlur}
              className="form-control"
            >
              <option value="">Select Destination</option>
              {allDestinationList?.map((item, i) => (
                <option value={JSON.stringify(item)} key={i}>
                  {item.name}
                </option>
              ))}
            </Field>

            {touched.destination && errors.destination ? (
              <div
                style={{
                  marginTop: '6px',
                }}
              >
                <span style={{ color: 'red' }}>{errors.destination}</span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="form-group">
            <label>Start Date</label>
            <div className="frm-new-icon-box-all">
              <img src="/images/calender.png" alt="" />
              <DatePicker
                className="form-control"
                placeholderText="Start Date"
                calendarStartDay={1}
                renderCustomHeader={({
                  date,
                  changeYear,
                  changeMonth,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div className="datepicker-custom-bx">
                    <div className="datepicker-custom-header">
                      <button
                        type="button"
                        className="cstm-date-btn1"
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                      >
                        <IoIosArrowDropleft className={`datePickerArrowIcon`} />
                      </button>
                      <div className="cstm-select-start">
                        <Field
                          as="select"
                          value={months[getMonth(date)]}
                          onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                          className="cstm-date-select"
                        >
                          {months.map(option => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <Field
                          as="select"
                          value={getYear(date)}
                          onChange={({ target: { value } }) => changeYear(Number(value))}
                          className="cstm-date-select"
                        >
                          {years.map(option => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <button
                        type="button"
                        className="cstm-date-btn2"
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                      >
                        <IoIosArrowDropright className={`datePickerArrowIcon`} />
                      </button>
                    </div>
                  </div>
                )}
                calendarClassName="rastaStripesCalendat"
                id="pickUpDate"
                name="pickUpDate"
                selected={values.pickUpDate}
                onChange={date => {
                  if (date) {
                    // Calculate drop-off date
                    const checkInCurrentDate = new Date(date);
                    const checkOutInitialDate = checkInCurrentDate.setDate(
                      checkInCurrentDate.getDate() + 7
                    );
                    const endDate = new Date(checkOutInitialDate);

                    // Update state and form values
                    setpickUpDate(date);
                    setFieldValue('pickUpDate', date);
                    setFieldValue('dropOffDate', endDate);

                    // Reset errors
                    setFieldError('pickUpDate', '');
                    setFieldTouched('pickUpDate', false);
                  }
                }}
                locale="gb"
                minDate={new Date()} // Disable past dates
                startDate={startDate}
                showDisabledMonthNavigation
                dateFormat="EEE d MMM yyyy"
                onKeyDown={e => e.preventDefault()} // Prevent manual input
              />
            </div>
            {touched.pickUpDate && errors.pickUpDate ? (
              <div style={{ marginTop: '6px' }}>
                <span style={{ color: 'red' }}>{errors.pickUpDate}</span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="form-group">
            <label>End Date</label>
            <div className="frm-new-icon-box-all">
              <img src="/images/calender.png" alt="" />
              <DatePicker
                className="form-control"
                calendarStartDay={1}
                renderCustomHeader={({
                  date,
                  changeYear,
                  changeMonth,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div className="datepicker-custom-bx">
                    <div className="datepicker-custom-header">
                      <button
                        type="button"
                        className="cstm-date-btn1"
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                      >
                        <IoIosArrowDropleft className={`datePickerArrowIcon`} />
                      </button>
                      <div className="cstm-select-start">
                        <Field
                          as="select"
                          value={months[getMonth(date)]}
                          onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                          className="cstm-date-select"
                        >
                          {months.map(option => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                        <Field
                          as="select"
                          value={getYear(date)}
                          onChange={({ target: { value } }) => changeYear(Number(value))}
                          className="cstm-date-select"
                        >
                          {years.map(option => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <button
                        type="button"
                        className="cstm-date-btn2"
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                      >
                        <IoIosArrowDropright className={`datePickerArrowIcon`} />
                      </button>
                    </div>
                  </div>
                )}
                calendarClassName="rastaStripesCalendat"
                id="dropOffDate"
                name="dropOffDate"
                selected={values.dropOffDate}
                onChange={date => {
                  if (date) {
                    setFieldValue('dropOffDate', date);
                  }
                }}
                locale="gb"
                minDate={values.pickUpDate ? new Date(values.pickUpDate) : new Date()} // Ensure minDate is properly set
                startDate={values.pickUpDate ? new Date(values.pickUpDate) : undefined}
                showDisabledMonthNavigation
                dateFormat="EEE d MMM yyyy"
                placeholderText="End Date"
                value={values.dropOffDate}
                onKeyDown={e => e.preventDefault()} // Prevent manual typing
              />
            </div>
            {touched.dropOffDate && errors.dropOffDate ? (
              <div
                style={{
                  marginTop: '6px',
                }}
              >
                <span style={{ color: 'red' }}>{errors.dropOffDate}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="hotel-ban-form-submit-btn">
        <button className="btn new-submit-btn" type="submit">
          Submit
        </button>
      </div>
    </>
  );
};

export default OnewayForm;
