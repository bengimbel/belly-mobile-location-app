import {
    USER_COORDINATE_REQUEST,
    USER_COORDINATE_SUCCESS,
    USER_COORDINATE_FAIL,
    GET_LOCATION
} from '../Utils/Constants'


// export default function fetchUserCoordinates() {
//     return dispatch => {
        // const geolocation = navigator.geolocation;
        // dispatch({ type: USER_COORDINATE_REQUEST })
        // return navigator.geolocation.getCurrentPosition(
        //     (position) => {
        //         dispatch({ type: USER_COORDINATE_SUCCESS, payload: position.coords })
        //     })
        //     },
        //     (error) => dispatch({ type: USER_COORDINATE_FAIL, payload: error }),
        //     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        //   );
//     }
// }


// export default function fetchUserCoordinates() {
//     return dispatch => {
//         return navigator.geolocation.getCurrentPosition((position) => {
//             console.log(position);
//             dispatch({
//                 type: USER_COORDINATE_SUCCESS,
//                 payload: position
//             });
//         });
//     };
// }

export default function fetchUserCoordinates() {
    return dispatch => {
        const geolocation = navigator.geolocation;
        return geolocation.getCurrentPosition((position) => {
            console.log(position.coords);
            dispatch({
                type: USER_COORDINATE_SUCCESS,
                payload: position
            });
        });
}}