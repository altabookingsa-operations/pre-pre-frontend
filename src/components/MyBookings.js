import React, { useState, useContext } from 'react';
import { Context } from '../context/index';
// import { animateScroll as scroll } from 'react-scroll';
// import { roundOff } from '../utils/commonUtil';
import Cart from './Cart.js';
import Moment from 'moment';
// import MyBookingsTransfer from './MyBookingsTransfer';
// import MyBookingsCar from './MyBookingsCar';
// import MyBookingsTrain from './MyBookingsTrain';
// import MyBookingsFerries from './MyBookingsFerries';
// import MyBookingsHotel from './MyBookingsHotel';
// import MyBookingsFlight from './MyBookingsFlight';
// import MyBookingsTourNactivites from './MyBookingTourNactivites';
// import MyBookingsBeauty from './MyBookingsBeauty';
// import MyBookingsHomeService from './MyBookingsHomeService';
// import MyBookingsMeetGreet from './MyBookingsMeetGreet';
// import MyBookingsAirportTransfer from './MyBookingAirportTransfer';
// import MyBookingsEvents from './MyBookingEvents';
// import MyBookingsBus from './MyBookingsBus';
const MyBookings = ({ cartData }) => {
  const { state, dispatch } = useContext(Context);
  const cart = cartData;

  let symbol = '';
  let total = 0;
  let arrStartDates = cart.map(a =>
    a.type === 'hotel'
      ? Moment(a.object.checkin_date)
      : a.type === 'ferries'
        ? Moment(a.object?.legs[0].departureDateTime)
        : a.type === 'flight'
          ? Moment(a.headerObj.departureDate)
          : a.type === 'trains'
            ? Moment(a.headerObj.departureDate)
            : a.type === 'tourNactivities'
              ? Moment(a?.selectedOperationDates?.from)
              : a.type === 'xs2events'
                ? Moment(a?.from_date)
                : a.type === 'beauty'
                  ? Moment(a?.beautyDetails?.selectDate)
                  : a.type === 'home-service'
                    ? Moment(a?.homeDetails?.selectDate)
                    : a.type === 'meetAndGreet'
                      ? Moment(a?.header?.date)
                      : a.type === 'car'
                        ? Moment(a?.object?.pickup_date_time)
                        : a.type === 'bus'
                          ? Moment(a?.header?.departureDate)
                          : Moment(a.pickUpDate)
  );
  let arrEndDates = cart.map(a =>
    a.type === 'hotel'
      ? Moment(a.object.checkout_date)
      : a.type === 'ferries'
        ? Moment(a.object?.legs[0].arrivalDateTime)
        : a.type === 'flight'
          ? Moment(a.headerObj.returnDate ? a.headerObj.returnDate : a.headerObj.departureDate)
          : a.type === 'trains'
            ? Moment(a.headerObj.returnDate ? a.headerObj.returnDate : a.headerObj.departureDate)
            : a.type === 'tourNactivities'
              ? Moment(a?.selectedOperationDates?.to)
              : a.type === 'xs2events'
                ? Moment(a?.to_date)
                : a.type === 'beauty'
                  ? Moment(a?.beautyDetails?.selectDate)
                  : a.type === 'home-service'
                    ? Moment(a?.homeDetails?.selectDate)
                    : a.type === 'meetAndGreet'
                      ? Moment(a?.header?.date)
                      : a.type === 'car'
                        ? Moment(a?.object?.drop_date_time)
                        : a.type === 'bus'
                          ? Moment(
                              a?.header?.returnDate
                                ? a?.header?.returnDate
                                : a?.header?.departureDate
                            )
                          : Moment(a.dropOffDate)
  );
  let minDate = Moment.min(arrStartDates);
  let maxDate = Moment.max(arrEndDates);

  return (
    <div
      className="new-transfer-suggestion-my-booking "
      style={{
        backgroundImage: 'url(/images/transfer-suggestion-my-booking-back.jpg)',
      }}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-6 offset-lg-3 pl-lg-0 pr-lg-0">
            <div className="my-booking-transfer-hd-new">
              <h3>My Bookings</h3>
              <h4>
                {Moment(minDate).format('ddd D MMM yyyy')} -{' '}
                {Moment(maxDate).format('ddd D MMM yyyy')}
              </h4>
            </div>
            {/* {cart.filter(i => i.type == 'transfer').length > 0 && (
              <MyBookingsTransfer cart={cart.filter(i => i.type == 'transfer')} />
            )}
            {cart.filter(i => i.type == 'airport-transfer').length > 0 && (
              <MyBookingsAirportTransfer cart={cart.filter(i => i.type == 'airport-transfer')} />
            )}
            {cart.filter(i => i.type == 'beauty').length > 0 && (
              <MyBookingsBeauty cart={cart.filter(i => i.type == 'beauty')} />
            )}{' '}
            {cart.filter(i => i.type == 'home-service').length > 0 && (
              <MyBookingsHomeService cart={cart.filter(i => i.type == 'home-service')} />
            )}
            {cart.filter(i => i.type == 'car').length > 0 && (
              <MyBookingsCar cart={cart.filter(i => i.type == 'car')} />
            )}
            {cart.filter(i => i.type == 'trains').length > 0 && (
              <MyBookingsTrain cart={cart.filter(i => i.type == 'trains')} />
            )}
            {cart.filter(i => i.type == 'ferries').length > 0 && (
              <MyBookingsFerries cart={cart.filter(i => i.type == 'ferries')} />
            )}{' '}
            {cart.filter(i => i.type == 'hotel').length > 0 && (
              <MyBookingsHotel cart={cart.filter(i => i.type == 'hotel')} />
            )}
            {cart.filter(i => i.type == 'flight').length > 0 && (
              <MyBookingsFlight cart={cart.filter(i => i.type == 'flight')} />
            )}
            {cart.filter(i => i.type == 'tourNactivities').length > 0 && (
              <MyBookingsTourNactivites cart={cart.filter(i => i.type == 'tourNactivities')} />
            )}{' '}
            {cart.filter(i => i.type == 'xs2events').length > 0 && (
              <MyBookingsEvents cart={cart.filter(i => i.type == 'xs2events')} />
            )}
            {cart.filter(i => i.type == 'bus').length > 0 && (
              <MyBookingsBus cart={cart.filter(i => i.type == 'bus')} />
            )}
            {cart.filter(i => i.type == 'meetAndGreet').length > 0 && (
              <MyBookingsMeetGreet cart={cart.filter(i => i.type == 'meetAndGreet')} />
            )} */}
          </div>

          <div className="col-xl-3 pr-xl-0 d-flex align-items-stretch">
            <div className="trnsfer-cart-right-bx">
              {cartData.length > 0 && <Cart cartData={cartData} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBookings;
