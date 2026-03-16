/**
 * The function updates the booking dates in the state by concatenating the payload to the existing
 * booking dates.
 * @param state - The current state of the bookingDate reducer. It represents the data related to
 * booking dates.
 * @param action - The `action` parameter is an object that contains information about the action being
 * dispatched. It typically has a `type` property that describes the type of action being performed,
 * and may also have a `payload` property that contains additional data related to the action.
 * @returns the updated state object with the bookingDates property being updated by concatenating the
 * action payload to the existing bookingDates array.
 */
export function bookingDate(state, action) {
  switch (action.type) {
    case 'UPDATE_BOOKING_DATE':
      return {
        ...state,
        bookingDates: state.bookingDates.concat(action.payload),
      };

    default:
      return state;
  }
}
