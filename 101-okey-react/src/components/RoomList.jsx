import  React,{Component} from 'react';
import {connect} from 'react-redux';
import  {Label,ListGroup,ListGroupItem,PageHeader} from 'react-bootstrap';
import  {Link} from  'react-router-dom';
import {socket} from "../constants/socket-io-client";
import  {roomList} from '../actions';


class RoomList extends Component {


    componentWillMount()
    {
        console.log('middleware');
    }

    componentDidMount() {
        socket.emit('roomList', {});
        socket.on('rooms', rooms=> {
            this.props.roomList(rooms);
        });
    }

    render() {
        console.log('render');

        const {room_list}=this.props;
        return (   <ListGroup>
            {
                room_list.map((room, ind)=> {
                    return (<ListGroupItem key={room.id}> <PageHeader>
                        {room.name} <small>Subtext for header</small>
                    </PageHeader>  <Link to={'join-room/'+room.id+'?c=23'}> <Label bsSize="large" bsStyle="primary">Masaya Katıl &larr;</Label></Link> </ListGroupItem>);
                })
            }
        </ListGroup>);
    }


}

function mapStateToProps(state) {

    const {room_list}=state;
    return {room_list};

}

export  default connect(mapStateToProps, {roomList})(RoomList);