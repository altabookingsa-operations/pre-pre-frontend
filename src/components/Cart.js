import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../context/index';
// import { animateScroll as scroll } from 'react-scroll';
import { roundOffTwo, roundOff, roundOffTwo2, isStringifiedObject } from '../utils/commonUtil';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import cookieInstance from '../utils/cookieInstance';
import * as constants from '../utils/constants';
const Cart = ({
  handleCartClick,
  taxes,
  isSubmitBtnLoading,
  isMakeSubmitBtnLoading,
  isLoadingCartBtn,
  cartData,
}) => {
  const { state, dispatch } = useContext(Context);
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState({
    single: 0,
    connection: 0,
  });
  const router = useRouter();
  const SELECTED_CURRENCY = cookieInstance.getStorageObj(constants.SELECTED_CURRENCY);
  const currencySymbol = {
    GBP: '£',
    EUR: '€',
    CHF: 'Fr.',
    USD: '$',
  };
  let symbol = '';
  let total = 0;
  const calculatedEventsTicketPrice = tickets => {
    const totalPrice = tickets?.reduce((acc, item) => {
      return acc + item.sale_price * item.quantity;
    }, 0);

    return totalPrice;
  };
  useEffect(() => {
    function removeDuplicates() {
      const data = cartData?.filter((v, i, a) =>
        v.type === 'train'
          ? a.findLastIndex(
              v2 => v2?.selectedTrain?.identifier === v?.selectedTrain?.identifier
            ) === i
          : v.type === 'tourNactivities'
            ? a.findLastIndex(v2 => v2?.object?.identifier === v?.object?.identifier) === i
            : v
      );
      setCart(data);
    }
    // function removeDuplicates() {
    //   const data = state.cart.filter((v, i, a) => {
    //     v.type === "train"
    //       ? a.findLastIndex(
    //           (v2) =>
    //             v2.selectedTrain.identifier === v?.selectedTrain?.identifier
    //         ) === i
    //       : v.type === "tourNactivities"
    //       ? a.findLastIndex(
    //           (v2) =>
    //             v2.selectedTrain.identifier === v?.selectedTrain?.identifier
    //         ) === i
    //       : v;
    //   });
    //   setCart(data);
    // }
    let symbol1 = '';
    let total1 = 0;
    if (cartData) {
      cartData.forEach(element => {
        if (element.type == 'transfer') {
          symbol1 = SELECTED_CURRENCY.currency_symbol;
          total1 = total1 + roundOffTwo(element.object.sell_price);
        } else if (element.type == 'car') {
          symbol1 = element.currencySymbol;
          total1 = total1 + roundOffTwo(element.object.sell_price);
        } else if (element.type == 'ferries') {
          symbol1 = SELECTED_CURRENCY.currency_symbol;
          total1 = total1 + roundOffTwo(element.object.sell_price);
        } else if (element.type == 'trains') {
          symbol1 =
            currencySymbol[
              element.selectedTrain.passengerTypeFareList[0].priceList[0].currency.iso
            ];
          total1 = total1 + roundOffTwo(element.object?.sell_price);
        } else if (element.type == 'hotel') {
          // symbol1 = currencySymbol[element?.object.roomItem?.currency_code];
          symbol1 = SELECTED_CURRENCY.currency_symbol;
          total1 = total1 + roundOffTwo(+element?.object?.sell_price);
        } else if (element.type == 'beauty') {
          symbol1 = element.beautyDetails.service_symbol;
          total1 = total1 + roundOffTwo(element.beautyDetails.service_price);
        } else if (element.type == 'home-service') {
          symbol1 = element.homeDetails.service_symbol;
          total1 = total1 + roundOffTwo(element.homeDetails.service_price);
        } else if (element.type == 'flight') {
          symbol1 =
            currencySymbol[
              element?.selectedFlight?.passengerTypeFareList[0]?.priceList[0]?.currency.iso
            ];
          total1 = total1 + roundOffTwo(element?.object?.sell_price);
        } else if (element.type == 'tourNactivities') {
          symbol1 = SELECTED_CURRENCY.currency_symbol;
          total1 = total1 + roundOffTwo(element.object.sell_price);
        } else if (element.type == 'xs2events') {
          symbol1 = SELECTED_CURRENCY.currency_symbol;
          total1 =
            total1 + roundOffTwo(calculatedEventsTicketPrice(element?.object?.selectedTickets));
        } else if (element.type == 'bus') {
          symbol1 = element.currencySymbol;
          total1 = total1 + roundOffTwo(element?.object?.prices?.[0]?.prices?.sell_price);
        } else if (element.type == 'meetAndGreet') {
          element.connectionChecked.forEach(item => {
            if (
              item.terminalPoint == 'departingFromTerminalPoint' ||
              item.terminalPoint == 'departingToTerminalPoint'
            ) {
              setSubTotal(prev => ({
                ...prev,
                single: prev.single + +item?.price?.price?.value,
              }));
            }
            if (
              item.terminalPoint == 'arrivingFromTerminalPoint' ||
              item.terminalPoint == 'arrivingToTerminalPoint'
            ) {
              setSubTotal(prev => ({
                ...prev,
                connection: prev.connection + +item?.price?.price?.value,
              }));
            }
          });
          symbol1 = currencySymbol[element.connectionChecked[0].price.price.currency];
          total1 = total1 + roundOffTwo(element?.totalPrice);
        }
      });
    }
    if (cartData?.length > 0) {
      var totalTax = 0;

      cartData?.forEach(element => {
        if (element?.object?.taxData) {
          totalTax = totalTax + parseFloat(element?.object?.taxData?.total_tax);
        }
      });
      dispatch({
        type: 'STORE_BOOKING_TOTAL_VALUE',
        payload: {
          totalValue: roundOffTwo(total1 + totalTax),
          currency_symbol: SELECTED_CURRENCY.currency_symbol,
          taxValue: totalTax,
          total: roundOffTwo(total1),
        },
      });
    } else {
      dispatch({
        type: 'STORE_BOOKING_TOTAL_VALUE',
        payload: {
          totalValue: roundOffTwo(total1),
          currency_symbol: SELECTED_CURRENCY.currency_symbol,
          taxValue: totalTax,
          total: roundOffTwo(total1),
        },
      });
    }
    removeDuplicates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartData, taxes, symbol, total, dispatch]);

  const showTotalDOM = () => {
    if (taxes) {
      var totalTax = 0;

      // taxes.forEach((element) => {
      //   if (element.length) {
      //     element.forEach((tax) => {
      //       totalTax = totalTax + parseFloat(tax.amount);
      //     });
      //   }
      // });
      cartData?.forEach(element => {
        if (element?.object?.taxData) {
          totalTax = totalTax + parseFloat(element?.object?.taxData?.total_tax);
        }
      });
      // setTotalPaymentValue(roundOffTwo(total + totalTax));
      return (
        <table className="trnsfer-cart-transferprice-option-start-new">
          {/* <tr style={{ borderBottom: "1px solid #c8cbcb" }}>
            <td>Price</td>
            <td className="trnsfer-cart-price">
              {symbol}
              {roundOffTwo2(total + totalTax)}
            </td>
          </tr> */}

          <tr style={{ borderBottom: '1px solid #c8cbcb' }}>
            <td>Base Price</td>
            <td className="trnsfer-cart-price">
              {SELECTED_CURRENCY?.symbol === 'CHF' ? 'Fr.' : SELECTED_CURRENCY?.symbol}
              {roundOffTwo2(total)}
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid #c8cbcb' }}>
            <td>Total Tax</td>
            <td className="trnsfer-cart-price">
              {SELECTED_CURRENCY?.symbol === 'CHF' ? 'Fr.' : SELECTED_CURRENCY?.symbol}
              {roundOffTwo2(totalTax)}
            </td>
          </tr>

          <tr>
            <td>Total Cost</td>
            <td className="trnsfer-cart-price">
              {symbol !== ''
                ? SELECTED_CURRENCY?.symbol === 'CHF'
                  ? 'Fr.'
                  : SELECTED_CURRENCY?.symbol
                : symbol}
              <span id="spn">{roundOffTwo2(total + totalTax)}</span>
            </td>
          </tr>
        </table>
      );
    } else {
      // setTotalPaymentValue(roundOffTwo(total));
      return (
        <tr>
          <td>Total Cost</td>
          <td className="trnsfer-cart-price">
            {symbol !== ''
              ? SELECTED_CURRENCY?.symbol === 'CHF'
                ? 'Fr.'
                : SELECTED_CURRENCY?.symbol
              : symbol}
            <span id="spn">{roundOffTwo2(total)}</span>
          </td>
        </tr>
      );
    }
  };

  return (
    <div className="trnsfer-cart-transfer-summary-bx">
      <h4>
        Booking Summary
        <img
          src="/images/information-icon.png"
          className="information-icon-new22"
          data-toggle="modal"
          data-target="#mobile-sugg-pro-show-details-modal2"
          alt=""
        />
      </h4>
      <div className="trnsfer-cart-transfer-summary-hd-new-2">
        {cart?.map((item, i) => {
          return (
            <h5 key={i}>
              {item.type === 'hotel' ? (
                <>
                  {item?.object?.location} (
                  {moment(item?.object?.checkin_date).format('ddd D MMM yyyy')} -{' '}
                  {moment(item?.object?.checkout_date).format('ddd D MMM yyyy')} )
                </>
              ) : item.type === 'ferries' ? (
                <>
                  {item?.object?.legs[0].departurePortName} to {` `}
                  {item?.object?.legs[0].arrivalPortName} (
                  {moment(item?.object?.legs[0].departureDateTime).format('ddd D MMM yyyy')} -
                  {moment(item?.object?.legs[0].arrivalDateTime).format('ddd D MMM yyyy')} )
                </>
              ) : item.type === 'trains' ? (
                <>
                  {item?.headerObj.fromLocationIata} to {` `}
                  {item?.headerObj?.toLocationIata} (
                  {moment(item?.headerObj?.departureDate).format('ddd D MMM yyyy')} -{' '}
                  {moment(item?.headerObj?.returnDate).format('ddd D MMM yyyy')})
                </>
              ) : item.type === 'flight' ? (
                <>
                  {item?.headerObj.fromLocation} to {` `}
                  {item?.headerObj.toLocation} (
                  {moment(item?.headerObj.departureDate).format('ddd D MMM yyyy')})
                </>
              ) : item.type === 'tourNactivities' ? (
                <>
                  {isStringifiedObject(item?.country)
                    ? JSON.parse(item?.country)?.name
                    : item?.country}
                  ,{` `}
                  {/* {console.log("iuytrtyui", JSON.parse(item?.country))} */}
                  {item?.destination_name} (
                  {moment(item?.selectedOperationDates?.from).format('ddd D MMM yyyy')} -{' '}
                  {moment(item?.selectedOperationDates?.to).format('ddd D MMM yyyy')})
                </>
              ) : item.type === 'meetAndGreet' ? (
                <>Meet & Greet ({moment(item.header.date).format('ddd D MMM yyyy')})</>
              ) : item.type === 'car' ? (
                <>
                  {item?.pickUpLocation} to {item?.dropLocation} (
                  {moment(item?.object?.pickup_date_time).format('ddd D MMM yyyy')} -{' '}
                  {moment(item?.object?.drop_date_time).format('ddd D MMM yyyy')})
                </>
              ) : item.type === 'xs2events' ? (
                <>
                  {item?.object?.event_name}({moment(item?.from_date).format('ddd D MMM yyyy')} -{' '}
                  {moment(item?.to_date).format('ddd D MMM yyyy')})
                </>
              ) : item.type === 'bus' ? (
                <>
                  {item?.object?.header?.fromLocation} to {item?.object?.header?.toLocation} (
                  {moment(item?.object?.segments?.[0]?.departure_time?.timestamp).format(
                    'ddd D MMM yyyy'
                  )}{' '}
                  -{' '}
                  {moment(item?.object?.segments?.[0]?.arrival_time?.timestamp).format(
                    'ddd D MMM yyyy'
                  )}
                  )
                </>
              ) : (
                <>
                  {item.object?.header?.fromLocation} (
                  {moment(item?.object?.segments?.[0]?.departure_time?.timestamp).format(
                    'ddd D MMM yyyy'
                  )}{' '}
                  -{' '}
                  {moment(item?.object?.segments?.[0]?.arrival_time?.timestamp).format(
                    'ddd D MMM yyyy'
                  )}
                  )
                </>
              )}
            </h5>
          );
        })}
      </div>

      <div className="trnsfer-cart-transferprice-option">
        <table>
          <tbody>
            {cart?.map((item, i) => {
              if (item.type == 'transfer') {
                symbol = SELECTED_CURRENCY?.symbol === 'CHF' ? 'Fr.' : SELECTED_CURRENCY?.symbol;
                total = total + roundOffTwo(item.object.sell_price);
                return (
                  <tr key={i}>
                    <td>Transfer {i + 1}</td>
                    <td className="trnsfer-cart-price">
                      {SELECTED_CURRENCY?.symbol === 'CHF' ? 'Fr.' : SELECTED_CURRENCY?.symbol}
                      {roundOffTwo2(item.object.sell_price)}
                    </td>
                  </tr>
                );
              } else if (item.type == 'airport-transfer') {
                symbol = SELECTED_CURRENCY?.symbol === 'CHF' ? 'Fr.' : SELECTED_CURRENCY?.symbol;
                total = total + roundOffTwo(item.object.sell_price);
                return (
                  <tr key={i}>
                    <td>Airport Transfers {i + 1}</td>
                    <td className="trnsfer-cart-price">
                      {SELECTED_CURRENCY?.symbol === 'CHF' ? 'Fr.' : SELECTED_CURRENCY?.symbol}
                      {roundOffTwo2(item.object.sell_price)}
                    </td>
                  </tr>
                );
              } else if (item.type == 'car') {
                symbol = item.currencySymbol;
                total = total + roundOffTwo(item.object.sell_price);
                return (
                  <tr key={i}>
                    <td>Car Rentals {i + 1}</td>
                    <td className="trnsfer-cart-price">
                      {SELECTED_CURRENCY?.symbol === 'CHF' ? 'Fr.' : SELECTED_CURRENCY?.symbol}
                      {roundOffTwo2(item.object.sell_price)}
                    </td>
                  </tr>
                );
              } else if (item.type == 'bus') {
                symbol = SELECTED_CURRENCY?.symbol === 'CHF' ? 'Fr.' : SELECTED_CURRENCY?.symbol;
                total = total + roundOffTwo(item.object.prices?.[0]?.prices?.sell_price);
                return (
                  <tr key={i}>
                    <td>Bus {i + 1}</td>
                    <td className="trnsfer-cart-price">
                      {SELECTED_CURRENCY?.symbol === 'CHF' ? 'Fr.' : SELECTED_CURRENCY?.symbol}
                      {roundOffTwo2(item.object.prices?.[0]?.prices?.sell_price)}
                    </td>
                  </tr>
                );
              } else if (item.type == 'trains') {
                symbol =
                  currencySymbol[
                    item.selectedTrain.passengerTypeFareList[0].priceList[0].currency.iso
                  ];
                total = total + roundOffTwo(item?.object?.sell_price);
                return (
                  <tr key={i}>
                    <td>Train {i + 1}</td>
                    <td className="trnsfer-cart-price">
                      {symbol !== ''
                        ? SELECTED_CURRENCY?.symbol === 'CHF'
                          ? 'Fr.'
                          : SELECTED_CURRENCY?.symbol
                        : symbol}
                      {roundOffTwo2(item?.object?.sell_price)}
                    </td>
                  </tr>
                );
              } else if (item.type == 'hotel') {
                // symbol = currencySymbol[item?.object.roomItem?.currency_code];
                // console.log("🚀 ~ {cart.map ~ item?.object.roomItem:", item?.object.roomItem)
                symbol = SELECTED_CURRENCY?.symbol === 'CHF' ? 'Fr.' : SELECTED_CURRENCY?.symbol;
                total =
                  total +
                  // roundOffTwo(item.object.roomItem.total_offer_price_float);
                  roundOffTwo(item?.object?.sell_price);
                return (
                  <tr key={i}>
                    <td>
                      Hotel {i + 1} ( {item?.object?.roomItem?.RoomTypes?.RoomType?.RoomType} room)
                    </td>
                    <td className="trnsfer-cart-price">
                      {/* {item.currencySymbol} */}
                      {SELECTED_CURRENCY?.symbol === 'CHF' ? 'Fr.' : SELECTED_CURRENCY?.symbol}
                      {roundOffTwo2(item?.object?.sell_price)}
                    </td>
                  </tr>
                );
              } else if (item.type == 'beauty') {
                symbol = item.beautyDetails.service_symbol;
                total = total + roundOffTwo(item.beautyDetails.service_price);
                return (
                  <tr key={i}>
                    <td>
                      Beauty & wellness {i + 1} ( {item?.beautyDetails?.service_name})
                    </td>
                    <td className="trnsfer-cart-price">
                      {/* {item.beautyDetails.service_symbol} */}
                      {SELECTED_CURRENCY?.symbol === 'CHF' ? 'Fr.' : SELECTED_CURRENCY?.symbol}
                      {roundOffTwo(item.beautyDetails.service_price)}
                    </td>
                  </tr>
                );
              } else if (item.type == 'home-service') {
                symbol = item.homeDetails.service_symbol;
                total = total + roundOffTwo(item.homeDetails.service_price);
                return (
                  <tr key={i}>
                    <td>
                      Home Services {i + 1} ( {item?.homeDetails?.service_name})
                    </td>
                    <td className="trnsfer-cart-price">
                      {/* {item.homeDetails.service_symbol} */}
                      {SELECTED_CURRENCY?.symbol === 'CHF' ? 'Fr.' : SELECTED_CURRENCY?.symbol}
                      {roundOffTwo(item.homeDetails.service_price)}
                    </td>
                  </tr>
                );
              } else if (item.type == 'ferries') {
                symbol = item.object.currency_symbol;
                total = total + roundOffTwo(item.object.sell_price);
                return (
                  <tr key={i}>
                    <td>Ferries {i + 1}</td>
                    <td className="trnsfer-cart-price">
                      {SELECTED_CURRENCY?.symbol === 'CHF' ? 'Fr.' : SELECTED_CURRENCY?.symbol}
                      {roundOffTwo2(item.object.sell_price)}
                    </td>
                  </tr>
                );
              } else if (item.type == 'flight') {
                symbol =
                  currencySymbol[
                    item?.selectedFlight?.passengerTypeFareList[0]?.priceList[0]?.currency.iso
                  ];
                total =
                  total +
                  roundOffTwo(
                    Number(item?.object?.sell_price) + Number(item?.object?.calculated_tax_flight)
                  );
                return (
                  <tr key={i}>
                    <td>Flight {i + 1}</td>
                    <td className="trnsfer-cart-price">
                      {symbol !== ''
                        ? SELECTED_CURRENCY?.symbol === 'CHF'
                          ? 'Fr.'
                          : SELECTED_CURRENCY?.symbol
                        : symbol}
                      {roundOffTwo2(
                        Number(item?.object?.sell_price) +
                          Number(item?.object?.calculated_tax_flight)
                      )}
                    </td>
                  </tr>
                );
              } else if (item.type == 'tourNactivities') {
                symbol = item.object.currency_symbol;
                total = total + roundOffTwo(Number(item.object.sell_price));
                return (
                  <tr key={i}>
                    <td>Tours & Activities {i + 1}</td>
                    <td className="trnsfer-cart-price">
                      {SELECTED_CURRENCY?.symbol === 'CHF' ? 'Fr.' : SELECTED_CURRENCY?.symbol}
                      {roundOffTwo2(Number(item.object.sell_price))}
                    </td>
                  </tr>
                );
              } else if (item.type == 'xs2events') {
                symbol = item.currency_symbol;
                total =
                  total + roundOffTwo(calculatedEventsTicketPrice(item?.object?.selectedTickets));
                return (
                  <tr key={i}>
                    <td>Events {i + 1}</td>
                    <td className="trnsfer-cart-price">
                      {SELECTED_CURRENCY?.symbol === 'CHF' ? 'Fr.' : SELECTED_CURRENCY?.symbol}
                      {roundOffTwo2(
                        Number(calculatedEventsTicketPrice(item?.object?.selectedTickets))
                      )}
                    </td>
                  </tr>
                );
              } else if (item.type == 'meetAndGreet') {
                symbol = currencySymbol[item.connectionChecked[0].price.price.currency];
                total = total + roundOffTwo(item?.totalPrice);
                return (
                  <tr key={i}>
                    <div
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <td>
                        Meet & Greet {i + 1}{' '}
                        <img
                          src="/images/information-icon.png"
                          data-toggle="modal"
                          data-target="#desktop-meet-greet-booking-modal"
                          alt="info-icon"
                        />
                      </td>
                    </div>

                    <td className="trnsfer-cart-price">
                      {symbol !== ''
                        ? SELECTED_CURRENCY?.symbol === 'CHF'
                          ? 'Fr.'
                          : SELECTED_CURRENCY?.symbol
                        : symbol}
                      {roundOffTwo2(item?.totalPrice)}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
      <div className="trnsfer-cart-transferprice-option">
        <table>
          <tbody>{showTotalDOM()}</tbody>
        </table>
      </div>
      {/**
       *  @for security this button is off now.
       *
       */}
      {/* {tempForHideBtn === true ? (
        <></>
      ) : (
        <>
          <button
            type="button"
            className="btn new-btntransfer"
            disabled={isSubmitBtnLoading}
            onClick={() => {
              if (handleCartClick) {
                handleCartClick();
              } else {
                router.push(
                  {
                    pathname: "/travel/booking",
                  },
                  undefined,
                  { shallow: false }
                );
              }
            }}
          >
            {isSubmitBtnLoading ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden"></span>
              </div>
            ) : (
              "Confirm Booking"
            )}
          </button>
        </>
      )} */}
      <button
        type="button"
        className={`btn new-btntransfer ${isLoadingCartBtn ? 'new-btntransfer-disabled' : ''}`}
        // style={{cursor: !isLoadingCartBtn ?"pointer":"none"}}
        // disabled={isLoadingCartBtn}
        // disabled={isMakeSubmitBtnLoading}
        onClick={() => {
          // if (handleCartClick) {
          //   handleCartClick();
          //   // alert("We are working on it!");
          //   // console.log("here log");
          //   // openPaymentWindow();
          //   // makePayemntPage();
          // } else {
          //   router.push(
          //     {
          //       pathname: "/travel/booking",
          //     },
          //     undefined,
          //     { shallow: false }
          //   );
          //   // router.push(
          //   //   {
          //   //     pathname: "/travel/booking/cart-modal",
          //   //   },
          //   //   undefined,
          //   //   { shallow: false }
          //   // );
          // }
          router.push(
            {
              pathname: '/travel/booking',
            },
            undefined,
            { shallow: false }
          );
        }}
      >
        {isMakeSubmitBtnLoading ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden"></span>
          </div>
        ) : (
          'Proceed to Book'
        )}
      </button>
      {/**
       *  @for security this button is off now.
       *
       */}
      {/* Modal */}
      <div className="modal fade" id="mobile-sugg-pro-show-details-modal2">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                ×
              </button>
            </div>
            <div className="modal-body">
              <h4>Booking Summary</h4>
              {cart &&
                cart?.map((item, i) => {
                  if (item.type === 'car') {
                    return (
                      <div key={i} className="mt-2">
                        <p>
                          Car Rentals {i + 1} : {item.pickUpLocation}(
                          {moment(item?.object?.pickup_date_time).format('ddd D MMM yyyy')}) -{' '}
                          {item.dropLocation}(
                          {moment(item?.object?.drop_date_time).format('ddd D MMM yyyy')}
                          ) <br />
                        </p>
                      </div>
                    );
                  }
                  if (item.type === 'bus') {
                    return (
                      <div key={i} className="mt-2">
                        <p>
                          Bus {i + 1} : {item?.object?.header?.fromLocation}(
                          {moment(item?.object?.segments?.[0]?.departure_time?.timestamp).format(
                            'ddd D MMM yyyy'
                          )}
                          ) - {item.dropLocation}(
                          {moment(item?.object?.segments?.[0]?.arrival_time?.timestamp).format(
                            'ddd D MMM yyyy'
                          )}
                          ) <br />
                        </p>
                      </div>
                    );
                  }
                  if (item.type === 'transfer') {
                    return (
                      <div key={i} className="mt-2">
                        <p>
                          Transfer {i + 1} : {item.pickUpLocation}({item.pickUpDate}) -{' '}
                          {item.dropLocation}({item.dropOffDate}) <br />
                        </p>
                      </div>
                    );
                  }
                  if (item.type === 'airport-transfer') {
                    return (
                      <div key={i} className="mt-2">
                        <p>
                          Airport Transfers {i + 1} : {item.pickUpLocation}({item.pickUpDate}) -{' '}
                          {item.dropLocation}({item.dropOffDate}) <br />
                        </p>
                      </div>
                    );
                  }
                  if (item.type === 'trains') {
                    return (
                      <div key={i} className="mt-2">
                        <p>
                          {`Train ${i + 1} : ${item?.headerObj.fromLocationIata} (
                          ${moment(item?.headerObj?.departureDate).format('ddd D MMM yyyy')}
                          ) - ${item?.headerObj?.toLocationIata} (
                          ${moment(item?.headerObj?.returnDate).format('ddd D MMM yyyy')}
                          )`}
                          <br />
                        </p>
                      </div>
                    );
                  }
                  if (item.type === 'ferries') {
                    return (
                      <div key={i} className="mt-2">
                        <p>
                          Ferries {i + 1} :
                          {item?.object.legs?.length > 0
                            ? item?.object.legs[0]?.operator?.name
                            : 'NA'}{' '}
                          ({item?.object.legs?.length && item.object?.legs[0]?.routeName}
                          )
                          <br />
                          {moment(item.object.legs[0]?.departureDateTime).format('ddd D MMM yyyy')}-
                          {moment(item.object.legs[0]?.arrivalDateTime).format('ddd D MMM yyyy')}{' '}
                          <br />
                        </p>
                      </div>
                    );
                  }
                  if (item.type === 'flight') {
                    return (
                      <>
                        <div className="mt-2">
                          <p>
                            Flight {i + 1} : {item?.selectedFlight?.validatingAirline.name} (
                            {moment(item?.headerObj?.departureDate).format('ddd D MMM yyyy')}
                            ) <br />
                          </p>
                        </div>
                      </>
                    );
                  }
                  if (item.type === 'hotel') {
                    return (
                      <div key={i} className="mt-2">
                        <p>
                          Hotel {i + 1} : {item.object.hotel_name} (
                          {moment(item.object?.checkin_date).format('ddd D MMM yyyy')}) - (
                          {moment(item.object?.checkout_date).format('ddd D MMM yyyy')}
                          ) <br />
                        </p>
                      </div>
                    );
                  }
                  if (item.type === 'beauty') {
                    return (
                      <div key={i} className="mt-2">
                        <p>
                          Beauty & wellness {i + 1} : {item.beautyDetails.name} (
                          {moment(item.beautyDetails?.booking_time).format('ddd D MMM yyyy')}
                          ) <br />
                        </p>
                      </div>
                    );
                  }
                  if (item.type === 'home-service') {
                    return (
                      <div key={i} className="mt-2">
                        <p>
                          Home Services {i + 1} : {item.homeDetails.name} (
                          {moment(item.homeDetails?.booking_time).format('ddd D MMM yyyy')}
                          ) <br />
                        </p>
                      </div>
                    );
                  }
                  if (item.type === 'tourNactivities') {
                    return (
                      <div key={i} className="mt-2">
                        <p>
                          Tours & Activities {i + 1} : {item?.object?.location} (
                          {moment(item.selectedOperationDates?.from).format('ddd D MMM yyyy')}) - (
                          {moment(item.selectedOperationDates?.to).format('ddd D MMM yyyy')}
                          ) <br />
                        </p>
                      </div>
                    );
                  }
                  if (item.type === 'xs2events') {
                    return (
                      <div key={i} className="mt-2">
                        <p>
                          Events {i + 1} : {item?.object?.event_name} (
                          {moment(item?.from_date).format('ddd D MMM yyyy')}) - (
                          {moment(item?.to_date).format('ddd D MMM yyyy')}
                          ) <br />
                        </p>
                      </div>
                    );
                  }
                  if (item.type === 'meetAndGreet') {
                    return (
                      <div key={i} className="mt-2">
                        <p>
                          Meet & Greet {i + 1} : (
                          {moment(item.header?.date).format('ddd D MMM yyyy')})
                        </p>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </div>
      {/* Modal */}

      {/* Modal Meet&greet */}
      <div className="modal fade" id="desktop-meet-greet-booking-modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="meet-greet-popup-box-start">
                <h3>Meet & Greet Summary</h3>
                {cart
                  ?.filter((item, i) => item.type == 'meetAndGreet')
                  ?.map((item, i) => {
                    return (
                      <div key={i}>
                        <div id="accordion" className="accordion">
                          <div className="card">
                            <div
                              className="card-header collapsed"
                              data-toggle="collapse"
                              href="#collapseOne-popup"
                            >
                              <a className="card-title">
                                <h4>{JSON.parse(item?.header?.flights)[0]?.flight_no}</h4>
                                <h5>
                                  <span>{item?.header?.departingFrom}</span>
                                  <img src="/images/white-new-arrow.png" />
                                  <span>{item?.header?.departingTo}</span>
                                </h5>
                              </a>
                            </div>
                            <div
                              id="collapseOne-popup"
                              className="card-body collapse"
                              data-parent="#accordion"
                            >
                              <div className="meet-greet-pop-cntnt-bx">
                                <div className="table-responsive">
                                  <table>
                                    {item.connectionChecked.filter(
                                      connection =>
                                        connection.terminalPoint == 'departingFromTerminalPoint'
                                    ).length > 0 && (
                                      <tr>
                                        <th>Services At {item?.header?.departingFrom}</th>
                                        <th>Cost</th>
                                      </tr>
                                    )}
                                    {item.connectionChecked.map((connection, i) => {
                                      return (
                                        connection?.terminalPoint ==
                                          'departingFromTerminalPoint' && (
                                          <tr key={i}>
                                            <td>{connection?.object?.service_name}</td>
                                            <th>
                                              {currencySymbol[connection?.price?.price?.currency]}{' '}
                                              {connection?.price?.price?.value}
                                            </th>
                                          </tr>
                                        )
                                      );
                                    })}

                                    {item.connectionChecked.filter(
                                      connection =>
                                        connection.terminalPoint == 'departingToTerminalPoint'
                                    ).length > 0 && (
                                      <tr>
                                        <th>Services At {item?.header?.departingTo}</th>
                                        <th>Cost</th>
                                      </tr>
                                    )}
                                    {item.connectionChecked.map((connection, i) => {
                                      return (
                                        connection?.terminalPoint == 'departingToTerminalPoint' && (
                                          <tr key={i}>
                                            <td>{connection?.object?.service_name}</td>
                                            <th>
                                              {currencySymbol[connection?.price?.price?.currency]}{' '}
                                              {connection?.price?.price?.value}
                                            </th>
                                          </tr>
                                        )
                                      );
                                    })}
                                    <tr>
                                      <td>Sub Total</td>
                                      <td>
                                        {
                                          currencySymbol[
                                            item.connectionChecked[0].price.price.currency
                                          ]
                                        }{' '}
                                        {parseFloat(subTotal.single).toFixed(2)}
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                          {item.header.travelType === 'connection' && (
                            <>
                              <div className="meet-greet-cnct-srvc">
                                <p>Connection Service</p>
                              </div>

                              <div className="card">
                                <div
                                  className="card-header collapsed"
                                  data-toggle="collapse"
                                  data-parent="#accordion"
                                  href="#collapseTwo-popup"
                                >
                                  <a className="card-title">
                                    <h4>{JSON.parse(item?.header?.flights)[1]?.flight_no}</h4>
                                    <h5>
                                      <span>{item?.header?.arrivingFrom}</span>
                                      <img src="/images/white-new-arrow.png" />
                                      <span>{item?.header?.arrivingTo}</span>
                                    </h5>
                                  </a>
                                </div>
                                <div
                                  id="collapseTwo-popup"
                                  className="card-body collapse"
                                  data-parent="#accordion"
                                >
                                  <div className="meet-greet-pop-cntnt-bx">
                                    <div className="table-responsive">
                                      <table>
                                        {item.connectionChecked.filter(
                                          connection =>
                                            connection.terminalPoint == 'arrivingFromTerminalPoint'
                                        ).length > 0 && (
                                          <tr>
                                            <th>Services At {item?.header?.departingFrom}</th>
                                            <th>Cost</th>
                                          </tr>
                                        )}
                                        {item.connectionChecked.map((connection, i) => {
                                          return (
                                            connection?.terminalPoint ==
                                              'arrivingFromTerminalPoint' && (
                                              <tr key={i}>
                                                <td>{connection?.object?.service_name}</td>
                                                <th>
                                                  {
                                                    currencySymbol[
                                                      connection?.price?.price?.currency
                                                    ]
                                                  }{' '}
                                                  {connection?.price?.price?.value}
                                                </th>
                                              </tr>
                                            )
                                          );
                                        })}

                                        {item.connectionChecked.filter(
                                          connection =>
                                            connection.terminalPoint == 'arrivingToTerminalPoint'
                                        ).length > 0 && (
                                          <tr>
                                            <th>Services At {item?.header?.departingTo}</th>
                                            <th>Cost</th>
                                          </tr>
                                        )}
                                        {item.connectionChecked.map((connection, i) => {
                                          return (
                                            connection?.terminalPoint ==
                                              'arrivingToTerminalPoint' && (
                                              <tr key={i}>
                                                <td>{connection?.object?.service_name}</td>
                                                <th>
                                                  {
                                                    currencySymbol[
                                                      connection?.price?.price?.currency
                                                    ]
                                                  }{' '}
                                                  {connection?.price?.price?.value}
                                                </th>
                                              </tr>
                                            )
                                          );
                                        })}
                                        <tr>
                                          <td>Sub Total</td>
                                          <td>
                                            {
                                              currencySymbol[
                                                item.connectionChecked[0].price.price.currency
                                              ]
                                            }{' '}
                                            {parseFloat(subTotal.connection).toFixed(2)}
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                        <div className="meet-greet-ttl-cst-txt">
                          <p>Total Cost</p>
                          <p>
                            {currencySymbol[item.connectionChecked[0].price.price.currency]}{' '}
                            {parseFloat(+item?.totalPrice).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                {/* <div className="meet-greet-ttl-cst-txt">
                  <p>Total Cost</p>
                  <p>{item?.totalPrice}</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Meet&greet */}
    </div>
  );
};

export default Cart;
