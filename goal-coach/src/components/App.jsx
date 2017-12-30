import  React,{Component} from  'react';
import  {firebaseApp} from '../firebase';
import {connect} from 'react-redux';
import AddGoal from './AddGoal';
import GoalList from './GoalList';

class App extends Component {
    signOut() {
        firebaseApp.auth().signOut().catch(error=> {
            console.log('signout error', error);
        });
    }

    render() {
        return (<div>
                <h3>Goals</h3>
                <AddGoal/>
                <GoalList/>
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