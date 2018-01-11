import  {SIGNED_USER,ROOM_LIST,USER_LIST,SOCKET} from '../constants/constants';

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
export function userList(users) {
    const action = {
        type: USER_LIST,
        users
    };

    return action;

}

export function setSocket(socket) {
    const action = {
        type: SOCKET,
        socket
    };

    return action;

}