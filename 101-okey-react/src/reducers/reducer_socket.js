import  {SOCKET} from  '../constants/constants';



export  default (state = null, action)=> {

    switch (action.type) {
        case SOCKET:

            const {socket}=action;
            return socket;

        default:
            return state;

    }


}
