/**
 * The function `userAccess` is a reducer that updates the user access state based on the action type
 * and payload.
 * @param state - The current state of the user access. It represents the data that is being managed by
 * the userAccess reducer.
 * @param action - The `action` parameter is an object that represents the action being dispatched. It
 * typically has a `type` property that describes the type of action being performed, and a `payload`
 * property that contains any additional data needed to update the state.
 * @returns a new state object with the updated user_access property.
 */
export function userAccess(state, action) {
  switch (action.type) {
    case 'UPDATE_USER_ACCESS':
      return { ...state, user_access: action.payload };
    default:
      return state;
  }
}
