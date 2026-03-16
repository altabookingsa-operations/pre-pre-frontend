/**
 * The function `transferCart` is a reducer function that updates the state based on different action
 * types.
 * @param state - The current state of the application, which includes the cart and other relevant
 * data.
 * @param action - The `action` parameter is an object that contains information about the action being
 * dispatched. It typically has a `type` property that describes the type of action being performed,
 * and may also have a `payload` property that contains additional data related to the action.
 * @returns The function `transferCart` returns a new state object with updated values based on the
 * action type. The returned object includes properties such as `cart`, `cartForMap`, and
 * `cartForTempMap` that are updated based on the action payload. If the action type does not match any
 * of the cases, the function returns the original state object.
 */
export function transferCart(state, action) {
  switch (action.type) {
    case 'UPDATE_TRANSFER_CART':
      return { ...state, cart: state.cart.concat(action.payload) };
    case 'UPDATE_CART_FOR_MAP':
      return { ...state, cartForMap: state.cartForMap.concat(action.payload) };
    case 'UPDATE_CART_FOR_MAP_TEMP':
      return { ...state, cartForTempMap: action.payload };
    case 'EMPTY_TRANSFER_CART':
      return { ...state, cart: [] };
    case 'EMPTY_CART_FOR_MAP':
      return { ...state, cartForMap: [] };
    case 'EMPTY_CART_FOR_MAP_TEMP':
      return { ...state, cartForTempMap: [] };
    default:
      return state;
  }
}
