
export function searchReducer(state, action){
    switch(action.type){
        case "SEARCH_LOADER": 
        return {
            ...state,
            searchLoader: action.payload,
        };
        default:
            return state;
    }
}