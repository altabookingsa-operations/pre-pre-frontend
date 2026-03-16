import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import moment from 'moment';
import storageInstance from '@/utils/storageInstance';

import { CARS_SEARCH_DATA } from '@/utils/constants';
import { endOfDay, startOfDay } from 'date-fns/fp';
import { Context } from '@/context/index';
import { useContext } from 'react';
import OnewayForm from './onewayForm';

const OneWay = () => {
  // /* Pick up date/time and Drop date/time functionality */
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : '');

  const startDate = new Date();
  const [pickUpDate, setpickUpDate] = useState(startDate);
  const [pickUpTime, setpickUpTime] = useState(
    setHours(setMinutes(pickUpDate, pickUpDate?.getMinutes()), pickUpDate?.getHours())
  );

  const [dropDate, setDropDate] = useState(pickUpDate);
  const [dropTime, setDropTime] = useState(
    setHours(setMinutes(pickUpDate, pickUpTime?.getMinutes()), pickUpDate?.getHours() + 2)
  );

  const dropDtSetPicDt = date => {
    setDropDate(date);
  };

  const pickTimeDate = setHours(
    setMinutes(pickUpTime, pickUpTime?.getMinutes()),
    pickUpTime?.getHours() + 2
  );

  const dropTimeDate = setHours(setMinutes(dropTime, dropTime?.getMinutes()), dropTime?.getHours());
  const isMinDay =
    pickUpDate?.getDate() === dropDate?.getDate() ||
    pickTimeDate?.getDate() === dropTimeDate?.getDate();

  const minTimeMaxDay = setHours(setMinutes(dropDate, 0), startOfDay(dropDate).getHours());
  const setMinTime = setHours(setMinutes(dropTime, dropTime?.getMinutes()), dropTime?.getHours());
  const minTime = isMinDay ? setMinTime : minTimeMaxDay;

  const filterPassedTime = time => {
    const selectedDate = new Date(time);
    return startDate?.getTime() < selectedDate?.getTime();
  };
  // /* Pick up date/time and Drop date/time functionality */
  const [value, setValue] = useState('');
  const [valueDrop, setValueDrop] = useState('');
  const [pickupError, setPickUpError] = useState(false);
  const [dropupError, setDropUpError] = useState(false);
  const [picupLocation, setPicupLocation] = useState({
    id: '',
    code: '',
    full_name: '',
    short_name: '',
    coordinates: {},
    country_code: '',
  });
  const [dropOffLocation, setDropOffLocation] = useState({
    id: '',
    code: '',
    full_name: '',
    short_name: '',
    coordinates: {},
  });
  // const [nearestLocationList, setNearestLocationList] = useState([]);
  const { state, dispatch } = useContext(Context);

  // let handleColor = (time) => {
  //   return "time-stripes";
  // };
  const router = useRouter();
  const searchParams = useSearchParams();
  const [queryPickUpTime, setQueryPickUpTime] = useState('');
  const [queryDropOffTime, setQuerDropOffTime] = useState('');
  function handleWindowSizeChange() {
    setWidth(typeof window !== 'undefined' ? window.innerWidth : '');
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
  }, []);
  return (
    <Formik
      enableReinitialize={false}
      initialValues={{
        pickUpLocation: `${value}`,
        dropOffLocation: `${valueDrop}`,
        pickUpDate: '',
        pickUpTime: '',
        dropOffDate: '',
        dropOffTime: '',
        carType: '',
        carRentalCompany: '',
        pickUpType: '',
      }}
      validationSchema={Yup.object({
        pickUpLocation: Yup.string()
          // .required("Pick-Up Location is required")
          //   .trim()
          .test('Required', 'Pick-Up Location is required', function () {
            return !!value && value.length > 0;
          }),
        dropOffLocation: Yup.string()
          //.required("Drop Off Location is required")
          // .trim()
          .test('Required', 'Pick-Up Location is required', function () {
            return !!valueDrop && valueDrop.length > 0;
          }),
        pickUpDate: Yup.string().nullable().required('Pick-Up Date is required').trim(),
        pickUpTime: Yup.string().trim().nullable().required('Pick-Up Time is required'),
        dropOffDate: Yup.string().required('Drop-Off Date is required').nullable().trim(),
        dropOffTime: Yup.string().required('Drop-Off Time is required').nullable().trim(),
        // pickUpType: Yup.string()
        //   .required("Pick-Up Place is required")
        //   .nullable()
        //   .trim(),
      })}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        if (values?.pickUpLocation == 'error' || values?.dropOffLocation == 'error') {
          setPickUpError(Boolean(values?.pickUpLocation == 'error'));
          setDropUpError(Boolean(values?.dropOffLocation == 'error'));
        } else {
          const outPutVal = {
            pickUpFullDate: moment(pickUpDate.toString()).format('dddd D MMM yyyy'),
            pickUpDate: values.pickUpDate.toString(),
            pickUpDateUTC: moment(values.pickUpDate.toString()).format('YYYY-MM-DD'),

            pickUpUtcTime: !!queryPickUpTime
              ? moment(queryPickUpTime.toString())
                  .utcOffset(queryPickUpTime.toString())
                  .format('HH:mm:ss')
              : moment(values.pickUpTime.toString())
                  .utcOffset(values.pickUpTime.toString())
                  .format('HH:mm:ss'),
            pickUpTime: !!queryPickUpTime
              ? queryPickUpTime.toString()
              : values.pickUpTime.toString(),
            dropOffTime: !!queryDropOffTime
              ? queryDropOffTime.toString()
              : values.dropOffTime.toString(),
            dropOffUtcTime: !!queryDropOffTime
              ? moment(queryDropOffTime.toString())
                  .utcOffset(queryDropOffTime.toString())
                  .format('HH:mm:ss')
              : moment(values.dropOffTime.toString())
                  .utcOffset(values.dropOffTime.toString())
                  .format('HH:mm:ss'),
            dropOffDate: values.dropOffDate.toString(),
            dropOffDateUTC: moment(values.dropOffDate.toString()).format('YYYY-MM-DD'),
            pickUp: picupLocation.code,
            locationFullName: `${picupLocation.full_name}, ${picupLocation.secondaryDisplayName}`,
            dropOff: dropOffLocation.code,
            locationDropFullName: `${dropOffLocation.full_name}, ${dropOffLocation.secondaryDisplayName}`,
            carType: values.carType,
            carCompany: values.carRentalCompany,
            carCompanyFullText: values.carRentalCompany,
            cityName: values.pickUpLocation,
            cityNameDropOff: values.dropOffLocation,
            pickUpLatLng: JSON.stringify(picupLocation?.coordinates),
            dropOffLatLng: JSON.stringify(dropOffLocation?.coordinates),
            searchType: 'oneWay',
            // picupLocationType: values?.pickUpType,
            country_code: picupLocation?.country_code,
            perPage: width >= 1200 ? 10 : 2,
          };
          console.log('~ OneWay ~ outPutVal:', outPutVal);
          dispatch({
            type: 'EMPTY_CART_FOR_MAP_TEMP',
            payload: [],
          });
          storageInstance?.setStorageObj(CARS_SEARCH_DATA, outPutVal);

          // const queryString = new URLSearchParams(outPutVal).toString();
          // router.push(`/travel/cars/listing?${queryString}`);
          const newDate = new Date();
          resetForm({
            values: {
              pickUpLocation: '',
              dropOffLocation: '',
              pickUpDate: '',
              pickUpTime: '',
              dropOffDate: '',
              dropOffTime: '',
              carType: '',
              carRentalCompany: '',
              pickUpType: '',
            },
          });
          setValue('');
          setValueDrop('');
          setPicupLocation({
            id: '',
            code: '',
            full_name: '',
            short_name: '',
            coordinates: {},
            country_code: '',
          });
          setDropOffLocation({
            id: '',
            code: '',
            full_name: '',
            short_name: '',
            coordinates: {},
          });
          setpickUpDate(newDate);
          setpickUpTime(setHours(setMinutes(newDate, newDate?.getMinutes()), newDate?.getHours()));
          setDropDate(newDate);
          setDropTime(
            setHours(setMinutes(newDate, newDate?.getMinutes()), newDate?.getHours() + 2)
          );
          setQueryPickUpTime('');
          setQuerDropOffTime('');
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
            setValue={setValue}
            setValueDrop={setValueDrop}
            value={value}
            valueDrop={valueDrop}
            picupLocation={picupLocation}
            setPicupLocation={setPicupLocation}
            dropOffLocation={dropOffLocation}
            setDropOffLocation={setDropOffLocation}
            pickUpDate={pickUpDate}
            startDate={startDate}
            pickUpTime={pickUpTime}
            filterPassedTime={filterPassedTime}
            dropDate={dropDate}
            dropTime={dropTime}
            minTime={minTime}
            setDropDate={setDropDate}
            setDropTime={setDropTime}
            setpickUpDate={setpickUpDate}
            dropDtSetPicDt={dropDtSetPicDt}
            setpickUpTime={setpickUpTime}
            setPickUpError={setPickUpError}
            setDropUpError={setDropUpError}
            dropupError={dropupError}
            pickupError={pickupError}
            setQueryPickUpTime={setQueryPickUpTime}
            setQuerDropOffTime={setQuerDropOffTime}
          />
        </Form>
      )}
    </Formik>
  );
};

export default OneWay;
