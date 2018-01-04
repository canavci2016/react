import  {SIGNED_USER,ROOM_LIST} from '../constants/constants';

export function signedUser(userObject) {
    const action = {
        type: SIGNED_USER,
        userObject
    };

    return action;

}


export function roomList(rooms) {
    const action = {
        type: ROOM_LIST,
        rooms
    };

    return action;

}