import { Field, Form } from 'formik';
import getMonth from 'date-fns/getMonth';
import getYear from 'date-fns/getYear';
import DatePicker from 'react-datepicker';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';

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

const OnewayForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  adultNo,
  childNo,
  infantNo,
  popup,
  setPopup,
  incrementCount,
  decrementCount,
  startDate,
  years,
  setpickUpDate,
  setAdultNo,
  setChildNo,
}) => {
  return (
    <Form autoComplete="off" id="transferLandingOneWay">
      <div className="row ferriesLandingForm">
        {/* Flight Number */}
        <div className="col-lg-12">
          <div className="form-group">
            <label>Flight Number</label>
            <Field
              name="flightNo"
              type="text"
              className="form-control query-input"
              placeholder="Flight Number"
              value={values.flightNo}
              onChange={e => {
                setFieldValue('flightNo', e.target.value.toUpperCase());
              }}
            />
            {touched.flightNo && errors.flightNo ? (
              <div style={{ marginTop: '6px' }}>
                <span style={{ color: 'red' }}>{errors.flightNo}</span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Departure Date */}
        <div className="col-lg-4">
          <div className="form-group">
            <label>Departure Date</label>
            <div className="frm-new-icon-box-all">
              <img src="/images/calender.png" alt="" />
              {/* <DatePicker
                className="form-control"
                placeholderText="Departure Date"
                calendarStartDay={1}
                renderCustomHeader={({
                  date,
                  changeYear,
                  changeMonth,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div className="datepicker-custom-bx">
                    <div className="datepicker-custom-header">
                      <button
                        type="button"
                        className="cstm-date-btn1"
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                      >
                        <IoIosArrowDropleft className="datePickerArrowIcon" />
                      </button>

                      <div className="cstm-select-start">
                        <Field
                          as="select"
                          value={months[getMonth(date)]}
                          onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                          className="cstm-date-select"
                        >
                          {months.map(option => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>

                        <Field
                          as="select"
                          value={getYear(date)}
                          onChange={({ target: { value } }) => changeYear(Number(value))}
                          className="cstm-date-select"
                        >
                          {years.map(option => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                      </div>

                      <button
                        type="button"
                        className="cstm-date-btn2"
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                      >
                        <IoIosArrowDropright className="datePickerArrowIcon" />
                      </button>
                    </div>
                  </div>
                )}
                calendarClassName="rastaStripesCalendat"
                id="pickUpDate"
                name="pickUpDate"
                selected={values.pickUpDate}
                onChange={date => {
                  const CheckInCurrentDate = new Date(date);
                  const checkOutInitialDate = CheckInCurrentDate.setDate(
                    CheckInCurrentDate.getDate() + 7
                  );
                  const endDate = new Date(checkOutInitialDate);

                  setpickUpDate(date);
                  setFieldValue('pickUpDate', date);
                  setFieldValue('dropOffDate', endDate);
                }}
                onBlur={handleBlur}
                locale="gb"
                minDate={new Date()}
                startDate={startDate}
                showDisabledMonthNavigation
                dateFormat="EEE d MMM yyyy"
                value={values.pickUpDate}
                onKeyDown={e => e.preventDefault()}
              /> */}
              <DatePicker
                className="form-control"
                placeholderText="Departure Date"
                calendarStartDay={1}
                renderCustomHeader={({
                  date,
                  changeYear,
                  changeMonth,
                  decreaseMonth,
                  increaseMonth,
                  prevMonthButtonDisabled,
                  nextMonthButtonDisabled,
                }) => (
                  <div className="datepicker-custom-bx">
                    <div className="datepicker-custom-header">
                      <button
                        type="button"
                        className="cstm-date-btn1"
                        onClick={decreaseMonth}
                        disabled={prevMonthButtonDisabled}
                      >
                        <IoIosArrowDropleft className="datePickerArrowIcon" />
                      </button>

                      <div className="cstm-select-start">
                        <Field
                          as="select"
                          value={months[getMonth(date)]}
                          onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
                          className="cstm-date-select"
                        >
                          {months.map(option => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>

                        <Field
                          as="select"
                          value={getYear(date)}
                          onChange={({ target: { value } }) => changeYear(Number(value))}
                          className="cstm-date-select"
                        >
                          {years.map(option => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </Field>
                      </div>

                      <button
                        type="button"
                        className="cstm-date-btn2"
                        onClick={increaseMonth}
                        disabled={nextMonthButtonDisabled}
                      >
                        <IoIosArrowDropright className="datePickerArrowIcon" />
                      </button>
                    </div>
                  </div>
                )}
                calendarClassName="rastaStripesCalendat"
                id="pickUpDate"
                name="pickUpDate"
                selected={values.pickUpDate}
                onChange={date => {
                  setpickUpDate(date);
                  setFieldValue('pickUpDate', date);
                }}
                onBlur={() => setFieldValue('pickUpDate', values.pickUpDate)}
                locale="gb"
                minDate={new Date()}
                showDisabledMonthNavigation
                dateFormat="EEE d MMM yyyy"
                onKeyDown={e => e.preventDefault()}
              />
            </div>
            {touched.pickUpDate && errors.pickUpDate ? (
              <div style={{ marginTop: '6px' }}>
                <span style={{ color: 'red' }}>{errors.pickUpDate}</span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Traveller & Luggage Sections */}
        {/* 👇 KEEP YOUR FULL ORIGINAL JSX HERE (UNCHANGED) */}
        <div className="col-lg-4">
          <div className="form-group home-src-dropdown">
            <label>Traveller(s)</label>
            <div className="dropdown">
              <div className="frm-new-icon-box-all">
                <img src="/images/dropdown-arrow.png" alt="" />
                <button
                  type="button"
                  className="btn dropdown-toggle"
                  onClick={() => setPopup('guestPopup')}
                >
                  <i className="zmdi zmdi-account"></i>
                  <div className="home-srvc-element">
                    <p>
                      <span>{adultNo} Adults</span>
                    </p>
                    <p>
                      <span>{childNo} Child</span>
                    </p>
                    {/* <p>
                            <span>{infantNo} Infant</span>
                          </p> */}
                  </div>
                </button>
              </div>
              {popup === 'guestPopup' && (
                <div className="travelerDetailsPopup-new">
                  <h5>Travellers</h5>
                  <div className="guest-plus-minus-bx">
                    <h6>Adults</h6>
                    <div className="number">
                      <button
                        type="button"
                        className="minus"
                        disabled={adultNo > 1 ? false : true}
                        onClick={() => decrementCount('adult')}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={adultNo}
                        disabled
                        onChange={event => {
                          setAdultNo(parseInt(event.target.value));
                        }}
                      />
                      <button
                        type="button"
                        className="plus"
                        disabled={adultNo < 20 ? false : true}
                        onClick={() => incrementCount('adult')}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="guest-plus-minus-bx">
                    <h6>Children (3-12 yrs.) </h6>
                    <div className="number">
                      <button
                        type="button"
                        className="minus"
                        disabled={childNo > 0 ? false : true}
                        onClick={() => {
                          decrementCount('child');
                        }}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={childNo}
                        disabled
                        onChange={event => {
                          setChildNo(event.target.value);
                        }}
                      />
                      <button
                        type="button"
                        className="plus"
                        disabled={childNo < 6 ? false : true}
                        onClick={() => {
                          incrementCount('child');
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {/* <div className="guest-plus-minus-bx">
                          <h6>Infant (0-2 yrs.) </h6>
                          <div className="number">
                            <button
                              type="button"
                              className="minus"
                              disabled={infantNo > 0 ? false : true}
                              onClick={() => {
                                decrementCount("infant");
                              }}
                            >
                              -
                            </button>
                            <input
                              type="text"
                              value={infantNo}
                              disabled
                              onChange={(event) => {
                                setInfantNo(event.target.value);
                              }}
                            />
                            <button
                              type="button"
                              className="plus"
                              disabled={infantNo < 6 ? false : true}
                              onClick={() => {
                                incrementCount("infant");
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div> */}

                  <div className="guest-select-done-btn">
                    <button
                      type="button"
                      className="btn done-btn"
                      onClick={() => {
                        setPopup('');
                      }}
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="form-group">
            <label>Luggage(s)</label>
            <div className="frm-new-icon-box-all">
              <img src="/images/dropdown-arrow.png" alt="" />
              <Field
                as="select"
                name="luggages"
                value={values.luggages}
                onChange={handleChange}
                onBlur={handleBlur}
                className="form-control"
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </Field>
            </div>
          </div>
        </div>
      </div>

      <div className="hotel-ban-form-submit-btn">
        <button className="btn new-submit-btn" type="submit">
          Submit
        </button>
      </div>
    </Form>
  );
};

export default OnewayForm;
