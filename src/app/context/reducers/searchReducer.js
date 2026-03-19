
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
export function backgroundReducer(state, action){
    switch(action.type){
        case "BACKGROUND_SHOW": 
        return {
            ...state,
            backgroundShow: action.payload,
        };
        default:
            return state;
    }
}
