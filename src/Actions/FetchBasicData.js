import {
    urlTest,
    FETCH_BASIC_DATA,
    BASIC_DATA_SUCCESS,
    BASIC_DATA_FAIL,
    url
} from '../Utils/Constants';
import { api_key } from '../Utils/Api-Key'

export default function fetchBasicData(lat, long) {
    let headers = new Headers;
    headers.append("Authorization", `Bearer ${api_key}`);
    const newUrl = `${url}latitude=${lat}&longitude=${long}`;
    console.log(newUrl, 'newUrl')
    return dispatch => {
        dispatch({ type: FETCH_BASIC_DATA })
        return fetch(newUrl, {headers: headers}).then(response => response.json())
        .then(basicData => {
            dispatch({ type: BASIC_DATA_SUCCESS, payload: basicData })
        })
        .catch(error => {
            dispatch({ type: BASIC_DATA_FAIL, payload: error })
        })
    }
}