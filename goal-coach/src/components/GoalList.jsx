import React, {Component} from 'react';
import {connect} from 'react-redux';
import {goalRef} from '../firebase';


class GoalList extends Component {

    componentDidMount() {
        goalRef.on('value', snap => {
            let goals = [];
            snap.forEach(goal => {
                const  {email,title}=goal.val();
                goals.push({email,title});

            });
            console.log('goals',goals);

        });
    }


    render() {

        return (
            <div>Goal List</div>
        );

    }


}


export default GoalList;