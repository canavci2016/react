import  {SIGNED_USER,CLEAR_SIGNED_USER} from  '../constants/constants';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
import jwt_decode from 'jwt-decode';

let user_default = {
    token: null,
    exp: null,
    data: {
        nick: null
    },
    iat: null
};

export  default (state = user_default, action)=> {

    const cookie_name = 'auth_user';

    var user_cookie = read_cookie(cookie_name, null);
    if (Array.isArray(user_cookie) || user_cookie == null) {

    }
    else {
        state = user_cookie;
    }

    switch (action.type) {
        case SIGNED_USER:
            let {userObject}=action;
            try {
                const {token}=userObject;
                const jwtRes = jwt_decode(token);
                const {data,exp,iat}=jwtRes;
                userObject = {token, exp, data, iat};
            } catch (e) {
                userObject = user_default;
            }



            bake_cookie(cookie_name, userObject);
            return userObject;

        case CLEAR_SIGNED_USER:
            delete_cookie(cookie_name);
            return user_default;

        default:
            return state;

    }


}
