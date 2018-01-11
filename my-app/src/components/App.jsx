import React, {Component} from 'react';
import '../App.css';
import {connect} from 'react-redux';
import {addReminder,deleteReminder,clearReminders} from '../actions';
import  moment from  'moment';

class App extends Component {

    constructor(props) {

        super(props);
        this.state = {
            text: '',
            dueDate: ''
        };

    }

    addReminder() {
        this.props.addReminder(this.state.text,this.state.dueDate);
        this.setState({
            text:'',
            dueDate:''
        });
    }

    deleteReminder(id)
    {
        this.props.deleteReminder(id);

    }

    renderReminders() {
        const {reminders} = this.props;
        console.log('reminders in renderReminders', reminders);

        return (
            <ul className="list-group col-sm-4">
                {reminders.map(reminder => {
                    return (<li className="list-group-item" key={reminder.id}>
                        <div className="list-item">

                        <div>{reminder.text}</div>
                        <div><em>{moment(new Date(reminder.dueDate)).fromNow()}</em></div>
                        </div>
                        <div onClick={()=>this.deleteReminder(reminder.id)} className="list-item delete-button">&#x2715;</div>
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
                    <input onChange={event=>this.setState({dueDate:event.target.value})} value={this.state.dueDate} type="datetime-local" className="form-control"/>

                </div>
                <button className="btn btn-success" onClick={() => this.addReminder()}>Add Reminder</button>

            </div>
            {this.renderReminders()}
<div className="btn btn-danger" onClick={()=>this.props.clearReminders()}>
Clear Reminders
</div>
        </div>);

    }


}


/* tüm stateleri buraya iter ve props oalrak alabiliriz*/
function mapStateToProps(state) {
    return {
        reminders: state
    };
}


export default connect(mapStateToProps, {addReminder,deleteReminder,clearReminders})(App);
