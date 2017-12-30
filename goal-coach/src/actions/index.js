import  {SIGNED_IN,SET_GOALS} from  '../constans';

export function logUser(email) {
    const action = {
        type: SIGNED_IN,
        email
    };

    console.log('logUser action=',action);
    return action;

}

export function setGoals(goals) {
    const action = {
        type: SET_GOALS,
        goals
    };

    console.log('setGoals action=',action);
    return action;

}
