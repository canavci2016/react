import  {SIGNED_USER,SHOW_SIGNED_USER,CLEAR_SIGNED_USER} from  '../constants/constants';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

let user = {
    token: null
};

export  default (state = user, action)=> {

    const cookie_name='auth_user';

    switch (action.type) {
        case SIGNED_USER:
            const {userObject}=action;
            bake_cookie(cookie_name, userObject);
            return userObject;
        case SHOW_SIGNED_USER:
            var user_cookie = read_cookie(cookie_name, null);
            if (Array.isArray(user_cookie) || user_cookie == null) {
                user_cookie = state;
            }
            return user_cookie;
        case CLEAR_SIGNED_USER:
        delete_cookie(cookie_name);
            return {
                token: null
            };

        default:
            return state;

    }


}
