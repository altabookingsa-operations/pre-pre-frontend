'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import getYear from 'date-fns/getYear';
import gb from 'date-fns/locale/en-GB';
import { registerLocale } from 'react-datepicker';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import HourlyForm from './hourlyForm';
import storageInstance from '@/utils/storageInstance';
import { TRANSFERS_SEARCH_DATA } from '@/utils/constants';
import cookieInstance from '@/utils/cookieInstance';

registerLocale('gb', gb);

const Hourly = () => {
  const [cLocation, setCLocation] = useState('');
  const [pickPlaceId, setPickPlaceId] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [pickoptionClicked, setPickOptionClicked] = useState(false);
  const [popup, setPopup] = useState('');
  const [adultNo, setAdultNo] = useState(1);
  const [childNo, setChildNo] = useState(0);
  const [infantNo, setInfantNo] = useState(0);
  const [gender, setGender] = useState('Male');
  const router = useRouter();

  const currentDate = new Date();
  const initialDate = currentDate.setDate(currentDate.getDate() + 1);
  const startDate = new Date(initialDate);
  const [pickUpDate, setpickUpDate] = useState(startDate);

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

  const currentYear = new Date().getFullYear();
  const range = (start, end) => new Array(end - start).fill(null).map((d, i) => i + start);

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

  function extractTerminalAndAirport(text) {
    const terminalRegex = /\bTerminals?\b/i;
    const airportRegex = /\bAirport\b/i;

    const terminalMatch = text?.match(terminalRegex);
    const airportMatch = text?.match(airportRegex);

    return [terminalMatch ? terminalMatch[0] : '', airportMatch ? airportMatch[0] : ''];
  }

  return (
    <Formik
      initialValues={{
        pickUpLocation: '',
        pickUpDate: '',
        pickUpTime: '',
        passengers: 1,
        luggages: 1,
        hourly: 1,
        pickUpLatLng: {},
        dropOffLatLng: {},
        pickUpName: '',
        locationTypePick: '',
        flight_no: '',
        name: '',
        airline_name: '',
      }}
      validationSchema={Yup.object({
        pickUpLocation: Yup.string().required('Pick-Up Location is required'),
        pickUpDate: Yup.string().required('Pick-Up Date is required'),
        pickUpTime: Yup.string().required('Pick-Up Time is required'),
      })}
      onSubmit={(values, { resetForm }) => {
        if (cLocation?.length && !pickPlaceId?.length) {
          setPickOptionClicked(true);
          return;
        }

        if (pickPlaceId?.length) {
          const outPutVal = {
            pickUpLocation: cLocation,
            pickUpPlaceId: pickPlaceId,
            countryCode: countryCode,
            pickUpName: cLocation,
            pickUpDate: pickUpDate.toString(),
            pickUpDateServer: moment(pickUpDate.toString()).format('YYYY-MM-DD'),
            pickUpTime: moment(pickUpDate.toString())
              .utcOffset(pickUpDate.toString())
              .format('HH:mm'),
            luggages: values.luggages,
            pickUpLatLng: JSON.stringify(values?.pickUpLatLng),
            dropOffLatLng: JSON.stringify(values?.pickUpLatLng), // Same as pickup for hourly
            searchType: 'hourly',
            hourly: values.hourly,
            locationTypePick:
              extractTerminalAndAirport(cLocation?.toLocaleLowerCase())[0] === 'terminal' ||
              extractTerminalAndAirport(cLocation?.toLocaleLowerCase())[0] === 'airport'
                ? extractTerminalAndAirport(cLocation?.toLocaleUpperCase())[0]
                : values?.locationTypePick?.toUpperCase(),
            flight_no: values?.flight_no,
            adult: Number(adultNo),
            children: Number(childNo),
            infants: Number(infantNo),
            perPage: width >= 1200 ? 10 : 10,
            aiport_name: values?.name,
            gender: gender,
            airline_name: values?.airline_name,
            lat: values?.pickUpLatLng?.Latitude,
            lng: values?.pickUpLatLng?.Longitude,
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

          resetForm();
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
        <Form autoComplete="off" id="transferLandingHourly">
          <HourlyForm
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
            setPickPlaceId={setPickPlaceId}
            pickUpDate={pickUpDate}
            setpickUpDate={setpickUpDate}
            startDate={startDate}
            setCountryCode={setCountryCode}
            pickPlaceId={pickPlaceId}
            setPickOptionClicked={setPickOptionClicked}
            pickoptionClicked={pickoptionClicked}
            popup={popup}
            setPopup={setPopup}
            adultNo={adultNo}
            setAdultNo={setAdultNo}
            childNo={childNo}
            setChildNo={setChildNo}
            infantNo={infantNo}
            setInfantNo={setInfantNo}
            setGender={setGender}
            gender={gender}
          />
        </Form>
      )}
    </Formik>
  );
};

export default React.memo(Hourly);
