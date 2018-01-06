import  {USER_LIST} from  '../constants/constants';



export  default (state = [], action)=> {

    switch (action.type) {
        case USER_LIST:

            const {users}=action;
            return users;

        default:
            return state;

    }


}
