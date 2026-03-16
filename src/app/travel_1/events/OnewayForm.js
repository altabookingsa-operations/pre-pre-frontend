import { Field } from 'formik';
import React from 'react';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
// import setHours from 'date-fns/setHours';
// import setMinutes from 'date-fns/setMinutes';
import gb from 'date-fns/locale/en-GB';
// import moment from 'moment';
import DatePicker, { registerLocale } from 'react-datepicker';
import { endOfDay, startOfDay } from 'date-fns/fp';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { useGetEventCountryList, useGetEventsName, useGetEventsSports } from '@/hooks/useComman';
// import { useGetEventCountryList, useGetEventsName, useGetEventsSports } from '@/hooks/useComman';

registerLocale('gb', gb);
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
const OnewayForm = ({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => {
  const { data: sportsList } = useGetEventsSports();
  const { data: countryList } = useGetEventCountryList();
  const { mutate: eventListCall, data: eventList } = useGetEventsName();
  const currentYear = new Date().getFullYear();
  const range = (start, end) => {
    return new Array(end - start).fill(null).map((d, i) => i + start);
  };
  const years = range(currentYear, getYear(new Date()) + 30);

  return (
    <>
      {' '}
      <div className="row">
        <div className="col-lg-4">
          <div className="form-group">
            <label>Get Sports Type</label>
            <div className="frm-new-icon-box-all">
              <img src="/images/dropdown-arrow.png" alt="" />
              <Field
                as="select"
                name="get_sports"
                value={values.get_sports}
                onChange={e => {
                  setFieldValue('get_sports', e.target.value);
                  // if(e?.target?.value?.length && values?.country?.length){
                  setFieldValue('event_name', '');
                  eventListCall({
                    sport_type: e.target.value,
                    country: values.country === 'motogp' ? 'world' : values.country,
                  });
                  // }
                }}
                onBlur={e => {
                  setFieldValue('get_sports', e.target.value);
                }}
                className="form-control"
              >
                <option value="">No Preference</option>
                {sportsList?.map((item, index) => (
                  <option key={index} value={item?.sport_id}>
                    {item.sport_id.toUpperCase()}
                  </option>
                ))}
              </Field>
            </div>
            {touched.get_sports && errors.get_sports ? (
              <div
                style={{
                  marginTop: '6px',
                }}
              >
                <span style={{ color: 'red' }}>{errors.get_sports}</span>
              </div>
            ) : null}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label>Country</label>
            <div className="frm-new-icon-box-all">
              <img src="/images/dropdown-arrow.png" alt="" />
              <Field
                as="select"
                name="country"
                value={values.country}
                onChange={e => {
                  setFieldValue('country', e.target.value);
                  // if(e?.target?.value?.length && values?.get_sports?.length){
                  setFieldValue('event_name', '');
                  eventListCall({
                    sport_type: values.get_sports,
                    country: values.get_sports === 'motogp' ? 'world' : e.target.value,
                  });
                  // }
                }}
                onBlur={e => {
                  setFieldValue('country', e.target.value);
                }}
                className="form-control"
              >
                <option value="">No Preference</option>
                {countryList?.map((item, index) => (
                  <option key={index} value={item?.code}>
                    {item.name}
                  </option>
                ))}
              </Field>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label>Event Name</label>
            <div className="frm-new-icon-box-all">
              <img src="/images/dropdown-arrow.png" alt="" />
              <Field
                as="select"
                name="event_name"
                disabled={!values?.get_sports?.length || !eventList?.length}
                value={values.event_name}
                onChange={e => {
                  setFieldValue('event_name', e.target.value);
                }}
                onBlur={e => {
                  setFieldValue('event_name', e.target.value);
                }}
                className="form-control"
              >
                <option value="">No Preference</option>
                {eventList?.map((item, index) => (
                  <option key={index} value={item?.tournament_id}>
                    {item?.official_name}
                  </option>
                ))}
              </Field>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group">
            <label>From Date</label>
            <div className="frm-new-icon-box-all">
              <img src="/images/calender.png" alt="" />

              <DatePicker
                className="form-control"
                calendarStartDay={1}
                // onFocus={(e) => e.target.blur()}
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
                name="from_date"
                onBlur={handleBlur}
                locale="gb"
                selected={values.from_date} // Bind value to Formik state
                onChange={date => setFieldValue('from_date', date)} // Set Formik state on change
                minDate={new Date()} // Prevent selecting past dates
                showDisabledMonthNavigation
                dateFormat="EEE d MMM yyyy"
                // value={values?.dropOffDate}
                placeholderText="From date"
                onFocus={e => e.target.blur()}
                onKeyDown={e => {
                  e.preventDefault();
                }}
              />
            </div>
            {touched.from_date && errors.from_date ? (
              <div
                style={{
                  marginTop: '6px',
                }}
              >
                <span style={{ color: 'red' }}>{errors.from_date}</span>
              </div>
            ) : null}
          </div>
        </div>{' '}
        <div className="col-lg-4">
          <div className="form-group">
            <label>To Date</label>
            <div className="frm-new-icon-box-all">
              <img src="/images/calender.png" alt="" />

              <DatePicker
                className="form-control"
                calendarStartDay={1}
                // onFocus={(e) => e.target.blur()}
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
                name="to_date"
                onBlur={handleBlur}
                selected={values.to_date}
                onChange={date => setFieldValue('to_date', date)}
                minDate={values.from_date || new Date()} // Ensure `to_date` is not before `from_date`
                showDisabledMonthNavigation
                locale="gb"
                dateFormat="EEE d MMM yyyy"
                // value={values?.dropOffDate}
                placeholderText="To date"
                onFocus={e => e.target.blur()}
                onKeyDown={e => {
                  e.preventDefault();
                }}
              />
            </div>
            {touched.to_date && errors.to_date ? (
              <div
                style={{
                  marginTop: '6px',
                }}
              >
                <span style={{ color: 'red' }}>{errors.to_date}</span>
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
