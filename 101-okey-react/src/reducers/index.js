import {LIST_ROOMS} from "../constants/constants";

export  default (state=[], action)=>
{

    switch (action.type)
    {
        case LIST_ROOMS:
            const  {rooms}=action;
            return   {
                rooms
            };
        default:
            return state;

    }


}
