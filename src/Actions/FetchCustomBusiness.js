import {
    urlTest,
    FETCH_CUSTOM_DATA,
    FETCH_CUSTOM_DATA_SUCCESS,
    FETCH_CUSTOM_DATA_FAIL,
    urlCustom
} from '../Utils/Constants';
import { api_key } from '../Utils/Api-Key'

export default function fetchCustomBusiness(term, latitude, longitude) {
    let headers = new Headers;
    headers.append("Authorization", `Bearer ${api_key}`); //PUT YOUR API KEY HERE. I DID NOT PUSH MY API KEY TO GITHUB
    console.log(location, 'location');
    const newUrl = `${urlCustom}latitude=${latitude}&longitude=${longitude}&term=${term}`;
    console.log(newUrl, 'newUrl')
    return dispatch => {
        dispatch({ type: FETCH_CUSTOM_DATA })
        return fetch(newUrl, {headers: headers}).then(response => response.json())
        .then(customData => {
            console.log(customData, 'custom')
            dispatch({ type: FETCH_CUSTOM_DATA_SUCCESS, payload: customData })
        })
        .catch(error => {
            alert('No Internet: Using Cached Data');
            dispatch({ type: FETCH_CUSTOM_DATA_FAIL, payload: error })
        })
    }
}