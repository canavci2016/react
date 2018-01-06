import {combineReducers} from 'redux';

import  user from './reducer_user';
import  room_list from './reducer_room_list';
import  user_list from './reducer_user_list';
import  socket from './reducer_socket';

export default  combineReducers({
    user,
    room_list,
    user_list,
    socket


});