'use client';

import { Formik, Form } from 'formik';
import { useRouter } from 'next/navigation'; // Updated import for App Router
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import moment from 'moment';
import OnewayForm from './OnewayForm';
import storageInstance from '@/utils/storageInstance';

const OneWay = () => {
  const router = useRouter();

  const [cLocation, setCLocation] = useState('');
  const [pickPlaceId, setPickPlaceId] = useState('');
  const [value, setValue] = useState('');
  const [locationCode, setLocationCode] = useState('');
  const [countryCode, setCountryCode] = useState('');

  const [pickUpDate, setpickUpDate] = useState('');

  const [dropUpDate, setDropUpDate] = useState('');

  /** UPDATE GUEST CODE */
  const [adultNo, setAdultNo] = useState(1);
  const [childNo, setChildNo] = useState(0);
  const [roomsNo, setRoomsNo] = useState(1);
  const [childAge, setChildAge] = useState([]);
  const [childAgeList, setChildAgeList] = useState([]);
  const [pickupError, setPickUpError] = useState(false);
  const [childAgeError, setChildAgeError] = useState(false);
  const [inputvalue, setInputValue] = useState('');

  // Fixed window width check for SSR/Hydration safety
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  function handleWindowSizeChange() {
    setWidth(typeof window !== 'undefined' ? window.innerWidth : 0);
  }

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);
  /** UPDATE GUEST CODE */

  // Helper function to construct query string for router.push
  const createQueryString = params => {
    const searchParams = new URLSearchParams();
    for (const key in params) {
      const val = params[key];
      if (Array.isArray(val)) {
        val.forEach(item => searchParams.append(key, item));
      } else if (val !== null && val !== undefined) {
        searchParams.append(key, val);
      }
    }
    return searchParams.toString();
  };

  return (
    <Formik
      enableReinitialize={false}
      initialValues={{
        pickUpLocation: `${cLocation}`,
        pickUpDate: pickUpDate !== '' ? pickUpDate : '',
        dropUpDate: dropUpDate !== '' ? dropUpDate : '',
        searchAdults: adultNo,
        searchChild: childNo,
        searchRoom: roomsNo,
        pickUpLatLng: '',
        pickUpName: '',
        hotelName: '',
      }}
      validationSchema={Yup.object({
        pickUpLocation: Yup.string()
          .trim()
          .test('Required', 'Location is required', function (value) {
            return (!!value && value.length > 0) || Boolean(inputvalue?.length);
          }),
        pickUpDate: Yup.string().nullable().required('Check-In date is required'),
        dropUpDate: Yup.string().nullable().required('Check-Out date is required'),
      })}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        const error = childAgeList?.length ? childAgeList?.findIndex(x => x === '') : null;

        if (values?.pickUpLocation == 'error' || (error !== null && error !== -1)) {
          setPickUpError(Boolean(values?.pickUpLocation == 'error'));
          setChildAgeError(Boolean(error !== null && error !== -1));
        } else {
          const outPutVal = {
            countryCode: countryCode,
            location: values?.pickUpName,
            hotel_full_location: values?.pickUpLocation,
            hotel_name: values?.hotelName,
            checkin_date: pickUpDate.toString(),
            checkout_date: dropUpDate.toString(),
            checkin_date_server: moment(pickUpDate.toString()).format('YYYY-MM-DD'),
            checkout_date_server: moment(dropUpDate.toString()).format('YYYY-MM-DD'),
            pickUpLatLng: JSON.stringify(values.pickUpLatLng),
            adult: adultNo,
            children: childNo,
            total_room: roomsNo,
            type: values?.locationTypePick,
            children_age: childAgeList.length > 0 ? childAgeList : [],
            perPage: 10,
          };

          storageInstance?.setStorageObj('HOTEL_SEARCH_DATA', outPutVal);

          // App Router navigation requires a URL string
          const queryString = createQueryString(outPutVal);
          router.push(`/travel/hotels/listing?${queryString}`);

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
            setCLocation={setCLocation}
            cLocation={cLocation}
            setLocationCode={setLocationCode}
            setValue={setValue}
            setPickPlaceId={setPickPlaceId}
            setpickUpDate={setpickUpDate}
            setDropUpDate={setDropUpDate}
            setChildAgeList={setChildAgeList}
            setRoomsNo={setRoomsNo}
            setChildNo={setChildNo}
            setAdultNo={setAdultNo}
            setChildAge={setChildAge}
            locationCode={locationCode}
            value={value}
            pickUpDate={pickUpDate}
            dropUpDate={dropUpDate}
            childAgeList={childAgeList}
            roomsNo={roomsNo}
            childNo={childNo}
            adultNo={adultNo}
            childAge={childAge}
            setCountryCode={setCountryCode}
            setPickUpError={setPickUpError}
            pickupError={pickupError}
            childAgeError={childAgeError}
            setChildAgeError={setChildAgeError}
            setInputValue={setInputValue}
            inputvalue={inputvalue}
          />
        </Form>
      )}
    </Formik>
  );
};

export default OneWay;
