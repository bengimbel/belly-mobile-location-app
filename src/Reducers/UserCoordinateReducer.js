import {
    USER_COORDINATE_REQUEST,
    USER_COORDINATE_SUCCESS,
    USER_COORDINATE_FAIL
} from '../Utils/Constants'

const initialState = {
    isFetching: null,
    coordinates: {},
    hasError: false,
    errorMessage: null,
 }

export default function(state = initialState, action) {
    switch (action.type) {
        case USER_COORDINATE_REQUEST:
        return Object.assign({}, state, {
            isFetching: true,
            coordinates: {},
            hasError: false,
            errorMessage: null
        });
        case USER_COORDINATE_SUCCESS:
        return Object.assign({}, state, {
            isFetching: false,
            coordinates: action.payload,
            hasError: false,
            errorMessage: null
        });
        case USER_COORDINATE_FAIL:
        return Object.assign({}, state, {
            isFetching: false,
            coordinates: action.payload,
            hasError: true,
            errorMessage: action.error
        });
        default:
          return state;
      }
    
}