import  React,{Component} from  'react';
import  {firebaseApp} from '../firebase';
import {connect} from 'react-redux';
import AddGoal from './AddGoal';
import GoalList from './GoalList';
import  CompleteGoalList from './CompleteGoalList';

class App extends Component {
    signOut() {
        firebaseApp.auth().signOut().catch(error=> {
            console.log('signout error', error);
        });
    }

    render() {
        return (<div>
                <h3>Goal Coach</h3>
                <AddGoal/>
                <hr/>
                <h4>Goals</h4>
                <hr/>
                <GoalList/>

                <hr/>
                <h4>Complete Goals</h4>
                <hr/>
                <CompleteGoalList/>

                <button className="btn btn-danger " onClick={()=>this.signOut()}>Sign Out</button>
            </div>
        );

    }

}


function mapStateToProps(state) {
    console.log('mapStateToProps in App.jsx', state);
    return {};
}

export  default connect(mapStateToProps, null)(App);