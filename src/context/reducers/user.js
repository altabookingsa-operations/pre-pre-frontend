/**
 * The function updates the user state in a Redux store.
 * @param state - The state parameter represents the current state of the user in the application. It
 * is an object that contains various properties related to the user, such as their name, email, and
 * other relevant information.
 * @param action - The `action` parameter is an object that describes the type of action being
 * performed and any additional data associated with it. In this case, the `action` object has a `type`
 * property set to "UPDATE_USER" and a `payload` property that contains the updated user data.
 * @returns the updated state object with the user property set to the value of action.payload.
 */
export function user(state, action) {
  switch (action.type) {
    case 'UPDATE_USER':
      return { ...state, user: action.payload };
    case 'UPDATE_USER_NODE':
      return { ...state, user: action.payload };
    default:
      return state;
  }
}
