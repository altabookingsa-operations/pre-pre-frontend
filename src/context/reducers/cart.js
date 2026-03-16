/**
 * The `cart` function is a reducer that handles different actions to update the state of a shopping
 * cart.
 * @param state - The current state of the cart, which includes the items in the cart and any other
 * relevant information.
 * @param action - The `action` parameter is an object that describes the action being performed. It
 * typically has a `type` property that indicates the type of action being performed, and a `payload`
 * property that contains any additional data needed for the action.
 * @returns The function `cart` returns a new state object based on the given `state` and `action`. The
 * returned object includes the `cart` property, which is updated based on the action type.
 */
export function cart(state, action) {
  switch (action.type) {
    case 'UPDATE_CART':
      return { ...state, cart: action.payload };
    case 'EMPTY_CART':
      return { ...state, cart: action.payload };
    case 'REMOVE_ITEM':
      return {
        ...state,
        // cart: state.cart.filter((i) => i.object.vehicle_id != action.payload),
        cart: action.payload,
      };
    case 'REMOVE_ITEM_INDENTIFIER':
      return {
        ...state,
        // cart: state.cart.filter((i) => i.object.identifier != action.payload),
        cart: action.payload,
      };
    case 'REMOVE_ITEM_MAP':
      return {
        ...state,
        cartForMap: action.payload,
      };
    case 'REFETCH_CART_FROM_SUPABASE':
      return { ...state, cart: action.payload };
    case 'RETRIEVE_JSON_STORE':
      return { ...state, retrieveData: action.payload };
    case 'STORE_BOOKING_TOTAL_VALUE':
      return {
        ...state,
        totalPaymentDetails: action.payload,
      };
    case 'STORE_ORDER_DETAILS':
      return {
        ...state,
        orderDetails: action.payload,
      };

    case 'STORE_HOTEL_REQ_DETAILS':
      return {
        ...state,
        hotelDetails: action.payload,
      };
    case 'UPDATE_CART_FOR_TRIP_HOTEL':
      return { ...state, hotel_list: state.hotel_list.concat(action.payload) };
    case 'UPDATE_CART_FOR_TRIP_TOUR':
      return { ...state, tour_list: state.tour_list.concat(action.payload) };
    case 'REMOVE_CART_FOR_TRIP_TOUR':
      return { ...state, tour_list: action.payload };
    case 'REMOVE_CART_FOR_TRIP_HOTEL':
      return { ...state, hotel_list: action.payload };
    default:
      return state;
  }
}
