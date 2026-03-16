import { Button, DialogActions, DialogContent, Slider, useMediaQuery } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../context';
import { ErrorMessage } from 'formik';
import * as constants from '../../../utils/constants';
import cookieInstance from '../../../utils/cookieInstance';
import { useSearchParams } from 'next/navigation';
function valuetext(value) {
  return `${value}°C`;
}

const FilterForm = ({
  values,
  handleChange,
  handleBlur,
  setFieldValue,
  filterListTransfer,
  isLoadingBtnApply,
  setStoreFliterObj,
  handleSubmitFilter,
  storeFliterObj,
  isLoadingBtnClear,
}) => {
  // const SELECTED_CURRENCY = cookieInstance.getStorageObj(
  //   constants.SELECTED_CURRENCY
  // );
  const { dispatch } = useContext(Context);

  const searchParams = useSearchParams();
  // useEffect(() => {
  //   if (router.query?.filter) {
  //     const filterObj = JSON.parse(router.query?.filter);
  //     console.log("")
  //     setFieldValue("preferred_car_model", filterObj?.car_models);
  //     setFieldValue("preferred_classes", filterObj?.class);
  //     setFieldValue("preferred_type", Number(filterObj?.seats));
  //     setFieldValue("sort_by_price", filterObj?.sortBy);
  //   }
  // }, [setFieldValue, router.query?.filter]);

  useEffect(() => {
    if (storeFliterObj) {
      setFieldValue('preferred_car_model', storeFliterObj?.car_models || '');
      setFieldValue('preferred_classes', storeFliterObj?.class || '');
      setFieldValue('preferred_type', Number(storeFliterObj?.seats) || 0);
      setFieldValue('sort_by_price', storeFliterObj?.sortBy || '');
      setFieldValue('segments', storeFliterObj?.segments || 0);
      setFieldValue('services', storeFliterObj?.services || 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setFieldValue]);
  // const [value, setValue] = useState([0, 10000]);

  // const [showMoreAndLessCarModels, setShowMoreAndLessCarModels] = useState(5);
  // const [shoeMoreAndLessPreferredClasses, setShoeMoreAndLessPreferredClasses] =
  //   useState(5);
  // const [shoeMoreAndLessSeats, setShoeMoreAndLessSeats] = useState(5);
  const [visibleItems, setVisibleItems] = useState({
    carModel: 5,
    preferredClass: 5,
    preferredType: 5,
    segments: 5,
    services: 5,
  });
  //   const handleChange = (event, newValue) => {
  //     setValue(newValue);
  //   };

  // const toggleShowMoreAmenities = () => {
  //   if (showMoreAndLessCarModels === 5) {
  //     // Show all items
  //     setShowMoreAndLessCarModels(
  //       filterListTransfer?.car_models?.options.length
  //     );
  //   } else {
  //     // Show only the initial items
  //     setShowMoreAndLessCarModels(5);
  //   }
  // };

  // const toggleShowMorePropertyType = () => {
  //   if (shoeMoreAndLessPreferredClasses === 5) {
  //     // Show all items
  //     setShoeMoreAndLessPreferredClasses(
  //       filterListTransfer?.car_models?.options.length
  //     );
  //   } else {
  //     // Show only the initial items
  //     setShoeMoreAndLessPreferredClasses(5);
  //   }
  // };

  // const toggleShowMoreSeat = () => {
  //   if (shoeMoreAndLessSeats === 5) {
  //     // Show all items
  //     setShoeMoreAndLessSeats(filterListTransfer?.seats?.options.length);
  //   } else {
  //     // Show only the initial items
  //     setShoeMoreAndLessSeats(5);
  //   }
  // };

  // const handleCheckboxChangeGuestRating = (event) => {
  //   const value = event.target.value;

  //   if (values?.user_rating?.includes(value)) {
  //     const data = values?.user_rating?.filter((i) => i !== value);
  //     setFieldValue("user_rating", data);
  //   } else {
  //     setFieldValue("user_rating", [...values?.user_rating, value]);
  //   }
  // };

  const handleCheckboxChangeCarModel = event => {
    const value = event.target.value;

    if (values?.preferred_car_model?.includes(value)) {
      const data = values?.preferred_car_model?.filter(i => i !== value);
      setFieldValue('preferred_car_model', data.length ? data : '');
    } else {
      setFieldValue('preferred_car_model', [...values?.preferred_car_model, value]);
    }
  };
  const handleCheckboxChangePreferredClass = event => {
    const value = event.target.value;

    if (values?.preferred_classes?.includes(value)) {
      const data = values?.preferred_classes?.filter(i => i !== value);
      setFieldValue('preferred_classes', data.length ? data : '');
    } else {
      setFieldValue('preferred_classes', [...values?.preferred_classes, value]);
    }
  };
  const handleCheckboxChangeSegments = event => {
    const value = event.target.value;

    if (values?.segments?.includes(value)) {
      const data = values?.segments?.filter(i => i !== value);
      setFieldValue('segments', data.length ? data : '');
    } else {
      setFieldValue('segments', [...values?.segments, value]);
    }
  };
  const handleCheckboxChangeServices = event => {
    const value = event.target.value;

    if (values?.services?.includes(value)) {
      const data = values?.services?.filter(i => i !== value);
      setFieldValue('services', data.length ? data : '');
    } else {
      setFieldValue('services', [...values?.services, value]);
    }
  };
  const handleCheckboxChangeType = event => {
    const value = event.target.value;
    values?.preferred_type == value
      ? setFieldValue('preferred_type', '')
      : setFieldValue('preferred_type', value);
  };
  const toggleShowMore = (key, length) => {
    setVisibleItems(prev => ({
      ...prev,
      [key]: prev[key] === 5 ? length : 5,
    }));
  };
  return (
    <>
      <DialogContent dividers className="dialog-content-filter pb-3">
        <div className="row">
          {/* <div className="col-12">
            <h6 className="label_fontbld">Price (Per Tours)</h6>
          </div>

          <div className="col-6">
            <div className="form-group">
              <label className="label_fontsmall">Minimum</label>
              <div className="frm-new-icon-box-all filter-frmnew">
                <p>{SELECTED_CURRENCY.currency_symbol ?? "$"}</p>
                <input
                  placeholder="100.00"
                  name="min_price"
                  type="number"
                  value={values.min_price}
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="min_price"
                  component="div"
                  style={{
                    color: "red",
                  }}
                  className="error"
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            {" "}
            <div className="form-group">
              <label>Maximum</label>
              <div className="frm-new-icon-box-all filter-frmnew">
                <p>{SELECTED_CURRENCY.currency_symbol ?? "$"}</p>
                <input
                  placeholder="100000.00"
                  name="max_price"
                  type="number"
                  value={values.max_price}
                  className="form-control"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <ErrorMessage
                  name="max_price"
                  component="div"
                  style={{
                    color: "red",
                  }}
                  className="error"
                />
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="range-filterdiv">
              <Slider
                min={1}
                max={100000}
                step={10}
                getAriaLabel={() => "Minimum distance"}
                value={[values?.min_price, values?.max_price]}
                onChange={(event, newValue) => {
                  setFieldValue("min_price", newValue[0]);
                  setFieldValue("max_price", newValue[1]);
                }}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                valueLabelFormat={(e) => {
                  return `${SELECTED_CURRENCY.currency_symbol} ${e}`;
                }}
                disableSwap
              />
            </div>
          </div> */}
          {/* <div className="col-12">
            <hr></hr>
          </div> */}

          {/* <div className="col-md-6">
            <div className="form-group">
              <label className="label_fontbld">Guest rating</label>
              <div className="frm-new-icon-box-all filter-frmnew">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i}>
                    <div className="cat action">
                      <label>
                        <input
                          type="checkbox"
                          id={i}
                          name="user_rating"
                          value={i}
                          checked={values?.user_rating?.includes(String(i))}
                          onChange={handleCheckboxChangeGuestRating}
                        />
                        <span htmlFor={i}>{i} +</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div> */}
          <div className="col-md-6">
            {' '}
            <div className="form-group">
              <label className="label_fontbld">Sort by Price</label>
              <div className="frm-new-icon-box-all filter-frmnew ">
                {[
                  {
                    name: 'Low to High',
                    value: 'low_to_high',
                  },
                  {
                    name: 'High to Low',
                    value: 'high_to_low',
                  },
                ].map((item, i) => (
                  <div className="cat action" key={i}>
                    <label>
                      <input
                        type="radio"
                        value={item.value}
                        name="sort_by_price"
                        checked={item?.value == values.sort_by_price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <span>{item.name}</span>
                    </label>
                  </div>
                ))}

                {/* <div className="cat action">
                  <label>
                    <input type="checkbox" value="1" />
                    <span>High to Low</span>
                  </label>
                </div> */}
              </div>
            </div>
          </div>
          <div className="col-12">
            <hr></hr>
          </div>
          {/* <div className="col-md-6">
            {" "}
            <div className="form-group">
              <label className="label_fontbld">Class</label>
              <div className="frm-new-icon-box-all filter-frmnew filter-frmnew-rounded">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i}>
                    <div className="cat action">
                      <label>
                        <input type="checkbox" value="1" />
                        <span>
                          {i} <i className="fa-regular fa-star"></i>
                        </span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            {" "}
            <div className="form-group">
              <label className="label_fontbld">Preferred Class </label>
              <div className="frm-new-icon-box-all filter-frmnew ">
                <div className="cat action">
                  <label>
                    <input type="checkbox" value="1" />
                    <span>Economy</span>
                  </label>
                </div>
                <div className="cat action">
                  <label>
                    <input type="checkbox" value="1" />
                    <span>Premium Economy</span>
                  </label>
                </div>

                <div className="cat action">
                  <label>
                    <input type="checkbox" value="1" />
                    <span>Business</span>
                  </label>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="col-12">
            <hr></hr>
          </div> */}
          {filterListTransfer?.car_models && (
            <div className="col-12">
              <div className="form-group mb-0">
                <label className="label_fontbld">
                  {filterListTransfer?.car_models?.field_text}
                </label>
                {/* {filterListTransfer?.car_models?.options?.length < 5 ? ( */}
                <>
                  <div className="chckbx_flex">
                    {filterListTransfer?.car_models?.options
                      .slice(0, visibleItems.carModel)
                      .map((item, i) => (
                        <div key={i}>
                          <div className="fil-chk">
                            <input
                              type="checkbox"
                              id={`carModel-${i}`}
                              name="preferred_car_model"
                              value={item?.value}
                              checked={values?.preferred_car_model?.includes(item.value)}
                              onChange={handleCheckboxChangeCarModel}
                            />{' '}
                            <label htmlFor={`carModel-${i}`}>
                              <span></span>
                              {item.text}
                            </label>
                          </div>
                        </div>
                      ))}
                  </div>

                  {/* <h6
                      onClick={toggleShowMoreAmenities}
                      className="showmre_btnnw"
                    >
                      {filterListTransfer?.car_models?.options?.length >= 5
                        ? "Show More"
                        : "Show Less"}
                    </h6> */}
                </>
                {/* ) : ( */}
                <>
                  {/* <div className="chckbx_flex">
                      {filterListTransfer?.car_models?.options
                        .slice(0, showMoreAndLessCarModels)
                        .map((item, i) => (
                          <div key={i}>
                            <div className="fil-chk">
                              <input
                                type="checkbox"
                                id={`car-model-${i}`}
                                name="preferred_car_model"
                                value={item?.value}
                                checked={values?.preferred_car_model?.includes(
                                  item.value
                                )}
                                onChange={handleCheckboxChangeCarModel}
                              />{" "}
                              <label htmlFor={`car-model-${i}`}>
                                <span></span>
                                {item.text}
                              </label>
                            </div>
                          </div>
                        ))}
                    </div> */}

                  <h6
                    onClick={() =>
                      toggleShowMore('carModel', filterListTransfer?.car_models?.options?.length)
                    }
                    className="showmre_btnnw"
                  >
                    {visibleItems.carModel === 5 ? 'Show More' : 'Show Less'}
                  </h6>
                </>
                {/* )} */}
              </div>
            </div>
          )}

          <div className="col-12">
            <hr></hr>
          </div>

          {filterListTransfer?.class && (
            <div className="col-12">
              <div className="form-group">
                <label className="label_fontbld">{filterListTransfer?.class?.field_text}</label>
                {/* {filterListTransfer?.class?.options?.length > 5 ? ( */}
                <>
                  <div className="chckbx_flex">
                    {filterListTransfer?.class?.options
                      .slice(0, visibleItems.preferredClass)
                      .map((item, i) => (
                        <div key={i}>
                          <div className="fil-chk">
                            <input
                              type="checkbox"
                              id={`preferredClass-${i}`}
                              name="preferred_classes"
                              value={item?.value}
                              checked={values?.preferred_classes?.includes(item.value)}
                              onChange={handleCheckboxChangePreferredClass}
                            />{' '}
                            <label htmlFor={`preferredClass-${i}`}>
                              <span></span>
                              {item.text}
                            </label>
                          </div>
                        </div>
                      ))}
                  </div>

                  <h6
                    onClick={() =>
                      toggleShowMore('preferredClass', filterListTransfer?.class?.options?.length)
                    }
                    className="showmre_btnnw"
                  >
                    {visibleItems.preferredClass === 5 ? 'Show More' : 'Show Less'}
                  </h6>
                </>
                {/* ) : ( */}
                {/* <>
                    <div className="chckbx_flex">
                      {filterListTransfer?.class?.options
                         .slice(0, shoeMoreAndLessPreferredClasses)
                        .map((item, i) => (
                          <div key={i}>
                            <div className="fil-chk">
                              <input
                                type="checkbox"
                                id={`preferred-class-${i}`}
                                name="preferred_classes"
                                value={item?.value}
                                checked={values?.preferred_classes?.includes(
                                  item.value
                                )}
                                onChange={handleCheckboxChangePreferredClass}
                              />{" "}
                              <label htmlFor={`preferred-class-${i}`}>
                                <span></span>
                                {item.text}
                              </label>
                            </div>
                          </div>
                        ))}
                    </div>
                  </>
                )} */}
              </div>
            </div>
          )}

          <div className="col-12">
            <hr></hr>
          </div>

          {filterListTransfer?.seats && (
            <div className="col-12">
              <div className="form-group">
                <label className="label_fontbld">{filterListTransfer?.seats?.field_text}</label>
                {/* {filterListTransfer?.seats?.options?.length > 5 ? ( */}
                <>
                  <div className="chckbx_flex">
                    {filterListTransfer?.seats?.options
                      .slice(0, visibleItems.preferredType)
                      .map((item, i) => (
                        <div key={i}>
                          <div className="fil-chk">
                            <input
                              type="checkbox"
                              id={`preferredType-${i}`}
                              name="preferred_type"
                              value={Number(item?.value)}
                              checked={Number(item?.value) == Number(values.preferred_type)}
                              onChange={handleCheckboxChangeType}
                            />{' '}
                            <label htmlFor={`preferredType-${i}`}>
                              <span></span>
                              {item.text}
                            </label>
                          </div>
                        </div>
                      ))}
                  </div>

                  <h6
                    onClick={() =>
                      toggleShowMore('preferredType', filterListTransfer?.seats?.options?.length)
                    }
                    className="showmre_btnnw"
                  >
                    {visibleItems.preferredType === 5 ? 'Show More' : 'Show Less'}
                  </h6>
                </>
                {/* ) : (
                  <>
                    <div className="chckbx_flex">
                      {filterListTransfer?.seats?.options
                        .slice(0, shoeMoreAndLessSeats)
                        .map((item, i) => (
                          <div key={i}>
                            <div className="fil-chk">
                              <input
                                type="checkbox"
                                id={`preferred-type-${i}`}
                                name="preferred_type"
                                value={Number(item?.value)}
                                checked={
                                  Number(item?.value) ==
                                  Number(values.preferred_type)
                                }
                                onChange={handleCheckboxChangeType}
                              />{" "}
                              <label htmlFor={`preferred-type-${i}`}>
                                <span></span>
                                {item.text}
                              </label>
                            </div>
                          </div>
                        ))}
                    </div>
                  </>
                )} */}
              </div>
            </div>
          )}

          <div className="col-12">
            <hr></hr>
          </div>
          {filterListTransfer?.segments && filterListTransfer?.segments?.options?.length ? (
            <>
              <div className="col-12">
                <div className="form-group">
                  <label className="label_fontbld">
                    {filterListTransfer?.segments?.field_text}
                  </label>
                  <>
                    <div className="chckbx_flex">
                      {filterListTransfer?.segments?.options
                        .slice(0, visibleItems.segments)
                        .map((item, i) => (
                          <div key={i}>
                            <div className="fil-chk">
                              <input
                                type="checkbox"
                                id={`segments-${i}`}
                                name="segments"
                                value={item?.value}
                                checked={values?.segments?.includes(item.value)}
                                onChange={handleCheckboxChangeSegments}
                              />{' '}
                              <label htmlFor={`segments-${i}`}>
                                <span></span>
                                {item.text}
                              </label>
                            </div>
                          </div>
                        ))}
                    </div>

                    <h6
                      onClick={() =>
                        toggleShowMore('segments', filterListTransfer?.segments?.options?.length)
                      }
                      className="showmre_btnnw"
                    >
                      {visibleItems.segments === 5 ? 'Show More' : 'Show Less'}
                    </h6>
                  </>
                </div>
              </div>
              <div className="col-12">
                <hr></hr>
              </div>
            </>
          ) : (
            ''
          )}
          {filterListTransfer?.services && filterListTransfer?.services?.options?.length ? (
            <>
              <div className="col-12">
                <div className="form-group">
                  <label className="label_fontbld">
                    {filterListTransfer?.services?.field_text}
                  </label>
                  <>
                    <div className="chckbx_flex">
                      {filterListTransfer?.services?.options
                        .slice(0, visibleItems.services)
                        .map((item, i) => (
                          <div key={i}>
                            <div className="fil-chk">
                              <input
                                type="checkbox"
                                id={`services-${i}`}
                                name="services"
                                value={item?.value}
                                checked={values?.services?.includes(item.value)}
                                onChange={handleCheckboxChangeServices}
                              />{' '}
                              <label htmlFor={`services-${i}`}>
                                <span></span>
                                {item.text}
                              </label>
                            </div>
                          </div>
                        ))}
                    </div>

                    <h6
                      onClick={() =>
                        toggleShowMore('services', filterListTransfer?.services?.options?.length)
                      }
                      className="showmre_btnnw"
                    >
                      {visibleItems.services === 5 ? 'Show More' : 'Show Less'}
                    </h6>
                  </>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="justifycontentcenter">
                    <hr></hr>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ''
          )}
        </div>
      </DialogContent>

      <DialogActions className="newfltrtwobtnbx">
        <Button
          className="btn filter_nwwbtn1"
          onClick={() => {
            setFieldValue('preferred_car_model', '');
            setFieldValue('preferred_classes', '');
            setFieldValue('preferred_type', '');
            setFieldValue('sort_by_price', '');
            setFieldValue('segments', '');
            setFieldValue('services', '');
            setStoreFliterObj(null);
            handleSubmitFilter({}, true);
            // delete router.query?.filter;
            // router.push(
            //   {
            //     pathname: "/travel/transfers/listing",
            //     query: router.query,
            //   },
            //   undefined,
            //   { shallow: false }
            // );
            // dispatch({
            //   type: "FILTER_TRANSFER_TOGGLE",
            //   payload: false,
            // });
          }}
          disabled={isLoadingBtnClear}
        >
          {isLoadingBtnClear ? 'Loading' : 'Clear All'}
        </Button>
        <Button className="btn filter_nwwbtn2" type="submit" disabled={isLoadingBtnApply}>
          {isLoadingBtnApply ? 'Loading...' : 'Apply Filter'}
        </Button>
      </DialogActions>
    </>
  );
};

export default FilterForm;
