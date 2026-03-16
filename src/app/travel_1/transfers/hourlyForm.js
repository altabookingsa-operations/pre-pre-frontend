import dynamic from 'next/dynamic';
import { Field } from 'formik';
import React, { useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
import gb from 'date-fns/locale/en-GB';
import { useSearchParams } from 'next/navigation';
import moment from 'moment';

const PlaceComponent = dynamic(() => import('../place.component.jsx'), {
  ssr: false,
});
registerLocale('gb', gb);

const HourlyForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  cLocation,
  //   dLocation,
  setCLocation,
  setDLocation,
  //   reverseLocation,
  setPickPlaceId,
  //   setDropPlaceId,
  pickUpDate,
  setpickUpDate,
  //   startDate,
  setpickUpTime,
  setCountryCode,
  pickPlaceId,
  pickoptionClicked,
  setPickOptionClicked,
  setPopup,
  popup,
  adultNo,
  setAdultNo,
  childNo,
  setChildNo,
  infantNo,
  setInfantNo,
  setGender,
  gender,
}) => {
  const currentDate = new Date();
  const initialDate = currentDate.setDate(currentDate.getDate() + 1);
  const startDate = new Date(initialDate);
  const searchParams = useSearchParams();
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

  const filterPassedTime = time => {
    // console.log("🚀 ~ filterPassedTime ~ time:", time);
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  let handleColor = time => {
    return 'time-stripes';
  };

  useEffect(() => {
    if (!searchParams) return;

    const param = key => searchParams.get(key);

    if (param('pickUpDate') || param('pickUpTime') || param('pickUpLocation')) {
      //date
      const startDate = param('pickUpDate') ? new Date(param('pickUpDate')) : '';
      setpickUpDate(startDate);
      setFieldValue('pickUpDate', param('pickUpDate') ? param('pickUpDate') : '');
      //pick
      setFieldValue('pickUpLocation', param('pickUpLocation') ? param('pickUpLocation') : '');
      setCLocation(param('pickUpLocation'));
      setFieldValue('pickUpPlaceId', param('pickUpPlaceId'));
      setPickPlaceId(param('pickUpPlaceId'));
      setFieldValue('pickUpLatLng', {
        Latitude: Number(param('lat')),
        Longitude: Number(param('lng')),
      });
      //Hourly
      setFieldValue('hourly', param('hour') ? param('hour') : 1);
      //time
      const startDateTime = param('pickUpTime') ? new Date(param('pickUpTime')) : '';
      setpickUpDate(param('pickUpTime') ? startDateTime : startDate);
      setFieldValue(
        'pickUpTime',
        param('pickUpTime') ? moment(param('pickUpTime')).format('HH:mm') : ''
      );
      //passengers & luggages
      setFieldValue('passengers', param('passengers') ? param('passengers') : 1);
      setFieldValue('luggages', param('luggages') ? param('luggages') : 1);

      // location type
      setFieldValue('locationTypePick', param('locationTypeDrop') ? param('locationTypeDrop') : '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function extractTerminalAndAirport(text) {
    const terminalRegex = /\bTerminals?\b/i; // Matches "Terminal" or "Terminals"
    const airportRegex = /\bAirport\b/i; // Matches any word followed by "Airport"

    const terminalMatch = text?.match(terminalRegex);
    const airportMatch = text?.match(airportRegex);

    return [terminalMatch ? terminalMatch[0] : '', airportMatch ? airportMatch[0] : ''];
  }
  const incrementCount = traveller => {
    if (traveller === 'adult') {
      if (adultNo < 20) setAdultNo(adultNo + 1);
    }

    if (traveller === 'child') {
      if (childNo < 9) {
        setChildNo(childNo + 1);
      }
    }
    if (traveller === 'infant') {
      if (infantNo < 9) {
        setInfantNo(infantNo + 1);
      }
    }
  };

  const decrementCount = traveller => {
    if (traveller === 'adult') {
      if (adultNo > 1) setAdultNo(adultNo - 1);
      if (infantNo > adultNo - 1) setInfantNo(adultNo - 1);
    }

    if (traveller === 'child') {
      if (childNo > 0) {
        setChildNo(childNo - 1);
      }
    }
    if (traveller === 'infant') {
      if (infantNo > 0) {
        setInfantNo(infantNo - 1);
      }
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-lg-5">
          <div className="form-group">
            <label>Pick-Up Location</label>
            <div className="frm-new-icon-box-all">
              <img src="/images/map.png" alt="" />
              <PlaceComponent
                placeholderText="Pick-Up Location"
                onChange={handleChange}
                // onBlur={handleBlur}
                setFieldValue={setFieldValue}
                Location={cLocation}
                setLocation={setCLocation}
                // defaultValue={cLocation}
                setPlaceId={setPickPlaceId}
                type="tranferpick"
                id="pickUpLocation"
                setLocationTypePick=""
                setCountryCode={setCountryCode}
                setError={setPickOptionClicked}
                latLngName="pickUpLatLngHourly"
              />
            </div>
            {!cLocation?.length && touched.pickUpLocation && errors.pickUpLocation ? (
              <div
                style={{
                  marginTop: '6px',
                  marginLeft: '6px',
                }}
              >
                <span style={{ color: 'red' }}>{errors.pickUpLocation}</span>
              </div>
            ) : cLocation?.length && pickoptionClicked && !pickPlaceId?.length ? (
              <div
                style={{
                  marginTop: '6px',
                  marginLeft: '6px',
                }}
              >
                <span style={{ color: 'red' }}>Select Location from the list</span>{' '}
              </div>
            ) : null}
          </div>
        </div>
        <div className="col-lg-2 d-none d-lg-block">
          <div className="new-double-arrow-img"></div>
        </div>
        <div className="col-lg-5">
          <div className="form-group">
            <label>Hourly</label>
            <div className="frm-new-icon-box-all">
              <img src="/images/dropdown-arrow.png" alt="" />
              <Field
                as="select"
                name="hourly"
                value={values.hourly}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
              >
                <option value={1}>1 Hour</option>
                <option value={2}>2 Hours</option>
                <option value={3}>3 Hours</option>
                <option value={4}>4 Hours</option>
                <option value={5}>5 Hours</option>
                <option value={6}>6 Hours</option>
                <option value={7}>7 Hours</option>
                <option value={8}>8 Hours</option>
              </Field>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <div className="form-group">
            <label>Pick-Up Date</label>
            <div className="frm-new-icon-box-all">
              <img src="/images/calender.png" alt="" />
              <DatePicker
                className="form-control"
                placeholderText="Pick-Up Date"
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
                selected={pickUpDate}
                onChange={date => {
                  setpickUpDate(date);
                  setFieldValue('pickUpDate', date);
                  handleChange;
                }}
                // onBlur={handleBlur}
                locale="gb"
                minDate={new Date()}
                startDate={startDate}
                showDisabledMonthNavigation
                dateFormat="EEE d MMM yyyy"
                value={values.pickUpDate}
                onKeyDown={e => {
                  [];
                  e.preventDefault();
                }}
                onFocus={e => e.target.blur()}
              />
            </div>
            {touched.pickUpDate && errors.pickUpDate ? (
              <div
                style={{
                  marginTop: '6px',
                  marginLeft: '6px',
                }}
              >
                <span style={{ color: 'red' }}>{errors.pickUpDate}</span>
              </div>
            ) : null}
          </div>
        </div>
        <div className="col-lg-4">
          <div className="form-group timeOnly">
            <label>Pick-Up Time</label>
            <div className="frm-new-icon-box-all">
              <img src="/images/time.png" alt="" />
              <DatePicker
                placeholderText="Pick-Up Time"
                calendarStartDay={1}
                selected={pickUpDate}
                onChange={time => {
                  setpickUpDate(time);
                  setFieldValue('pickUpTime', time);
                  handleChange;
                }}
                // onBlur={handleBlur}
                filterTime={filterPassedTime}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={5}
                timeCaption="Select Pick-Up Time"
                dateFormat="HH:mm"
                timeFormat="HH:mm"
                id="pickUpTime"
                name="pickUpTime"
                value={values.pickUpTime}
                className="form-control"
                calendarClassName="rastaStripesTime"
                timeClassName={handleColor}
                onKeyDown={e => {
                  e.preventDefault();
                }}
                onFocus={e => e.target.blur()}
              />
            </div>
            {touched.pickUpTime && errors.pickUpTime ? (
              <div
                style={{
                  marginTop: '6px',
                  marginLeft: '6px',
                }}
              >
                <span style={{ color: 'red' }}>{errors.pickUpTime}</span>
              </div>
            ) : null}
          </div>
        </div>
        {/* <div className="col-lg-3">
          <div className="form-group">
            <label>Passenger(s)</label>
            <div className="frm-new-icon-box-all">
              <img src="/images/dropdown-arrow.png" alt="" />
              <Field
                as="select"
                name="passengers"
                value={values.passengers}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </Field>
            </div>
          </div>
        </div> */}
        <div className="col-lg-4">
          <div className="form-group home-src-dropdown">
            <label>Passenger(s)</label>
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
                  <div className="guest-plus-minus-bx">
                    <h6>Gender</h6>
                    <div className="number">
                      <button
                        type="button"
                        className="minus"
                        style={{ width: '50px', marginRight: '10px' }}
                        onClick={() => setGender('Male')}
                      >
                        Male
                      </button>

                      <button
                        type="button"
                        className="plus"
                        style={{ width: '70px' }}
                        onClick={() => setGender('Female')}
                      >
                        Female
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
        <div className="col-lg-3">
          <div className="form-group">
            <label>Luggage(s)</label>
            <div className="frm-new-icon-box-all">
              <img src="/images/dropdown-arrow.png" alt="" />
              <Field
                as="select"
                name="luggages"
                value={values.luggages}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </Field>
            </div>
          </div>
        </div>
      </div>
      <div className="hotel-ban-form-submit-btn">
        <button className="btn new-submit-btn" type="submit">
          Submit
        </button>
      </div>
      {/* Modal */}
      <div className="modal fade" id="transfer-hourly-mobile-sugg-pro-show-details-modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                ×
              </button>
            </div>
            <div className="modal-body">
              <h4>Important Note</h4>

              <p>
                Please ensure you verify the flight number and pickup date accurately before
                proceeding. Incorrect information may result in the cancellation of your transfer
                booking.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}
    </>
  );
};

export default HourlyForm;
