import {ADD_REMINDER,DELETE_REMINDER,CLEAR_REMINDERS} from '../constants';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

const reminder = (action) => {

    let { text, dueDate}=action;
    return {
        id: Math.random(),
        text,
        dueDate
    };

}

const removeById = (state = [], id)=> {

    const reminders = state.filter(reminder => reminder.id !== id);
    console.log('new reduced reminders', reminders);
    return reminders;
}

const reminders = (state = [], action) => {
    let reminders = null;

    console.log('state previous value  (Reducer Method)', state);
    state = read_cookie('reminders');
    console.log('cookie value  (Reducer Method)', state);


    switch (action.type) {
        case  ADD_REMINDER:
            reminders = [...state, reminder(action)];
            bake_cookie('reminders', reminders);
            console.log('reminders in reducer', reminders);
            return reminders;
        case  DELETE_REMINDER:
            reminders = removeById(state, action.id);
            bake_cookie('reminders', reminders);
            return reminders;
        case  CLEAR_REMINDERS:
            reminders=[];
            delete_cookie('reminders', reminders);
            return reminders;
        default:
            return state;

    }


};


export default reminders;