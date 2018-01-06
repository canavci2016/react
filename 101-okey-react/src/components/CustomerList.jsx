import  React,{Component} from 'react';
import {connect} from 'react-redux';
import {socket} from "../constants/socket-io-client";
import  {userList} from '../actions';

class CustomerList extends Component {


    componentDidMount() {
        socket.emit('userList', {});
        socket.on('usernames', names=> {
            this.props.userList(names);
        });
    }

    render() {
        const {user_list}=this.props;
        return (   <ul id="users">
            {
                user_list.map((name, ind)=> {
                    return (<li key={ind}>{name}</li>);
                })
            }
        </ul>);
    }


}

function mapStateToProps(state) {
console.log('mapStateToProps',state);
    const {user_list}=state;
    return {user_list};

}

export  default connect(mapStateToProps, {userList})(CustomerList);