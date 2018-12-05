import UserCoordinateReducer from './UserCoordinateReducer';
import BasicDataReducer from './BasicDataReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    basicData: BasicDataReducer,
    userCoordinates: UserCoordinateReducer
});