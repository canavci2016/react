import React, {Component} from 'react';
import  {FormGroup,ControlLabel,FormControl,Button,Label} from 'react-bootstrap';
import {socket} from "../constants/socket-io-client";
import {connect} from 'react-redux';
import Header  from './Header';
class RoomJoin extends Component {


    constructor(props) {
        super(props);

        this.state = {
            nick: '',
            error: {
                message: ''
            }
        }

    }


    componentWillMount()
    {
        console.log('this.props',this.props);
        const {id}=this.props.match.params;
        const user_nick=this.props.user.data.nick;

        socket.emit('logIntoRoom',{room_id:id,user_nick:user_nick});

    }

    componentDidMount()
    {


    }

    create() {
        const {nick}=this.state;
        this.setState({nick:''});
        socket.emit('roomJoin', {name:nick}, res=> {

        });

    }


    render() {

        return (
            <div className="container">

                <Header/>

                <div className="row">
                    <h1>Masa Aç</h1>

                    <div className="col-md-12">
                        <FormGroup >
                            <ControlLabel>Masa Adı</ControlLabel>

                            <FormControl onChange={event=>{this.setState({nick:event.target.value})}}
                                         id="formControlsText"
                                         type="text"
                                         label="Text"
                                         value={this.state.nick}
                                         placeholder="Masa Adı"
                            />
                            <Label bsStyle="danger">{this.state.error.message}</Label>

                        </FormGroup>


                        <Button onClick={()=>this.create()} type="submit">
                            Oluştur
                        </Button>
                    </div>

                </div>
            </div>

        );
    }


}

function mapStateToProps(state)
{
    console.log(state);

    var {room_list,user}=state;

    return {room_list,user};
}


export  default connect(mapStateToProps, null)(RoomJoin);