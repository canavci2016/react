import  {SIGNED_USER} from '../constants/constants';

export function signedUser(userObject) {
    const action = {
        type: SIGNED_USER,
        userObject
    };

    return action;

}