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
export function searchReducer(state, action) {
  switch (action.type) {
    case 'SEARCH_INPUT_VALUE':
      return { ...state, search_reducer: action.payload };
    case 'SEARCH_INPUT_FIELD_CLICK':
      return { ...state, search_reducer: action.payload };
    case 'SEARCH_SLIDER_SELECT_BASE_TAG':
      return { ...state, search_reducer: action.payload };
    case 'REMOVE_SEARCH_DATA':
      return { ...state, search_reducer: action.payload };
    case 'SET_DEFAULT_LOCATION':
      return { ...state, default_location: action.payload };
    case 'SET_TRIP_QUERY_TEXT':
      return { ...state, query_text: action.payload };
    case 'SET_TRIP_RES':
      return { ...state, query_res: action.payload };
    default:
      return state;
  }
}
