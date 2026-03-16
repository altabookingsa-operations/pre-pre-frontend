import React, { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import IconButton from '@mui/material/IconButton';
import Moment from 'moment';
import { Context } from '../../../context';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Form, Formik } from 'formik';
import FilterForm from './filterForm';
import * as Yup from 'yup';
import { useGetFilterListTransfer } from '../../../hooks/useFilter';
import { useSearchParams } from 'next/navigation';
import cookieInstance from '../../../utils/cookieInstance';
import axiosFrontNodeInstance from '../../../utils/axiosFrontNodeInstance';
import { DEFAULT_CURRENCY, SELECTED_CURRENCY } from '../../../utils/constants';
import storageInstance from '../../../utils/storageInstance';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const FilterDialog = ({
  filterListTransfer,
  setStoreFliterObj,
  storeFliterObj,
  setCurrentPage,
  isMobile,
  setTotalPages,
  setStoreTransferDataList,
  setIsLoadingBtnApply,
  isLoadingBtnApply,
  isLoadingBtnClear,
  setIsLoadingBtnClear,
}) => {
  const { state, dispatch } = useContext(Context);
  // const { data: filterListTransfer, isLoading: isLoadingFilter } =
  //   useGetFilterListTransfer();
  const theme = useTheme();
  const searchParams = useSearchParams();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  // const [isLoadingBtnApply, setIsLoadingBtnApply] = useState(false);
  // const [isLoadingBtnClear, setIsLoadingBtnClear] = useState(false);

  const handleSubmitFilter = async (filterObj, isClear) => {
    if (isClear) {
      setIsLoadingBtnClear(true);
      const searchParamsObj = Object.fromEntries(searchParams.entries());
      const transferSearchParam = {
        start_place_id: searchParamsObj?.pickUpPlaceId,
        end_place_id: searchParamsObj?.dropPlaceId,
        start_time_date: searchParamsObj?.pickUpDateServer,
        start_time_time: searchParamsObj?.pickUpTime,
        start_point_instructions: searchParamsObj?.pickUpLocation,
        end_point_instructions: searchParamsObj?.dropLocation,
        //passengers: searchParamsObj?.passengers,
        adult: searchParamsObj?.adult,
        children: searchParamsObj?.children,
        infant: searchParamsObj?.infants,
        luggage: searchParamsObj?.luggages ?? 0,
        //   "user_id": 1184,
        user_id: storageInstance?.getStorage('authDataTokenHolderIdNode')
          ? storageInstance?.getStorage('authDataTokenHolderIdNode')
          : null,
        end_time_date: searchParamsObj?.pickUpDateServer,
        end_time_time: searchParamsObj?.end_time_time || '',
        travel_type: searchParamsObj?.searchType?.toLowerCase(),
        cacheKey: cookieInstance.getStorageObj('TRANSFER_CACHE_KEY'),
        sort: '',
        filters: {
          class: '',
          car_models: '',
          seats: '',
          segment: '',
          services: '',
        },
        flight_no: searchParamsObj?.flight_no ?? '',
        page: 1,
        perPage: 10,
        countryCode: searchParamsObj?.countryCode,
        pickUpLat: searchParamsObj?.pickUpLatLng
          ? JSON.parse(searchParamsObj?.pickUpLatLng)?.Latitude?.toString()
          : '',
        pickUpLng: searchParamsObj?.pickUpLatLng
          ? JSON.parse(searchParamsObj?.pickUpLatLng)?.Longitude?.toString()
          : '',
        dropOffLat: searchParamsObj?.dropOffLatLng
          ? JSON.parse(searchParamsObj?.dropOffLatLng)?.Latitude?.toString()
          : '',
        dropOffLng: searchParamsObj?.dropOffLatLng
          ? JSON.parse(searchParamsObj?.dropOffLatLng)?.Longitude?.toString()
          : '',
        hourly:
          searchParamsObj?.searchType?.toLowerCase() == 'oneway' ? '' : searchParamsObj?.hourly,
        pickLocationType: searchParamsObj?.locationTypePick,
        dropLocationType: searchParamsObj?.locationTypeDrop,
        airport_name: searchParamsObj?.aiport_name,
      };
      axiosFrontNodeInstance.defaults.headers.common['currency'] =
        cookieInstance.getStorageObj(SELECTED_CURRENCY) !== undefined
          ? cookieInstance.getStorageObj(SELECTED_CURRENCY)
          : DEFAULT_CURRENCY;
      await axiosFrontNodeInstance
        .post('transfer/filter-list', transferSearchParam)
        .then(res => {
          if (res.res_code == 200) {
            let data = res?.data?.list ? res?.data?.list : [];
            setStoreTransferDataList(data);
            dispatch({
              type: 'UPDATE_TRANSFER',
              payload: data,
            });
            dispatch({
              type: 'UPDATE_FULLLIST',
              payload: data,
            });
            dispatch({
              type: 'FILTER_TRANSFER_TOGGLE',
              payload: false,
            });
            setIsLoadingBtnClear(false);
            setCurrentPage(1);
            setTotalPages(res.data?.pagination?.totalPages ?? 1);
          } else {
            setStoreTransferDataList([]);
            dispatch({
              type: 'UPDATE_TRANSFER',
              payload: [],
            });

            dispatch({
              type: 'UPDATE_FULLLIST',
              payload: [],
            });
            dispatch({
              type: 'FILTER_TRANSFER_TOGGLE',
              payload: false,
            });
            setIsLoadingBtnClear(false);
            setCurrentPage(1);
            setTotalPages(1);
          }
        })
        .catch(e => {
          setStoreTransferDataList([]);
          dispatch({
            type: 'UPDATE_TRANSFER',
            payload: [],
          });

          dispatch({
            type: 'UPDATE_FULLLIST',
            payload: [],
          });
          dispatch({
            type: 'FILTER_TRANSFER_TOGGLE',
            payload: false,
          });
          setTotalPages(1);
          setIsLoadingBtnClear(false);
        });
    } else {
      setIsLoadingBtnApply(true);
      const searchParamsObj = Object.fromEntries(searchParams.entries());
      const transferSearchParam = {
        start_place_id: searchParamsObj?.pickUpPlaceId,
        end_place_id: searchParamsObj?.dropPlaceId,
        start_time_date: searchParamsObj?.pickUpDateServer,
        start_time_time: searchParamsObj?.pickUpTime,
        start_point_instructions: searchParamsObj?.pickUpLocation,
        end_point_instructions: searchParamsObj?.dropLocation,
        // passengers: searchParamsObj?.passengers,
        adult: searchParamsObj?.adult,
        children: searchParamsObj?.children,
        infant: searchParamsObj?.infants,
        luggage: searchParamsObj?.luggages ?? 0,
        //   "user_id": 1184,
        user_id: storageInstance?.getStorage('authDataTokenHolderIdNode')
          ? storageInstance?.getStorage('authDataTokenHolderIdNode')
          : null,
        end_time_date: searchParamsObj?.pickUpDateServer,
        end_time_time: searchParamsObj?.end_time_time || '',
        travel_type: searchParamsObj?.searchType?.toLowerCase(),
        cacheKey: cookieInstance.getStorageObj('TRANSFER_CACHE_KEY'),
        sort: filterObj?.sortBy,
        filters: {
          class: filterObj?.class,
          car_models: filterObj?.car_models,
          seats: filterObj?.seats,
          segment: filterObj?.segments,
          services: filterObj?.services,
        },
        flight_no: searchParamsObj?.flight_no ?? '',
        page: 1,
        perPage: 10,
        countryCode: searchParamsObj?.countryCode,
        pickUpLat: searchParamsObj?.pickUpLatLng
          ? JSON.parse(searchParamsObj?.pickUpLatLng)?.Latitude?.toString()
          : '',
        pickUpLng: searchParamsObj?.pickUpLatLng
          ? JSON.parse(searchParamsObj?.pickUpLatLng)?.Longitude?.toString()
          : '',
        dropOffLat: searchParamsObj?.dropOffLatLng
          ? JSON.parse(searchParamsObj?.dropOffLatLng)?.Latitude?.toString()
          : '',
        dropOffLng: searchParamsObj?.dropOffLatLng
          ? JSON.parse(searchParamsObj?.dropOffLatLng)?.Longitude?.toString()
          : '',
        hourly:
          searchParamsObj?.searchType?.toLowerCase() == 'oneway' ? '' : searchParamsObj?.hourly,
        pickLocationType: searchParamsObj?.locationTypePick,
        dropLocationType: searchParamsObj?.locationTypeDrop,
        airport_name: searchParamsObj?.aiport_name,
      };

      axiosFrontNodeInstance.defaults.headers.common['currency'] =
        cookieInstance.getStorageObj(SELECTED_CURRENCY) !== undefined
          ? cookieInstance.getStorageObj(SELECTED_CURRENCY)
          : DEFAULT_CURRENCY;
      await axiosFrontNodeInstance
        .post('transfer/filter-list', transferSearchParam)
        .then(res => {
          if (res.res_code == 200) {
            let data = res?.data?.list ? res?.data?.list : [];

            setStoreTransferDataList(data);
            // console.log("list value filter",data)
            dispatch({
              type: 'UPDATE_TRANSFER',
              payload: data,
            });

            dispatch({
              type: 'UPDATE_FULLLIST',
              payload: data,
            });
            dispatch({
              type: 'FILTER_TRANSFER_TOGGLE',
              payload: false,
            });
            setIsLoadingBtnApply(false);
            setCurrentPage(1);
            setTotalPages(res.data?.pagination?.totalPages ?? 1);
          } else {
            setStoreTransferDataList([]);
            dispatch({
              type: 'UPDATE_TRANSFER',
              payload: [],
            });

            dispatch({
              type: 'UPDATE_FULLLIST',
              payload: [],
            });
            dispatch({
              type: 'FILTER_TRANSFER_TOGGLE',
              payload: false,
            });
            setIsLoadingBtnApply(false);
            setCurrentPage(1);
            setTotalPages(1);
          }
        })
        .catch(e => {
          setStoreTransferDataList([]);
          dispatch({
            type: 'UPDATE_TRANSFER',
            payload: [],
          });

          dispatch({
            type: 'UPDATE_FULLLIST',
            payload: [],
          });
          dispatch({
            type: 'FILTER_TRANSFER_TOGGLE',
            payload: false,
          });
          setTotalPages(1);
          setIsLoadingBtnApply(false);
        });
    }
  };

  return (
    <>
      <BootstrapDialog
        className={'mdl-topup'}
        fullWidth={true}
        fullScreen={fullScreen}
        maxWidth={'md'}
        onClose={() => {
          dispatch({
            type: 'FILTER_TRANSFER_TOGGLE',
            payload: false,
          });
        }}
        aria-labelledby="customized-dialog-title"
        open={state.toggleTransferFilter}
      >
        <DialogTitle sx={{ m: 0, p: 2, mt: fullScreen ? 5 : 0 }} id="customized-dialog-title">
          Filter
        </DialogTitle>
        <IconButton
          aria-label="close"
          //   onClick={handleClose}
          onClick={() => {
            dispatch({
              type: 'FILTER_TRANSFER_TOGGLE',
              payload: false,
            });
          }}
          className="close-icon-btn"
          sx={{
            position: 'absolute',
            right: 25,
            top: -2,
            mt: fullScreen ? 7 : 0,
            color: '#5c5c5c',
            outline: 'none',
            marginTop: '10px',
          }}
        >
          <i className="fa-solid fa-xmark"></i>
        </IconButton>
        <Formik
          enableReinitialize={false}
          initialValues={{
            sort_by_price: '',
            preferred_classes: '',
            preferred_car_model: '',
            preferred_type: '',
            segments: '',
            services: '',
          }}
          validationSchema={Yup.object({
            // min_price: Yup.number()
            //   .typeError("Min Price must be a number")
            //   .positive("Min Price must be greater than zero")
            //   .test(
            //     "is-decimal",
            //     "Min Price must be a valid decimal (This allows up to 2 decimal places)",
            //     (value) => (value + "").match(/^\d+(\.\d{1,2})?$/) // This allows up to 2 decimal places
            //   )
            //   .max(100000, "Min price must be less than or equal to 100000"),
            // max_price: Yup.number()
            //   .typeError("Max Price must be a number")
            //   .positive("Max Price must be greater than zero")
            //   .test(
            //     "is-decimal",
            //     "Max Price must be a valid decimal (This allows up to 2 decimal places)",
            //     (value) => (value + "").match(/^\d+(\.\d{1,2})?$/) // This allows up to 2 decimal places
            //   )
            //   .max(100000, "Max price must be less than or equal to 100000"),
          })}
          onSubmit={async values => {
            let filterObj = {
              car_models: values?.preferred_car_model,
              class: values?.preferred_classes,
              seats: values?.preferred_type,
              sortBy: values?.sort_by_price,
              segments: values?.segments,
              services: values?.services,
            };
            handleSubmitFilter(filterObj, false);
            setStoreFliterObj(filterObj);
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
            <Form
              autoComplete="off"
              onSubmit={e => {
                e.preventDefault();
                handleSubmit(e);
              }}
            >
              {/* {isLoadingFilter ? (
                <>
                  <FilterLoader />
                </>
              ) :
              ( */}
              <>
                <FilterForm
                  values={values}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldValue={setFieldValue}
                  filterListTransfer={filterListTransfer}
                  isLoadingBtnApply={isLoadingBtnApply}
                  setStoreFliterObj={setStoreFliterObj}
                  handleSubmitFilter={handleSubmitFilter}
                  storeFliterObj={storeFliterObj}
                  isLoadingBtnClear={isLoadingBtnClear}
                />
              </>
              {/* // )
              // } */}
            </Form>
          )}
        </Formik>
      </BootstrapDialog>
    </>
  );
};

export default FilterDialog;
