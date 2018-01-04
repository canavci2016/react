import {combineReducers} from 'redux';

import  user from './reducer_user';
import  room_list from './reducer_room_list';

export default  combineReducers({
    user,
    room_list


});