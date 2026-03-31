export const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export function mobileReducer(state, action){
    switch(action.type){
        case "MOBILE": 
        return {
            ...state,
            mobile: action.payload,
        };
        default:
            return state;
    }
}