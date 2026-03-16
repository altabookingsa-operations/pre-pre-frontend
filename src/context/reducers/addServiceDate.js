export function addServiceDate(state, action) {
  switch (action.type) {
    case 'ADD_SERVICE_DATE':
      return {
        ...state,
        selectedDate: action.payload,
      };
    default:
      return state;
  }
}
