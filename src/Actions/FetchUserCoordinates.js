import {
    USER_COORDINATE_SUCCESS
} from '../Utils/Constants'


export default function fetchUserCoordinates() {
    return dispatch => {
        const geolocation = navigator.geolocation;
        return geolocation.getCurrentPosition((position) => {
            dispatch({
                type: USER_COORDINATE_SUCCESS,
                payload: position
            });
        });
}}