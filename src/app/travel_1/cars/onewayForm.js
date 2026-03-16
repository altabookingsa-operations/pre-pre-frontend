import { Field } from 'formik';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import gb from 'date-fns/locale/en-GB';
import moment from 'moment';
import DatePicker, { registerLocale } from 'react-datepicker';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import axiosInstance from '@/utils/axiosInstance';
import AutoSuggest from 'react-autosuggest';

import { endOfDay, startOfDay } from 'date-fns/fp';
import { Context } from '@/context/index';
import { useContext } from 'react';
import axiosFrontNodeInstance from '@/utils/axiosFrontNodeInstance';
registerLocale('gb', gb);

const data = [
  {
    id: '4347972',
    code: 'DXB',
    full_name: 'Dubai (DXB - Dubai Intl.)',
    short_name: 'Dubai (DXB-Dubai Intl.)',
    coordinates: {
      Latitude: '25.249077',
      Longitude: '55.352795',
    },
    type: 'AIRPORT',
  },
  {
    id: '4412749',
    code: 'MUC',
    full_name: 'Munich (MUC - Franz Josef Strauss Intl.)',
    short_name: 'Munich (MUC-Franz Josef Strauss Intl.)',
    coordinates: {
      Latitude: '48.353935',
      Longitude: '11.788956',
    },
    type: 'AIRPORT',
  },
  {
    id: '5392460',
    code: 'LHR',
    full_name: 'London (LHR - Heathrow)',
    short_name: 'London (LHR-Heathrow)',
    coordinates: {
      Latitude: '51.470878',
      Longitude: '-0.449753',
    },
    type: 'AIRPORT',
  },
  {
    id: '6029611',
    code: 'LGB',
    full_name: 'Long Beach (LGB - Long Beach Municipal)',
    short_name: 'Long Beach, CA (LGB-Long Beach Municipal)',
    coordinates: {
      Latitude: '33.81841',
      Longitude: '-118.14437',
    },
    type: 'AIRPORT',
  },
  {
    id: '4281927',
    code: 'GVA',
    full_name: 'Geneva (GVA - Cointrin Intl.)',
    short_name: 'Geneva (GVA-Cointrin Intl.)',
    coordinates: {
      Latitude: '46.230799',
      Longitude: '6.108175',
    },
    type: 'AIRPORT',
  },
  {
    id: '4474186',
    code: 'JED',
    full_name: 'Jeddah (JED - King Abdulaziz Intl.)',
    short_name: 'Jeddah (JED-King Abdulaziz Intl.)',
    coordinates: {
      Latitude: '21.661133',
      Longitude: '39.173468',
    },
    type: 'AIRPORT',
  },
];
const pickUpLocationTypeData = [
  {
    value: 'Terminal',
    name: 'Terminal',
  },
  {
    value: 'ShuttleOnAirport',
    name: 'Shuttle On Airport',
  },
  {
    value: 'ShuttleOffAirport',
    name: 'Shuttle Off Airport',
  },
  {
    value: 'RailwayStation',
    name: 'Railway Station',
  },
  {
    value: 'Hotel',
    name: 'Hotel',
  },
  {
    value: 'CarDealer',
    name: 'Car Dealer',
  },
  {
    value: 'CityCenterDowntown',
    name: 'City Center Downtown',
  },
  {
    value: 'EastOfCityCenter',
    name: 'East Of City Center',
  },
  {
    value: 'SouthOfCityCenter',
    name: 'South Of City Center',
  },
  {
    value: 'WestOfCityCenter',
    name: 'West Of City Center',
  },
  {
    value: 'NorthOfCityCenter',
    name: 'North Of City Center',
  },
  {
    value: 'PortOrFerry',
    name: 'Port Or Ferry',
  },
  {
    value: 'NearResort',
    name: 'Near Resort',
  },
  {
    value: 'Airport',
    name: 'Airport',
  },
  {
    value: 'Unknown',
    name: 'Unknown',
  },
];
const OnewayForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting,
  setFieldValue,
  setValue,
  setValueDrop,
  value,
  valueDrop,
  picupLocation,
  setPicupLocation,
  dropOffLocation,
  setDropOffLocation,
  pickUpDate,
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
  pickupError,
  setPickUpError,
  setDropUpError,
  dropupError,
  setQueryPickUpTime,
  setQuerDropOffTime,
}) => {
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
  //   const [value, setValue] = useState("");
  //   const [valueDrop, setValueDrop] = useState("");
  const [carTypeLists, setCarTypeLists] = useState([]);
  const [carCompayLists, setCarCompayLists] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionsDrop, setSuggestionsDrop] = useState([]);
  //   const [picupLocation, setPicupLocation] = useState({
  //     id: "",
  //     code: "",
  //     full_name: "",
  //     short_name: "",
  //     coordinates: {},
  //   });
  //   const [dropOffLocation, setDropOffLocation] = useState({
  //     id: "",
  //     code: "",
  //     full_name: "",
  //     short_name: "",
  //     coordinates: {},
  //   });
  const [nearestLocationList, setNearestLocationList] = useState([]);
  const { state, dispatch } = useContext(Context);

  let handleColor = time => {
    return 'time-stripes';
  };
  const searchParams = useSearchParams();

  const escapeRegexCharacters = function (str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };
  const getVehicleClass = async () => {
    const responseData = await axiosFrontNodeInstance.get('/car/vehicle-type-list');
    if (responseData.res_code === 200) {
      setCarTypeLists(responseData.data.vehicle_class);
      setCarCompayLists(responseData.data.rental_company);
    }
  };
  const searchCity = async value => {
    const response = await fetch(
      'https://www.expedia.com/api/v4/typeahead/' +
        value +
        '?client=Homepage&dest=true&expuserid=-1&features=postal_code|consistent_display|cars_rental|carsclickpopularity|google&lob=CARS&locale=en_US&maxresults=8&regiontype=1583&guid=bffdb692-8c87-4ad3-b254-90bf4238bb22&siteid=1&ab=42716.0&personalize=true'
    );
    const data = await response.json();
    const data_nw = data.sr;
    return setSuggestions(data_nw);
  };

  const searchCityDrop = async value => {
    const response = await fetch(
      'https://www.expedia.com/api/v4/typeahead/' +
        value +
        '?client=Homepage&dest=true&expuserid=-1&features=postal_code|consistent_display|cars_rental|carsclickpopularity|google&lob=CARS&locale=en_US&maxresults=8&regiontype=1583&guid=bffdb692-8c87-4ad3-b254-90bf4238bb22&siteid=1&ab=42716.0&personalize=true'
    );

    const data = await response.json();
    const data_nw = data.sr;
    return setSuggestionsDrop(data_nw);
  };

  const getSuggestions = function (value) {
    if (value === '') {
      return [];
    }
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue.length > 2) {
      return searchCity(escapedValue);
    } else {
      return [];
    }
  };

  const getSuggestionsDrop = function (value) {
    if (value === '') {
      return [];
    }
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue.length > 2) {
      return searchCityDrop(escapedValue);
    } else {
      return [];
    }
  };

  const getSuggestionValue = function (suggestion) {
    const localSuggestionData = {
      id: suggestion.gaiaId,
      code: suggestion.hierarchyInfo.airport.airportCode,
      full_name: suggestion.regionNames.primaryDisplayName,
      short_name: suggestion.regionNames.shortName,
      secondaryDisplayName: suggestion.regionNames.secondaryDisplayName,
      coordinates: {
        Latitude: suggestion?.coordinates?.lat,
        Longitude: suggestion?.coordinates?.long,
      },
      type: suggestion?.type,
      country_code: suggestion?.hierarchyInfo?.country?.isoCode2,
    };

    setPicupLocation(localSuggestionData);
    return `${suggestion.regionNames.primaryDisplayName}, ${suggestion.regionNames.secondaryDisplayName}`;
  };

  const getSuggestionValueDrop = function (suggestion) {
    const localSuggestionData = {
      id: suggestion.gaiaId,
      code: suggestion.hierarchyInfo.airport.airportCode,
      full_name: suggestion.regionNames.primaryDisplayName,
      short_name: suggestion.regionNames.shortName,
      secondaryDisplayName: suggestion.regionNames.secondaryDisplayName,
      coordinates: {
        Latitude: suggestion?.coordinates?.lat,
        Longitude: suggestion?.coordinates?.long,
      },
    };
    //console.log(localSuggestionData)
    setDropOffLocation(localSuggestionData);
    return `${suggestion.regionNames.primaryDisplayName}, ${suggestion.regionNames.secondaryDisplayName}`;
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setValue(value);
    getSuggestions(value);
  };

  const onSuggestionsFetchRequestedDrop = ({ value }) => {
    setValueDrop(value);
    getSuggestionsDrop(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionsClearRequestedDrop = () => {
    setSuggestionsDrop([]);
  };

  const renderSuggestion = suggestion => (
    <span
      id={`${suggestion.id}`}
    >{`${suggestion.regionNames.primaryDisplayName}, ${suggestion.regionNames.secondaryDisplayName}`}</span>
  );

  const renderSuggestionDrop = suggestion => (
    <span
      id={`${suggestion.id}`}
    >{`${suggestion.regionNames.primaryDisplayName}, ${suggestion.regionNames.secondaryDisplayName}`}</span>
  );

  useEffect(() => {
    setTimeout(() => {
      getVehicleClass();
    }, 0);
  }, []);

  const getNearestLocation = async val => {
    if (pickUpDate && picupLocation?.code && picupLocation?.full_name && val) {
      const responseData = await axiosInstance.post('car/nearest-vehicle-location-by-vendor', {
        vendor_code: val,
        pickup_date: moment(pickUpDate).format('yyyy-MM-DD'),
        pick_location: picupLocation?.code,
        pick_location_details: picupLocation?.full_name,
      });
      if (responseData?.res_code === 200) {
        setNearestLocationList(responseData.data);
      } else {
        setNearestLocationList([]);
      }
    }
  };
  const getTimeAtCustomTimeString = (timeStr, dateStr) => {
    const now = new Date(dateStr);

    // Split the timeStr into hours and minutes
    const [hours, minutes] = timeStr.split(':').map(num => parseInt(num, 10));

    // Set the time to the provided hour and minute
    now.setHours(hours, minutes, 0, 0);

    // Return the formatted date in GMT format
    return now.toString();
  };
  useEffect(() => {
    if (
      searchParams.get('pickUpLocation') ||
      searchParams.get('pickUpLatLng') ||
      searchParams.get('pickUpCode') ||
      searchParams.get('pickUpCountryCode') ||
      searchParams.get('dropOffLocation') ||
      searchParams.get('dropOffLatLng') ||
      searchParams.get('dropOffCode') ||
      searchParams.get('dropOffCountryCode') ||
      searchParams.get('pickUpDate') ||
      searchParams.get('pickUpTime') ||
      searchParams.get('dropOffDate') ||
      searchParams.get('dropOffTime') ||
      searchParams.get('carType') ||
      searchParams.get('carRentalCompany')
    ) {
      if (
        searchParams.get('pickUpLocation') === 'undefined' ||
        searchParams.get('pickUpLocation') === ''
      ) {
        setFieldValue('pickUpLocation', '');
        setValue('');
      } else {
        setFieldValue('pickUpLocation', searchParams.get('pickUpLocation'));
        setValue(searchParams.get('pickUpLocation'));
      }
      if (
        searchParams.get('dropOffLocation') === 'undefined' ||
        searchParams.get('dropOffLocation') === ''
      ) {
        setFieldValue('dropOffLocation', '');
        setValueDrop('');
      } else {
        setFieldValue('dropOffLocation', searchParams.get('dropOffLocation'));
        setValueDrop(searchParams.get('dropOffLocation'));
      }
      if (searchParams.get('pickUpTime')) {
        setQueryPickUpTime(
          getTimeAtCustomTimeString(searchParams.get('pickUpTime'), searchParams.get('pickUpDate'))
        );
        setFieldValue('pickUpTime', searchParams.get('pickUpTime'));
      }
      if (searchParams.get('pickUpDate')) {
        setFieldValue(
          'pickUpDate',
          moment(searchParams.get('pickUpDate')).format('ddd DD MMM YYYY')
        );
      }
      if (searchParams.get('dropOffDate')) {
        setFieldValue(
          'dropOffDate',
          moment(searchParams.get('dropOffDate')).format('ddd DD MMM YYYY')
        );
      }
      if (searchParams.get('dropOffTime')) {
        setQuerDropOffTime(
          getTimeAtCustomTimeString(
            searchParams.get('dropOffTime'),
            searchParams.get('dropOffDate')
          )
        );
        setFieldValue('dropOffTime', searchParams.get('dropOffTime'));
      }
      if (searchParams.get('carType')) {
        setFieldValue(
          'carType',
          searchParams.get('carType').charAt(0).toUpperCase() +
            searchParams.get('carType').slice(1).toLowerCase()
        );
      }
      if (searchParams.get('carRentalCompany')) {
        setFieldValue('carRentalCompany', searchParams.get('carRentalCompany'));
      }
    }
  }, [searchParams, setFieldValue, setQuerDropOffTime, setQueryPickUpTime, setValue, setValueDrop]);

  return (
    <>
      <div className="row">
        <div className="col-lg-3">
          <div className="form-group">
            <label>Pick-Up Location</label>
            <div className="frm-new-icon-box-all">
              <img src="/images/map.png" alt="" />
              <AutoSuggest
                id="pickupLocationSuggest"
                suggestions={suggestions}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                onSuggestionSelected={(e, { suggestionValue }) => {
                  setFieldValue('pickUpLocation', suggestionValue);
                  setValue(suggestionValue);
                }}
                inputProps={{
                  placeholder: 'City, Airport, Address',
                  value: value,
                  id: 'pickUpLocation',
                  //  onKeyDown: (e)=>{
                  //   if(!/[0-9a-zA-Z() ]/.test(e.key)){
                  //     e.preventDefault();
                  //    }
                  //  },
                  onChange: (e, { newValue }) => {
                    setValue(newValue);
                    // handleChange(e);
                    setFieldValue('pickUpLocation', 'error');
                    setPickUpError(false);
                  },
                  onBlur: e => {
                    //  handleBlur(e);
                  },
                  name: 'pickUpLocation',
                  className: `form-control react-autosuggest__input`,
                }}
                highlightFirstSuggestion={true}
              />
            </div>
            {value?.length == 0 ? (
              touched.pickUpLocation && errors.pickUpLocation ? (
                <div
                  style={{
                    marginTop: '6px',
                  }}
                >
                  <span style={{ color: 'red' }}>{errors.pickUpLocation}</span>
                </div>
              ) : null
            ) : pickupError ? (
              <div
                style={{
                  marginTop: '6px',
                }}
              >
                <span style={{ color: 'red' }}>Select Location from the list</span>
              </div>
            ) : null}
          </div>
        </div>

        <div className="col-lg-3">
          <div className="form-group">
            <label>Drop-Off Location</label>
            <div className="frm-new-icon-box-all">
              <img src="/images/map.png" alt="" />
              <AutoSuggest
                id="dropOffLocationSuggest"
                suggestions={suggestionsDrop}
                onSuggestionsClearRequested={onSuggestionsClearRequestedDrop}
                onSuggestionsFetchRequested={onSuggestionsFetchRequestedDrop}
                getSuggestionValue={getSuggestionValueDrop}
                renderSuggestion={renderSuggestionDrop}
                onSuggestionSelected={(e, { suggestionValue }) => {
                  setFieldValue('dropOffLocation', suggestionValue);
                  setValueDrop(suggestionValue);
                }}
                inputProps={{
                  placeholder: 'City, Airport, Address',
                  value: valueDrop,
                  id: 'dropOffLocation',
                  onChange: (e, { newValue }) => {
                    setValueDrop(newValue);
                    // handleChange(e);
                    setFieldValue('dropOffLocation', 'error');
                    setDropUpError(false);
                  },
                  onBlur: e => {
                    //  handleBlur(e);
                  },
                  name: 'dropOffLocation',
                  className: `form-control react-autosuggest__input`,
                }}
                highlightFirstSuggestion={true}
              />
            </div>
            {valueDrop?.length == 0 ? (
              touched.dropOffLocation && errors.dropOffLocation ? (
                <div
                  style={{
                    marginTop: '6px',
                  }}
                >
                  <span style={{ color: 'red' }}>{errors.dropOffLocation}</span>
                </div>
              ) : null
            ) : dropupError ? (
              <div
                style={{
                  marginTop: '6px',
                }}
              >
                <span style={{ color: 'red' }}>Select Location from the list</span>
              </div>
            ) : null}
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group">
            <label>Pick-Up Date</label>
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
                id="pickUpDate"
                name="pickUpDate"
                selected={pickUpDate}
                onChange={date => {
                  setpickUpDate(date);
                  filterPassedTime(date);
                  dropDtSetPicDt(date);
                  setpickUpTime(date);
                  setFieldValue('pickUpDate', date);
                  handleChange;
                }}
                onFocus={e => e.target.blur()}
                // onBlur={handleBlur}
                locale="gb"
                minDate={new Date()}
                startDate={startDate}
                showDisabledMonthNavigation
                dateFormat="EEE d MMM yyyy"
                value={values.pickUpDate}
                placeholderText="Pick-Up date"
                onKeyDown={e => {
                  e.preventDefault();
                }}
              />
            </div>
            {touched.pickUpDate && errors.pickUpDate ? (
              <div
                style={{
                  marginTop: '6px',
                }}
              >
                <span style={{ color: 'red' }}>{errors.pickUpDate}</span>
              </div>
            ) : null}
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group timeOnly">
            <label>Pick-Up Time</label>
            <div className="frm-new-icon-box-all mobile_pikup">
              <img src="/images/time.png" alt="" />
              <DatePicker
                calendarStartDay={1}
                selected={pickUpTime}
                //onFocus={(e) => e.target.blur()}
                onChange={time => {
                  setpickUpTime(time);
                  if (time) {
                    setDropTime(
                      setHours(setMinutes(time, time?.getMinutes()), time?.getHours() + 2)
                    );

                    setDropDate(
                      setHours(setMinutes(time, time?.getMinutes()), time?.getHours() + 2)
                    );
                  }

                  setFieldValue('pickUpTime', time);
                  handleChange;
                }}
                showTimeSelect
                showTimeSelectOnly
                filterTime={filterPassedTime}
                // onBlur={handleBlur}
                timeIntervals={5}
                timeCaption="Select Pick-Up Time"
                dateFormat="HH:mm"
                timeFormat="HH:mm"
                placeholderText="Pick-Up Time"
                id="pickUpTime"
                name="pickUpTime"
                value={values.pickUpTime}
                className={`form-control`}
                calendarClassName="rastaStripesTime"
                timeClassName={handleColor}
                onFocus={e => e.target.blur()}
                onKeyDown={e => {
                  e.preventDefault();
                }}
              />
            </div>
            {touched.pickUpTime && errors.pickUpTime ? (
              <div
                style={{
                  marginTop: '6px',
                }}
              >
                <span style={{ color: 'red' }}>{errors.pickUpTime}</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3">
          <div className="form-group">
            <label>Drop-Off Date</label>
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
                name="dropOffDate"
                selected={dropDate}
                onChange={date => {
                  setDropDate(date);
                  if (date) {
                    setDropTime(setHours(setMinutes(date, date?.getMinutes()), date?.getHours()));
                  }

                  setFieldValue('dropOffDate', date);
                  handleChange;
                }}
                // onBlur={handleBlur}
                locale="gb"
                minDate={setHours(
                  setMinutes(pickUpTime, pickUpTime?.getMinutes()),
                  pickUpTime?.getHours() + 2
                )}
                startDate={pickUpDate}
                showDisabledMonthNavigation
                dateFormat="EEE d MMM yyyy"
                value={values?.dropOffDate}
                placeholderText="Drop-Off date"
                onFocus={e => e.target.blur()}
                onKeyDown={e => {
                  e.preventDefault();
                }}
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
        <div className="col-lg-3">
          <div className="form-group timeOnly">
            <label>Drop-Off Time</label>
            <div className="frm-new-icon-box-all mobile_pikup">
              <img src="/images/time.png" alt="" />
              <DatePicker
                calendarStartDay={1}
                // onFocus={(e) => e.target.blur()}
                selected={dropTime}
                onChange={time => {
                  setDropTime(time);
                  setFieldValue('dropOffTime', time);
                  handleChange;
                }}
                // onBlur={handleBlur}
                filterTime={filterPassedTime}
                minTime={minTime}
                maxTime={setHours(setMinutes(dropDate, 55), endOfDay(dropDate).getHours())}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={5}
                timeCaption="Select Drop-Off Time"
                dateFormat="HH:mm"
                timeFormat="HH:mm"
                id="dropOffTime"
                name="dropOffTime"
                value={values?.dropOffTime}
                className="form-control"
                calendarClassName="rastaStripesTime"
                timeClassName={handleColor}
                placeholderText="Drop-Off time"
                onFocus={e => e.target.blur()}
                onKeyDown={e => {
                  e.preventDefault();
                }}
              />
            </div>
            {touched.dropOffTime && errors.dropOffTime ? (
              <div
                style={{
                  marginTop: '6px',
                }}
              >
                <span style={{ color: 'red' }}>{errors.dropOffTime}</span>
              </div>
            ) : null}
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group">
            <label>Car Type</label>
            <div className="frm-new-icon-box-all">
              <img src="/images/dropdown-arrow.png" alt="" />
              <Field
                as="select"
                name="carType"
                value={values.carType}
                onChange={handleChange}
                // onBlur={handleBlur}
                className="form-control"
              >
                <option value="">No Preference</option>
                {carTypeLists.map(i => (
                  <option key={`carType-${i._id}`} value={`${i.class}`}>
                    {i.class}
                    {/* ?.replace(/([a-z])([A-Z])/g, '$1 $2')} */}
                  </option>
                ))}
              </Field>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="form-group">
            <label>Car Rental Company</label>
            <div className="frm-new-icon-box-all">
              <img src="/images/dropdown-arrow.png" alt="" />
              <Field
                as="select"
                name="carRentalCompany"
                value={values.carRentalCompany}
                onChange={e => {
                  setFieldValue('carRentalCompany', e.target.value);
                  // getNearestLocation(e.target.value);
                }}
                onBlur={e => {
                  setFieldValue('carRentalCompany', e.target.value);
                }}
                className="form-control"
              >
                <option value="">No Preference</option>
                {carCompayLists.map(i => (
                  <option key={`carCompay-${i._id}`} value={`${i.code}`}>
                    {i.name}
                  </option>
                ))}
              </Field>
            </div>
          </div>
        </div>{' '}
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
