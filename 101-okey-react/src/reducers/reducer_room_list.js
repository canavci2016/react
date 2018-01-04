import  {ROOM_LIST} from  '../constants/constants';



export  default (state = [], action)=> {

    switch (action.type) {
        case ROOM_LIST:

            const {rooms}=action;
            return rooms;

        default:
            return state;

    }


}
