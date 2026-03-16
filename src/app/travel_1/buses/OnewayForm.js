'use client';

import { Field } from 'formik';
import React from 'react';
// import { useRouter } from 'next/router';
// import * as Yup from 'yup';
// import { useState, useEffect } from 'react';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
// import setHours from 'date-fns/setHours';
// import setMinutes from 'date-fns/setMinutes';
import gb from 'date-fns/locale/en-GB';
// import moment from 'moment';
import DatePicker, { registerLocale } from 'react-datepicker';
// import storageInstance from '../../utils/storageInstance';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';

// import { CARS_SEARCH_DATA } from '../../utils/constants';
// import axiosInstance from '../../utils/axiosInstance';
// import AutoSuggest from 'react-autosuggest';
// import { endOfDay, startOfDay } from 'date-fns/fp';
// // import { Context } from '../../context';
// import { useContext } from 'react';
// import { setToast, toastConfig } from '../../utils/commonUtil';
// import axiosFrontNodeInstance from '../../utils/axiosFrontNodeInstance';
import { useGetBusesCountryList } from '@/hooks/useComman';

registerLocale('gb', gb);

const OnewayForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  startDate,
  pickUpTime,
  filterPassedTime,
  dropDate,
  dropTime,
  minTime,
  setDropDate,
  setDropTime,
  setpickUpDate,
  dropDtSetPicDt,
  setpickUpTime,
  setdepartureDate,
  departureDate,
  setPopup,
  popup,
  setAdultNo,
  adultNo,
  setChildNo,
  childNo,
  setInfantNo,
  infantNo,
  endDate,
  setValueF,
  setValueT,
  valueF,
  valueT,
  countryCode,
  setCountryCode,
}) => {
  const rangeChild = (start, end) => {
    if (start === end) return [start];
    return [start, ...rangeChild(start + 1, end)];
  };
  const { data: busCountryList } = useGetBusesCountryList();
  const currentYear = new Date().getFullYear();
  const range = (start, end) => {
    return new Array(end - start).fill(null).map((d, i) => i + start);
  };
  const years = range(currentYear, getYear(new Date()) + 30);
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

  const reverseLocation = () => {
    // setValueF(valueT);
    // setValueT(valueF);
    // $("fromStation").val(valueT);
    // $("toStation").val(valueF);
    // setSelectedFromStation(selectedToStation);
    // setSelectedToStation(selectedFromStation);
  };
  const incrementCount = traveller => {
    if (traveller === 'adult') {
      if (adultNo < 20) {
        setAdultNo(adultNo + 1);
        setFieldValue('adults', values.adults + 1);
      }
    }

    if (traveller === 'child') {
      if (childNo < 9) {
        setChildNo(childNo + 1);
        setFieldValue('youths', values.youths + 1);
      }
    }
    if (traveller === 'infant') {
      if (infantNo < 9) {
        setInfantNo(infantNo + 1);
        setFieldValue('infantNo', values.infantNo + 1);
      }
    }
  };

  const decrementCount = traveller => {
    if (traveller === 'adult') {
      if (adultNo > 1) {
        setAdultNo(adultNo - 1);
        setFieldValue('adult', values?.adult - 1);
      }
    }
    if (traveller === 'child') {
      if (childNo > 0) {
        setChildNo(childNo - 1);
        setFieldValue('youths', values?.youths - 1);
      }
    }
    if (traveller === 'infant') {
      if (infantNo > 0) {
        setInfantNo(infantNo - 1);
        setFieldValue('infantNo', values?.infantNo - 1);
      }
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-4">
          <div className="form-group">
            <label>From</label>
            <div className="frm-new-icon-box-all">
              <img src="/images/map.png" alt="" />
              <Field
                as="select"
                name="fromLocation"
                value={
                  values.fromLocation
                    ? JSON.stringify({
                        id: values.fromLocation,
                        full_name: valueF,
                        country: countryCode,
                      })
                    : ''
                }
                onChange={e => {
                  if (!e.target.value) {
                    setFieldValue('fromLocation', '');
                    setValueF('');
                    setCountryCode('');
                    return;
                  } else {
                    let val = JSON.parse(e.target.value);
                    setFieldValue('fromLocation', val?.id);
                    setValueF(val?.full_name);
                    setCountryCode(val?.country);
                  }
                }}
                className="form-control"
              >
                <option value="">No Preference</option>
                {busCountryList?.map((item, index) => (
                  <option
                    key={index}
                    value={JSON.stringify({
                      id: item.id,
                      full_name: item.full_name,
                      country: item?.country_code2,
                    })}
                  >
                    {item?.name}
                  </option>
                ))}
              </Field>
            </div>
            {touched.fromLocation && errors.fromLocation ? (
              <div
                style={{
                  marginTop: '6px',
                }}
              >
                <span style={{ color: 'red' }}>{errors.fromLocation}</span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="col-lg-1 d-none d-lg-block">
          <div className="new-double-arrow-img" onClick={reverseLocation}>
            <img src="/images/double-arrow.png" alt="" />
          </div>
        </div>

        <div className="col-lg-4">
          <div className="form-group">
            <label>To</label>
            <div className="frm-new-icon-box-all">
              <img src="/images/map.png" alt="" />
              <Field
                as="select"
                name="toLocation"
                value={
                  values.toLocation
                    ? JSON.stringify({
                        id: values.toLocation,
                        full_name: valueT,
                      })
                    : ''
                }
                onChange={e => {
                  if (!e.target.value) {
                    setFieldValue('toLocation', '');
                    setValueT('');
                    return;
                  } else {
                    let val = JSON.parse(e.target.value);
                    setFieldValue('toLocation', val?.id);
                    setValueT(val?.full_name);
                  }
                }}
                className="form-control"
              >
                <option value="">No Preference</option>
                {busCountryList?.map((item, index) => (
                  <option
                    key={index}
                    value={JSON.stringify({ id: item.id, full_name: item.full_name })}
                  >
                    {item?.name}
                  </option>
                ))}
              </Field>
            </div>
            {touched.toLocation && errors.toLocation ? (
              <div
                style={{
                  marginTop: '6px',
                }}
              >
                <span style={{ color: 'red' }}>{errors.toLocation}</span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="col-lg-3">
          <div className="form-group">
            <label>Departure Date</label>
            <div className="frm-new-icon-box-all">
              <img src="/images/calender.png" alt="" />
              <DatePicker
                className="form-control"
                calendarStartDay={1}
                onFocus={e => e.target.blur()}
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
                id="departureDate"
                name="departureDate"
                placeholderText="Departure Date"
                selected={values.departureDate}
                onChange={date => {
                  setFieldValue('departureDate', date);
                  handleChange;
                }}
                locale="gb"
                minDate={startDate}
                maxDate={endDate}
                startDate={startDate}
                showDisabledMonthNavigation
                dateFormat="EEE d MMM yyyy"
                value={values.departureDate}
              />
            </div>
            {touched.departureDate && errors.departureDate ? (
              <div
                style={{
                  marginTop: '6px',
                }}
              >
                <span style={{ color: 'red' }}>{errors.departureDate}</span>
              </div>
            ) : null}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group home-src-dropdown">
            <label>Passengers(s)</label>
            <div className="dropdown">
              <div className="frm-new-icon-box-all">
                <img src="/images/dropdown-arrow.png" alt="" />
                <button
                  type="button"
                  className="btn dropdown-toggle"
                  onClick={() => setPopup('guestPopup')}
                >
                  <i className="zmdi zmdi-account"></i>
                  <div className="home-srvc-element">
                    <p>
                      <span>{adultNo} Adults</span>
                    </p>
                    <p>
                      <span>{childNo} Child</span>
                    </p>
                    <p>
                      <span>{infantNo} Infant</span>
                    </p>
                  </div>
                </button>
              </div>
              {popup === 'guestPopup' && (
                <div className="travelerDetailsPopup-new">
                  <h5>Travellers</h5>
                  <div className="guest-plus-minus-bx">
                    <h6>Adults</h6>
                    <div className="number">
                      <button
                        type="button"
                        className="minus"
                        disabled={adultNo > 1 ? false : true}
                        onClick={() => decrementCount('adult')}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={adultNo}
                        disabled
                        onChange={event => {
                          setAdultNo(parseInt(event.target.value));
                          setFieldValue('adult', event.target.value);
                        }}
                      />
                      <button
                        type="button"
                        className="plus"
                        disabled={adultNo + childNo + infantNo < 9 ? false : true}
                        onClick={() => incrementCount('adult')}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="guest-plus-minus-bx">
                    <h6>Children (3-12 yrs.) </h6>
                    <div className="number">
                      <button
                        type="button"
                        className="minus"
                        disabled={childNo > 0 ? false : true}
                        onClick={() => {
                          decrementCount('child');
                        }}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={childNo}
                        disabled
                        onChange={event => {
                          setChildNo(event.target.value);
                          setFieldValue('youths', event.target.value);
                        }}
                      />
                      <button
                        type="button"
                        className="plus"
                        disabled={adultNo + childNo + infantNo < 9 ? false : true}
                        onClick={() => {
                          incrementCount('child');
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="guest-plus-minus-bx">
                    <h6>Infant (0-2 yrs.) </h6>
                    <div className="number">
                      <button
                        type="button"
                        className="minus"
                        disabled={infantNo > 0 ? false : true}
                        onClick={() => {
                          decrementCount('infant');
                        }}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={infantNo}
                        disabled
                        onChange={event => {
                          setInfantNo(event.target.value);
                          setFieldValue('infantNo', event.target.value);
                        }}
                      />
                      <button
                        type="button"
                        className="plus"
                        disabled={
                          infantNo < adultNo && adultNo + childNo + infantNo < 9 ? false : true
                        }
                        onClick={() => {
                          incrementCount('infant');
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="guest-select-done-btn">
                    <button
                      type="button"
                      className="btn done-btn"
                      onClick={() => {
                        setPopup('');
                      }}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
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
