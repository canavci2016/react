import  React,{Component} from 'react';
import  {connect} from 'react-redux';
import {completeGoalRef} from "../firebase";
import  {setCompletedGoals} from "../actions";
import  GoalItem from './GoalItem';

class CompleteGoalList extends  Component
{

    componentDidMount() {

        completeGoalRef.on('value', snap => {
            let goals = [];
            snap.forEach(goal => {
                const  {email,title}=goal.val();
                const  serverKey=goal.key;
                goals.push({email,title,serverKey});

            });
            this.props.setCompletedGoals(goals);

        });
    }

    render()
    {
        return (   <div style={{marginRight:'5px'}}>
            {
                this.props.completedGoals.map((goal,index)=>{
                    return (
                        <GoalItem key={index} goal={goal}/>
                    );
                })
            }

        </div>);
    }

}

function mapStateToProps(state)
{
    const {completedGoals}=state;

    return    {
        completedGoals
    }

}
export  default  connect(mapStateToProps,{setCompletedGoals}) (CompleteGoalList);