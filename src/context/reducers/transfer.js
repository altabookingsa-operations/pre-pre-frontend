/**
 * The function takes in a state and an action, and based on the action type, updates the state
 * accordingly.
 * @param state - The current state of the application, which includes various properties and their
 * values.
 * @param action - The `action` parameter is an object that represents the action being dispatched. It
 * typically has a `type` property that describes the type of action being performed, and a `payload`
 * property that contains any additional data needed to update the state.
 * @returns a new state object with updated properties based on the action type.
 */
export function transfer(state, action) {
  let fullList;
  switch (action.type) {
    case 'UPDATE_FULLLIST':
      return { ...state, fullList: action.payload };
    case 'UPDATE_TRANSFER':
      return { ...state, list: action.payload };
    case 'FILTER_TRANSFER':
      return { ...state, list: action.payload };
    case 'FILTER_TRANSFER_TOGGLE':
      return { ...state, toggleTransferFilter: action.payload };
    case 'SET_FILTER_INITIAL_RANGE':
      return {
        ...state,
        setFilterInitialRange: action.payload,
        setFilterRange: undefined,
      };
    case 'SET_FILTER_RANGE':
      return { ...state, setFilterRange: action.payload };
    case 'SET_SORT_RANGE_VALUE':
      return { ...state, sortByValue: action.payload };
    case 'CENTER_LAT_LNG':
      return { ...state, centerLatLng: action.payload };
    case 'SET_FLITER_INPUT_VALUE':
      return { ...state, inputVal: action.payload };
    default:
      return state;
  }
}
