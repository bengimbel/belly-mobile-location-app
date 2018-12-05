import {
    FETCH_CUSTOM_DATA,
    FETCH_CUSTOM_DATA_SUCCESS,
    FETCH_CUSTOM_DATA_FAIL
} from '../Utils/Constants';

const initialState = {
    isFetching: null,
    data: [],
    hasError: false,
    errorMessage: null,
 }

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_CUSTOM_DATA:
        return Object.assign({}, state, {
            isFetching: true,
            data: [],
            hasError: false,
            errorMessage: null
        });
        case FETCH_CUSTOM_DATA_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            data: action.payload,
            hasError: false,
            errorMessage: null
        });
        case FETCH_CUSTOM_DATA_FAIL:
        return Object.assign({}, state, {
            isFetching: false,
            data: action.payload,
            hasError: true,
            errorMessage: action.error
        });
        default:
          return state;
      }
    
}