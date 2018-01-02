import  {SIGNED_USER} from  '../constants/constants';

let user = {
    nick: null
};

export  default (state = user, action)=> {

    switch (action.type) {
        case SIGNED_USER:

            const {userObject}=action;
            return userObject;

        default:
            return state;

    }


}
