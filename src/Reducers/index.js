import UserCoordinateReducer from './UserCoordinateReducer';
import BasicDataReducer from './BasicDataReducer';
import CustomDataReducer from './CustomDataReducer';

import { combineReducers } from 'redux';

export default combineReducers({
    basicData: BasicDataReducer,
    userCoordinates: UserCoordinateReducer,
    customData: CustomDataReducer
});