import  React,{Component} from 'react';
import {connect} from 'react-redux';
import {socket} from "../constants/socket-io-client";
import  {roomList} from '../actions';

class RoomList extends Component {


    componentDidMount() {
        socket.emit('roomList', {});
        socket.on('rooms', rooms=> {
            this.props.roomList(rooms);
        });
    }

    render() {
        const {room_list}=this.props;
        return (   <ul id="rooms">
            {
                room_list.map((room, ind)=> {
                    return (<li key={ind}>{room.name}</li>);
                })
            }
        </ul>);
    }


}

function mapStateToProps(state) {

    const {room_list}=state;
    return {room_list};

}

export  default connect(mapStateToProps, {roomList})(RoomList);