'use client';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import gb from 'date-fns/locale/en-GB';
import { registerLocale } from 'react-datepicker';
import storageInstance from '../../../utils/storageInstance';
import { TRANSFERS_SEARCH_DATA } from '../../../utils/constants';
import moment from 'moment';
import OnewayForm from './onewayForm.js';
import cookieInstance from '../../../utils/cookieInstance';
registerLocale('gb', gb);

const OneWay = () => {
  const [cLocation, setCLocation] = useState('');
  const [pickPlaceId, setPickPlaceId] = useState('');
  const [dLocation, setDLocation] = useState('');
  const [dropPlaceId, setDropPlaceId] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const geoApiKey = process.env.NEXT_PUBLIC_REACT_APP_GOOGLE;
  const currentDate = new Date();
  const initialDate = currentDate.setDate(currentDate.getDate() + 1);
  const startDate = new Date(initialDate);
  const [pickUpDate, setpickUpDate] = useState('');
  const [pickUpTime, setpickUpTime] = useState('');
  const [popup, setPopup] = useState('');
  const [pickoptionClicked, setPickOptionClicked] = useState(false);
  const [dropoptionClicked, setDropOptionClicked] = useState(false);
  const [adultNo, setAdultNo] = useState(1);
  const [childNo, setChildNo] = useState(0);
  const [infantNo, setInfantNo] = useState(0);
  const [gender, setGender] = useState('Male');
  const router = useRouter();
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : '');

  function handleWindowSizeChange() {
    setWidth(typeof window !== 'undefined' ? window.innerWidth : '');
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);

  const reverseLocation = () => {
    setCLocation(dLocation);
    setDLocation(cLocation);
    setPickPlaceId(dropPlaceId);
    setDropPlaceId(pickPlaceId);
    const pickUpLocation = $('#pickUpLocation').val();
    const dropOffLocation = $('#dropLocation').val();
    $('#pickUpLocation').val(dropOffLocation);
    $('#dropLocation').val(pickUpLocation);
  };

  function extractTerminalAndAirport(text) {
    const terminalRegex = /\bTerminals?\b/i; // Matches "Terminal" or "Terminals"
    const airportRegex = /\bAirport\b/i; // Matches any word followed by "Airport"

    const terminalMatch = text?.match(terminalRegex);
    const airportMatch = text?.match(airportRegex);

    return [terminalMatch ? terminalMatch[0] : '', airportMatch ? airportMatch[0] : ''];
  }

  return (
    <Formik
      enableReinitialize={false}
      initialValues={{
        pickUpLocation: `${cLocation}`,
        dropLocation: `${dLocation}`,
        pickUpName: '',
        dropOffName: '',
        pickUpDate: '',
        pickUpTime: '',
        passengers: 1,
        luggages: 1,
        pickUpLatLng: {},
        dropOffLatLng: {},
        locationTypePick: '',
        locationTypeDrop: '',
        flight_no: '',
        name: '',
        airline_name: '',
      }}
      validationSchema={Yup.object({
        pickUpLocation: Yup.string()
          //  .trim()
          .required('Pick-Up Location is required'),
        dropLocation: Yup.string()
          // .trim()
          .required('Drop-Off Location is required'),
        pickUpDate: Yup.string().nullable().required('Pick-Up Date is required'),
        pickUpTime: Yup.string().nullable().required('Pick-Up Time is required'),
      })}
      onSubmit={async (values, { resetForm, setSubmitting }) => {
        if (cLocation?.length && !pickPlaceId?.length) {
          setPickOptionClicked(true);
          return;
        }
        if (dLocation?.length && !dropPlaceId?.length) {
          setDropOptionClicked(true);
          return;
        }
        if (pickPlaceId?.length && dropPlaceId?.length) {
          const outPutVal = {
            pickUpLocation: cLocation,
            pickUpPlaceId: pickPlaceId,
            countryCode: countryCode,
            pickUpName: cLocation,
            dropOffName: dLocation,
            dropLocation: dLocation,
            dropPlaceId: dropPlaceId,
            pickUpDate: pickUpDate.toString(),
            pickUpDateServer: moment(pickUpDate.toString()).format('YYYY-MM-DD'),
            pickUpTime: moment(pickUpDate.toString())
              .utcOffset(pickUpDate.toString())
              .format('HH:mm'),
            luggages: values.luggages,
            pickUpLatLng: JSON.stringify(values?.pickUpLatLng),
            dropOffLatLng: JSON.stringify(values?.dropOffLatLng),
            searchType: 'oneWay',
            locationTypePick:
              extractTerminalAndAirport(cLocation?.toLocaleLowerCase())[0] === 'terminal' ||
              extractTerminalAndAirport(cLocation?.toLocaleLowerCase())[0] === 'airport'
                ? extractTerminalAndAirport(cLocation?.toLocaleUpperCase())[0]
                : values?.locationTypePick?.toUpperCase(),
            locationTypeDrop:
              extractTerminalAndAirport(dLocation?.toLocaleLowerCase())[0] === 'terminal' ||
              extractTerminalAndAirport(dLocation?.toLocaleLowerCase())[0] === 'airport'
                ? extractTerminalAndAirport(dLocation?.toLocaleUpperCase())[0]
                : values?.locationTypeDrop?.toUpperCase(),
            flight_no: values?.flight_no,
            type: values?.type,
            adult: Number(adultNo),
            children: Number(childNo),
            infants: Number(infantNo),
            perPage: width >= 1200 ? 10 : 10,
            aiport_name: values?.name,
            gender: gender,
            airline_name: values?.airline_name,
            lat: values?.pickUpLatLng?.Latitude,
            lng: values?.pickUpLatLng?.Longitude,
            dLAT: values?.dropOffLatLng?.Latitude,
            dLNG: values?.dropOffLatLng?.Longitude,
          };

          // Store cache key in cookie
          cookieInstance?.setStorageObj(
            'TRANSFER_CACHE_KEY',
            'ABTRASHOURCACHE' + Math.floor(100000 + Math.random() * 900000).toString()
          );

          // Store search data in local storage
          storageInstance?.setStorageObj(TRANSFERS_SEARCH_DATA, outPutVal);

          // Build query string for navigation
          const queryParams = new URLSearchParams();
          Object.keys(outPutVal).forEach(key => {
            if (outPutVal[key] !== undefined && outPutVal[key] !== null && outPutVal[key] !== '') {
              queryParams.append(key, outPutVal[key]);
            }
          });

          // Navigate to listing page with query parameters
          router.push(`/travel/transfers/listing?${queryParams.toString()}`);

          resetForm({});
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => (
        <Form autoComplete="off" id="transferLandingOneWay">
          <OnewayForm
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            setFieldValue={setFieldValue}
            cLocation={cLocation}
            setCLocation={setCLocation}
            setDLocation={setDLocation}
            dLocation={dLocation}
            reverseLocation={reverseLocation}
            setPickPlaceId={setPickPlaceId}
            setDropPlaceId={setDropPlaceId}
            pickUpDate={pickUpDate}
            setpickUpDate={setpickUpDate}
            startDate={startDate}
            setCountryCode={setCountryCode}
            pickPlaceId={pickPlaceId}
            dropPlaceId={dropPlaceId}
            setPickOptionClicked={setPickOptionClicked}
            pickoptionClicked={pickoptionClicked}
            setDropOptionClicked={setDropOptionClicked}
            dropoptionClicked={dropoptionClicked}
            popup={popup}
            setPopup={setPopup}
            adultNo={adultNo}
            setAdultNo={setAdultNo}
            childNo={childNo}
            setChildNo={setChildNo}
            infantNo={infantNo}
            gender={gender}
            setGender={setGender}
            setInfantNo={setInfantNo}
          />
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(OneWay);
