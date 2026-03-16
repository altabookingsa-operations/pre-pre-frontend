import { Formik, Form } from 'formik';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { useState, useContext } from 'react';
import storageInstance from '@/utils/storageInstance';
import { Context } from '@/context';

import moment from 'moment';
import RoundTripForm from './RoundtripForm';

const RoundTrip = () => {
  const { dispatch } = useContext(Context);
  const currentDate = new Date();
  const initialDate = currentDate.setDate(currentDate.getDate() + 1);
  const today = new Date();
  const finalDate = new Date();
  finalDate.setDate(today.getDate() + 361);
  const startDate = new Date(initialDate);
  const endDate = new Date(finalDate);
  const [popup, setPopup] = useState('');
  const [valueF, setValueF] = useState('');
  const [valueT, setValueT] = useState('');
  const [departureDate, setdepartureDate] = useState(new Date());
  const [countryCode, setCountryCode] = useState('');
  const [adultNo, setAdultNo] = useState(1);
  const [childNo, setChildNo] = useState(0);
  const [infantNo, setInfantNo] = useState(0);
  const rangeChild = (start, end) => {
    if (start === end) return [start];
    return [start, ...rangeChild(start + 1, end)];
  };
  const router = useRouter();
  return (
    <Formik
      enableReinitialize={false}
      initialValues={{
        fromLocation: '',
        toLocation: '',
        departureDate: '',
        returnDate: '',
        adults: 1,
        youths: 0,
        infantNo: 0,
      }}
      validationSchema={Yup.object({
        fromLocation: Yup.string().required('Source Location is required'),
        toLocation: Yup.string().required('Destination Location is required'),
        departureDate: Yup.string().required('Departure Date is required'),
        returnDate: Yup.string().required('Return Date is required'),
      })}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        const outPutVal = {
          fromLocation: valueF,
          toLocation: valueT,
          fromLocationId: values?.fromLocation,
          toLocationId: values?.toLocation,
          departureDate: moment(values?.departureDate, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ').format(
            'YYYY-MM-DD'
          ),
          returnDate: moment(values?.returnDate, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ').format(
            'YYYY-MM-DD'
          ),
          adults: Number(values?.adults),
          children: Number(values?.youths),
          infants: Number(values?.infantNo),
          travelType: 'roundtrip',
          country: countryCode,
        };
        console.log('outPutVal', outPutVal);
        storageInstance?.setStorageObj('BUS_SEARCH_DATA', outPutVal);

        // router.push(
        //   {
        //     pathname: '/travel/buses/listing',
        //     query: outPutVal,
        //   },
        //   undefined,
        //   { shallow: false }
        // );

        dispatch({
          type: 'EMPTY_CART_FOR_MAP_TEMP',
          payload: [],
        });
        resetForm({});
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
          <RoundTripForm
            values={values}
            errors={errors}
            touched={touched}
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleSubmit={handleSubmit}
            setFieldValue={setFieldValue}
            setdepartureDate={setdepartureDate}
            departureDate={departureDate}
            setPopup={setPopup}
            popup={popup}
            setAdultNo={setAdultNo}
            setChildNo={setChildNo}
            setInfantNo={setInfantNo}
            adultNo={adultNo}
            childNo={childNo}
            infantNo={infantNo}
            endDate={endDate}
            startDate={startDate}
            setValueF={setValueF}
            setValueT={setValueT}
            valueF={valueF}
            valueT={valueT}
            setCountryCode={setCountryCode}
            countryCode={countryCode}
          />
        </Form>
      )}
    </Formik>
  );
};

export default RoundTrip;
