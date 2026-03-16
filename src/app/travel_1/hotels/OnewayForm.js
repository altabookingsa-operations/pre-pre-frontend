'use client';

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
import { enGB } from 'date-fns/locale/en-GB';
// import moment from 'moment';
import DatePicker, { registerLocale } from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import storageInstance from '../../utils/storageInstance';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import AutoSuggest from 'react-autosuggest';
// import { TRANSFERS_SEARCH_DATA } from '../../utils/constants';
// import axiosInstance from '../../utils/axiosInstance';
import { Field } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';

// const PlaceComponent = dynamic(() => import('../place.component'), {
//   loading: () => <p>Loading...</p>,
//   ssr: false,
// });

registerLocale('gb', enGB);

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

const OnewayForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setPickPlaceId,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  setLocationCode,
  setValue,
  setpickUpDate,
  setDropUpDate,
  setChildAgeList,
  setRoomsNo,
  setChildNo,
  setAdultNo,
  setChildAge,
  setCLocation,
  cLocation,
  value,
  pickUpDate,
  dropUpDate,
  childAgeList,
  roomsNo,
  childNo,
  adultNo,
  childAge,
  setCountryCode,
  setPickUpError,
  pickupError,
  childAgeError,
  setChildAgeError,
  setInputValue,
  inputvalue,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [suggestions, setSuggestions] = useState([]);
  const [locationsuggestion, setLocationSuggestion] = useState([]);
  const [selectedFromStation, setSelectedFromStation] = useState({
    country_code: '',
    full_name: '',
    iata: '',
    id: '',
    type: '',
    uic: '',
  });
  const [popup, setPopup] = useState('');

  // --- HELPER FUNCTIONS MOVED UP ---

  const escapeRegexCharacters = function (str) {
    return str?.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const searchStation = async (value, type) => {
    try {
      const response = await fetch(
        ' https://www.expedia.com/api/v4/typeahead/' +
          value +
          '?browser=Chrome&client=SearchForm&dest=true&device=Desktop&expuserid=-1&features=consistent_display%7Cgoogle&format=json&guid=e2411cb9-fb9d-49d0-becd-309298691c6a&listing=false&lob=HOTELS&locale=en_US&maxresults=8&personalize=true&regiontype=2047&siteid=1&ignorePrefillSearchTermForAlternateDestinationsRequest=undefined&trending=true&popularFilter=true'
      );
      const data = await response.json();
      const data_nw = data.sr;
      setLocationSuggestion(data_nw);
    } catch (error) {
      console.error('Error fetching location data:', error);
    }
  };

  const getSuggestionsF = function (value) {
    if (value === '') {
      return [];
    }
    const escapedValue = escapeRegexCharacters(value?.trim());
    if (escapedValue === '') {
      return [];
    }
    searchStation(escapedValue, 'From');
  };

  // --- END MOVED FUNCTIONS ---

  const currentDate = new Date();
  const initialDate = currentDate.setDate(currentDate.getDate() + 1);
  const startDate = new Date(initialDate);
  const CheckInCurrentDate = new Date(pickUpDate);
  const checkOutInitialDate = CheckInCurrentDate.setDate(CheckInCurrentDate.getDate() + 1);
  const endDate = new Date(checkOutInitialDate);

  /** UPDATE GUEST CODE */
  // Removed problematic `const arrChildAge = [];`

  const rangeChild = (start, end) => {
    if (start === end) return [start];
    return [start, ...rangeChild(start + 1, end)];
  };
  const childAgeRange = rangeChild(1, 14);
  /** UPDATE GUEST CODE */

  const currentYear = new Date().getFullYear();
  const range = (start, end) => {
    return new Array(end - start).fill(null).map((d, i) => i + start);
  };
  const years = range(currentYear, getYear(new Date()) + 30);

  useEffect(() => {
    if (pickUpDate) {
      setDropUpDate(endDate);
    }
  }, [pickUpDate]);

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = function (suggestion) {
    return `${suggestion.full_name} (${suggestion.code})`;
  };

  const renderSuggestion = suggestion => (
    <span>{`${suggestion.full_name} (${suggestion.code})`}</span>
  );

  const shouldRenderSuggestions = value => {
    return value.trim().length > 2;
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    setValue(value);
    const escapedValue = escapeRegexCharacters(value.trim());
    if (escapedValue !== '') {
      const searchValue = { city_input: escapedValue };
      try {
        const responseData = await axiosInstance.post('/car/city-list', searchValue);
        if (responseData.res_code === 200) {
          setSuggestions(responseData.data);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const decrementCount = traveller => {
    if (traveller === 'adult') {
      if (adultNo > 1) setAdultNo(adultNo - 1);
    }

    if (traveller === 'child') {
      if (childNo > 0) {
        const newChildNo = childNo - 1;
        setChildNo(newChildNo);

        const list = [...childAgeList];
        list.splice(-1);
        setChildAgeList(list);

        // FIX: Create new array cleanly without mutating external variable
        const newChildAgeArr = Array.from({ length: newChildNo }, (_, i) => i + 1);
        setChildAge(newChildAgeArr);
      }
    }

    if (traveller === 'rooms') {
      if (roomsNo > 1) {
        setRoomsNo(roomsNo - 1);
      }
    }
  };

  const incrementCount = traveller => {
    if (traveller === 'adult') {
      if (adultNo < 20) setAdultNo(adultNo + 1);
    }

    if (traveller === 'child') {
      if (childNo < 6) {
        const newChildNo = childNo + 1;
        setChildNo(newChildNo);

        // FIX: Create new array cleanly without mutating external variable
        const newChildAgeArr = Array.from({ length: newChildNo }, (_, i) => i + 1);
        setChildAge(newChildAgeArr);

        const list = [...childAgeList];
        list.push('');
        setChildAgeList(list);
      }
    }

    if (traveller === 'rooms') {
      if (roomsNo < 7) {
        setRoomsNo(roomsNo + 1);
      }
    }
  };

  const handleInputChange = (ele, index) => {
    if (ele.target.name !== 'childAgeYear') return;
    const newStateAgeList = [...childAgeList];
    newStateAgeList[index] = ele.target.value;
    setChildAgeList(newStateAgeList);
  };

  const disableButtonHandler = () => {
    let disable = true;
    if (childNo > 0) {
      if (childAgeList.length !== childNo) disable = false;
      else childAgeList.forEach(ele => (ele === '' ? (disable = false) : null));
    }
    return !disable;
  };

  async function locationGetData(value) {
    const searchValue = { city_input: value?.trim() };
    try {
      const responseData = await axiosInstance.post('/car/city-list', searchValue);
      if (responseData.res_code === 200) {
        setLocationCode(responseData?.data[0]?.code);
        setFieldValue('pickUpLocation', responseData?.data[0]?.short_name);
        setFieldValue(
          'pickUpLatLng',
          JSON.stringify({
            Latitude: responseData?.data[0]?.lat,
            Longitude: responseData?.data[0]?.lng,
          })
        );
        setValue(responseData?.data[0]?.short_name);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const queryCheckOut = searchParams.get('checkout_date');
    const queryCheckIn = searchParams.get('checkin_date');
    const queryPickUpName = searchParams.get('pickUpName');
    const queryPickUpLocation = searchParams.get('pickUpLocation');
    const queryLatitude = searchParams.get('Latitude');
    const queryLongitude = searchParams.get('Longitude');
    const queryLocationType = searchParams.get('locationTypePick');
    const queryAdult = searchParams.get('adult');
    const queryChildren = searchParams.get('children');
    const queryRooms = searchParams.get('total_room');

    if (queryCheckOut || queryCheckIn) {
      setTimeout(() => {
        getSuggestionsF(queryPickUpName);
      }, 0);
      setInputValue(queryPickUpLocation || '');

      const startDate = queryCheckIn ? new Date(queryCheckIn) : '';
      setpickUpDate(startDate);
      setFieldValue('pickUpDate', queryCheckIn ? startDate : '');

      const endDate = queryCheckOut ? new Date(queryCheckOut) : '';
      setDropUpDate(endDate);
      setFieldValue('dropUpDate', endDate);

      setFieldValue('pickUpLocation', queryPickUpLocation || '');
      setFieldValue('pickUpName', queryPickUpName || '');
      setFieldValue('pickUpLatLng', {
        Latitude: queryLatitude,
        Longitude: queryLongitude,
      });
      setFieldValue('locationTypePick', queryLocationType);

      if (queryAdult) setAdultNo(queryAdult);
      if (queryChildren) setChildNo(queryChildren);
      if (queryRooms) setRoomsNo(queryRooms);
    }
  }, [searchParams, setFieldValue]);

  const onSuggestionsFetchRequestedF = ({ value }) => {
    setInputValue(value);
    getSuggestionsF(value);
  };

  function shouldRenderSuggestionsF(value) {
    return value.trim().length > 2;
  }

  const renderSuggestionF = suggestion => {
    return (
      <span id={`${suggestion.gaiaId}`}>
        {suggestion?.type === 'HOTEL' ? (
          <img src="/images/itinerary-icon3.png" alt="" />
        ) : suggestion?.type === 'METROCODE' ? (
          <img src="/images/dash-book-icon6.png" alt="" />
        ) : suggestion?.type === 'MULTICITY' ? (
          <img src="/images/location-icon-white.png" alt="" />
        ) : suggestion?.type === 'AIRPORT' ? (
          <img src="/images/itinerary-icon2.png" alt="" />
        ) : suggestion?.type === 'NEIGHBORHOOD' ? (
          <img src="/images/location-icon-white.png" alt="" />
        ) : suggestion?.type === 'POI' ? (
          <img src="/images/location-icon-white.png" alt="" />
        ) : suggestion?.type === 'CITY' ? (
          <img src="/images/location-icon-white.png" alt="" />
        ) : suggestion?.type === 'TRAINSTATION' ? (
          <img src="/images/dash-book-icon6.png" alt="" />
        ) : suggestion?.type === 'MULTIREGION' ? (
          <img src="/images/location-icon-white.png" alt="" />
        ) : (
          ''
        )}
        {`${suggestion.regionNames.primaryDisplayName}, ${suggestion.regionNames.secondaryDisplayName}` ||
          ''}
      </span>
    );
  };

  const onSuggestionsClearRequestedF = () => {
    setLocationSuggestion([]);
  };

  const getSuggestionValueF = function (stations) {
    return `${stations?.regionNames?.displayName}`;
  };

  function renderSectionTitleF(stations) {
    return <span>{`${stations.airport_name}`}</span>;
  }
  function getSectionSuggestionsF(stations) {
    return stations ? stations.location : [];
  }

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <div className="form-group">
            <label>Location</label>
            <div className="frm-new-icon-box-all">
              <img src="/images/map.png" alt="" />
              <AutoSuggest
                suggestions={locationsuggestion}
                onSuggestionsClearRequested={onSuggestionsClearRequestedF}
                onSuggestionsFetchRequested={onSuggestionsFetchRequestedF}
                getSuggestionValue={getSuggestionValueF}
                renderSuggestion={renderSuggestionF}
                onSuggestionSelected={(e, data) => {
                  setFieldValue('pickUpLocation', data?.suggestion?.regionNames?.displayName);
                  setFieldValue('hotelName', data?.suggestion?.regionNames?.shortName);
                  setFieldValue(
                    'pickUpName',
                    data?.suggestion?.hierarchyInfo?.airport?.airportCode
                  );
                  setFieldValue('pickUpLatLng', {
                    Latitude: data?.suggestion?.coordinates?.lat,
                    Longitude: data?.suggestion?.coordinates?.long,
                  });
                  setFieldValue('locationTypePick', data?.suggestion?.type);
                  setCountryCode(data?.suggestion?.hierarchyInfo?.country?.isoCode3);
                }}
                shouldRenderSuggestions={shouldRenderSuggestionsF}
                renderSectionTitle={renderSectionTitleF}
                getSectionSuggestions={getSectionSuggestionsF}
                inputProps={{
                  placeholder: 'Location',
                  value: typeof inputvalue === 'string' ? inputvalue : '',
                  id: 'location',
                  onChange: (e, { newValue }) => {
                    setInputValue(newValue);
                    if (!e?.target?.value?.length) {
                      setFieldValue('pickUpLocation', '');
                    } else {
                      setFieldValue('pickUpLocation', 'error');
                    }
                    setPickUpError(false);
                  },
                  onBlur: e => {
                    handleBlur(e);
                  },
                  name: 'location',
                  className: `form-control react-autosuggest__input`,
                }}
                highlightFirstSuggestion={true}
              />
            </div>
            {inputvalue?.length === 0 || !inputvalue ? (
              touched.pickUpLocation && errors.pickUpLocation ? (
                <div style={{ marginTop: '6px' }}>
                  <span style={{ color: 'red' }}>{errors.pickUpLocation}</span>
                </div>
              ) : null
            ) : pickupError ? (
              <div style={{ marginTop: '6px' }}>
                <span style={{ color: 'red' }}>Select Location from the list</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Date Picker and Guest Section */}
      <div className="row">
        <div className="col-lg-4">
          <div className="form-group">
            <label>Check-In</label>
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
                id="pickUpDate"
                name="pickUpDate"
                placeholderText="Check-In date"
                selected={pickUpDate}
                onChange={date => {
                  setpickUpDate(date);
                  setFieldValue('pickUpDate', date);
                  setFieldValue('dropUpDate', endDate);
                }}
                locale="gb"
                minDate={startDate}
                startDate={startDate}
                showDisabledMonthNavigation
                dateFormat="EEE d MMM yyyy"
                onKeyDown={e => {
                  e.preventDefault();
                }}
                onFocus={e => e.target.blur()}
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
            <label>Check-Out</label>
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
                id="dropUpDate"
                name="dropUpDate"
                selected={dropUpDate}
                onChange={date => {
                  setDropUpDate(date);
                  setFieldValue('dropUpDate', date);
                }}
                locale="gb"
                minDate={endDate}
                startDate={endDate}
                showDisabledMonthNavigation
                dateFormat="EEE d MMM yyyy"
                placeholderText="Check-Out date"
                onKeyDown={e => {
                  e.preventDefault();
                }}
                onFocus={e => e.target.blur()}
              />
            </div>
            {touched.dropUpDate && errors.dropUpDate ? (
              <div style={{ marginTop: '6px' }}>
                <span style={{ color: 'red' }}>{errors.dropUpDate}</span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="form-group home-src-dropdown">
            <label>Guest(s)</label>
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
                      <span>{roomsNo} Room</span>
                    </p>
                  </div>
                </button>
              </div>
              {popup === 'guestPopup' && (
                <div className="travelerDetailsPopup-new">
                  <h5>Guests</h5>
                  <div className="guest-plus-minus-bx">
                    <h6>Adults</h6>
                    <div className="number">
                      <button
                        type="button"
                        className="minus"
                        disabled={adultNo <= 1}
                        onClick={() => decrementCount('adult')}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={adultNo}
                        disabled
                        onChange={event => setAdultNo(parseInt(event.target.value))}
                      />
                      <button
                        type="button"
                        className="plus"
                        disabled={adultNo >= 20}
                        onClick={() => incrementCount('adult')}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="guest-plus-minus-bx">
                    <h6>Children (1-14 yrs.) </h6>
                    <div className="number">
                      <button
                        type="button"
                        className="minus"
                        disabled={childNo <= 0}
                        onClick={() => {
                          decrementCount('child');
                          setChildAgeError(false);
                        }}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={childNo}
                        disabled
                        onChange={event => setChildNo(event.target.value)}
                      />
                      <button
                        type="button"
                        className="plus"
                        disabled={childNo >= 6}
                        onClick={() => {
                          incrementCount('child');
                          setChildAgeError(false);
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {childAge?.length > 0 && (
                    <div className="row">
                      {childAge.map((ele, i) => (
                        <div className="col-lg-6" key={i}>
                          <div className="form-group">
                            <label>Child {ele} age</label>
                            <Field
                              as="select"
                              name="childAgeYear"
                              onBlur={handleBlur}
                              className="form-control"
                              value={childAgeList[i]}
                              onChange={e => {
                                handleInputChange(e, i);
                                setChildAgeError(false);
                                disableButtonHandler();
                              }}
                            >
                              <option value="" aria-selected="false">
                                Child {ele} age
                              </option>
                              {childAgeRange?.map(item => (
                                <option key={item} value={item}>
                                  {item}
                                </option>
                              ))}
                            </Field>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {childAgeError ? (
                    <div style={{ marginTop: '6px' }}>
                      <span style={{ color: 'red' }}>Please Enter Child Age</span>
                    </div>
                  ) : null}

                  <div className="guest-plus-minus-bx">
                    <h6>Rooms</h6>
                    <div className="number">
                      <button
                        type="button"
                        className="minus"
                        disabled={roomsNo <= 1}
                        onClick={() => decrementCount('rooms')}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={roomsNo}
                        disabled
                        onChange={event => setRoomsNo(parseInt(event.target.value))}
                      />
                      <button
                        type="button"
                        className="plus"
                        disabled={roomsNo >= 7}
                        onClick={() => incrementCount('rooms')}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="guest-select-done-btn">
                    <button
                      type="button"
                      className="btn done-btn"
                      disabled={disableButtonHandler()}
                      onClick={() => setPopup('')}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
              {touched.childDateOfBirth && errors.childDateOfBirth ? (
                <span style={{ color: 'red' }}>{errors.childDateOfBirth}</span>
              ) : null}
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
