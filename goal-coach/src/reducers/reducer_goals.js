import {SET_GOALS} from "../constans";

export default (state=[],action)=>{

    switch (action.type)
    {

        case SET_GOALS:
            const  {goals}=action;
            return goals;
        default:
            return state;


    }

}