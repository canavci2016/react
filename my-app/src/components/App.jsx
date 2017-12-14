import React, {Component} from 'react';
import '../App.css';
import {connect} from 'react-redux';
import {addReminder,deleteReminder} from '../actions';

class App extends Component {

    constructor(props) {

        super(props);
        this.state = {
            text: ''
        };

    }

    addReminder() {
        this.props.addReminder(this.state.text);
    }

    deleteReminder(id)
    {
        this.props.deleteReminder(id);

    }

    renderReminders() {
        const {reminders} = this.props;
        console.log('props',this.props);
        console.log('reminders', reminders);

        return (
            <ul className="list-group col-sm-4">
                {reminders.map(reminder => {
                    return (<li className="list-group-item" key={reminder.id}>
                        <div className="list-item">{reminder.text}</div>
                        <div onClick={this.deleteReminder(reminder.id)} className="list-item delete-button">&#x2715;</div>
                    </li>);
                })}
            </ul>

        )

    }

    render() {
        return (<div className="App">

            <div className="title">
                Reminder Pro

            </div>
            <div className="form-inline reminder-form">

                <div className="form-group">
                    <input type="text" value={this.state.text}
                           onChange={event => this.setState({text: event.target.value})} className="form-control"
                           placeholder="i have to ..."/>

                </div>
                <button className="btn btn-success" onClick={() => this.addReminder()}>Add Reminder</button>

            </div>
            {this.renderReminders()}

        </div>);

    }


}


function mapStateToProps(state) {
    console.log('state ', state);
    return {
        reminders: state
    };
}


export default connect(mapStateToProps, {addReminder,deleteReminder})(App);
