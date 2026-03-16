'use client';
import React, { useEffect, useState } from 'react';
// import OnewayForm from './onewayForm';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
// import { useRouter } from '';
// import storageInstance from '../../utils/storageInstance';
import storageInstance from '@/utils/storageInstance';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import OnewayForm from './OnewayForm';

const OneWay = () => {
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
  return (
    <>
      <Formik
        enableReinitialize={false}
        initialValues={{
          get_sports: '',
          event_name: '',
          country: '',
          from_date: '',
          to_date: '',
        }}
        validationSchema={Yup.object({
          get_sports: Yup.string().trim().required('Sports type is required'),
          from_date: Yup.date()
            // .required("From date is required")
            .min(new Date(), 'From date cannot be in the past'),
          to_date: Yup.date()
            // .required("To date is required")
            .min(Yup.ref('from_date'), 'To date cannot be before from date'),
        })}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          const DateData = new Date();

          const outPutVal = {
            get_sports: values?.get_sports,
            tournament_id: values?.event_name || '',
            country: values?.country || '',
            from_date: values?.from_date ? values?.from_date?.toString() : DateData.toString(),
            to_date: values?.to_date ? values?.to_date?.toString() : DateData.toString(),
            from_date_server: values?.from_date
              ? moment(values?.from_date).format('YYYY-MM-DD')
              : '',
            to_date_server: values?.to_date ? moment(values?.to_date).format('YYYY-MM-DD') : '',
            perPage: 10,
          };
          console.log('outPutVal', outPutVal);
          storageInstance?.setStorageObj('XS_2_EVENTS', outPutVal);
          //   router.push(
          //     {
          //       pathname: '/travel/events/listing',
          //       query: outPutVal,
          //     },
          //     undefined,
          //     { shallow: false }
          //   );
          resetForm({});
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
          <Form autoComplete="off" id="transferLandingOneWay">
            <OnewayForm
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
              setFieldValue={setFieldValue}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default OneWay;
