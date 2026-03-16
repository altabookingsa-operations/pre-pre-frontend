import React, { useContext, useEffect, useState } from 'react';

import TripPlannerComponentStepperOne from '../TripPlanner/stepper/TripPlannerComponentStepperOne';
import TripPlannerComponentStepperTwo from '../TripPlanner/stepper/TripPlannerComponentStepperTwo';
import TripPlannerComponentStepperThree from '../TripPlanner/stepper/TripPlannerComponentStepperThree';
import { Context } from '../../context';
import { useGetTripList } from '../../hooks/useTrip';

const SearchInput = () => {
  // new design
  const [step, setStep] = useState(0);
  const { state, dispatch } = useContext(Context);
  const [cityListData, setCityListData] = useState([]);
  const [allFormData, setAllFormData] = useState();
  // const { data: tripDataList, isFetching: isDataLoading } = useGetTripList({
  //   query: state?.query_text,
  // });

  return (
    <>
      <div className="modalnew1">
        <div
          className="modal-content2 trip-planner-new-modal-start"
          style={{
            backgroundImage: 'url(/images/tripplanner-popup-img.png)',
          }}
        >
          <span
            className="close-button"
            onClick={() => {
              $('.modalnew1').removeClass('show-modal-for-search');
              $('#result2').html('');
              $('#result4').html('');
              document.body.classList.remove('hideScrollbar');
              dispatch({
                type: 'SET_TRIP_QUERY_TEXT',
                payload: '',
              });
              setStep(0);
              setCityListData([]);
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </span>

          {step == 0 ? (
            <TripPlannerComponentStepperOne
              setStep={setStep}
              tripDataList={state?.query_res}
              isDataLoading={false}
              setAllFormData={setAllFormData}
            />
          ) : step == 1 ? (
            <TripPlannerComponentStepperTwo
              setStep={setStep}
              tripDataList={state?.query_res}
              setCityListData={setCityListData}
              allFormData={allFormData}
              setAllFormData={setAllFormData}
            />
          ) : (
            <TripPlannerComponentStepperThree
              setStep={setStep}
              cityListData={cityListData}
              tripDataList={state?.query_res}
              allFormData={allFormData}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SearchInput;
