'use client';

import { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import * as Yup from 'yup';

import storageInstance from '@/utils/storageInstance';
import gb from 'date-fns/locale/en-GB';
import moment from 'moment';
import { registerLocale } from 'react-datepicker';
import OnewayForm from './OnewayForm';
import { useRouter } from 'next/navigation';

registerLocale('gb', gb);

const OneWay = ({ setGetDestinationLoading }) => {
  const router = useRouter();
  const [pickUpDate, setpickUpDate] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [countryValue, setCountryValue] = useState('');
  const [allDestinationList, setAllDestinationList] = useState([]);
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

  return (
    <>
      <Formik
        enableReinitialize={false}
        validateOnBlur={false} // Disable blur validation globally
        initialValues={{
          pickUpDate: '',
          dropOffDate: '',
          destination: '',
          country_code: '',
        }}
        validationSchema={Yup.object({
          country_code: Yup.string().trim().required('Country is required'),
          destination: Yup.string().trim().required('Destination is required'),
          pickUpDate: Yup.string().nullable().required('Start Date is required'),
          dropOffDate: Yup.string().nullable().required('End Date is required'),
        })}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          const outPutVal = {
            country_name: JSON.stringify(countryValue),
            country_code: values.country_code,
            destination_name: JSON.parse(values.destination).name,
            destination: JSON.parse(values.destination).code,
            musement_city_id: JSON.parse(values.destination).musement_city_id,
            pickUpDate: moment(values.pickUpDate).format('YYYY-MM-DD'),
            dropOffDate: moment(values.dropOffDate).format('YYYY-MM-DD'),
            page: 1,
            perPage: 10,
          };

          storageInstance?.setStorageObj('TOURS_N_ACTIVITIES_SEARCH_DATA', outPutVal);
          // router.push(
          //   {
          //     pathname: '/travel/tours/listing',
          //     query: outPutVal,
          //   },
          //   undefined,
          //   { shallow: false }
          // );
          // console.log('🚀 ~ OneWay ~ outPutVal:', outPutVal);
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
          setFieldError,
          setFieldTouched,
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
              pickUpDate={pickUpDate}
              setpickUpDate={setpickUpDate}
              suggestions={suggestions}
              setSuggestions={setSuggestions}
              countryValue={countryValue}
              setCountryValue={setCountryValue}
              allDestinationList={allDestinationList}
              setAllDestinationList={setAllDestinationList}
              setGetDestinationLoading={setGetDestinationLoading}
              setFieldError={setFieldError}
              setFieldTouched={setFieldTouched}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default OneWay;
