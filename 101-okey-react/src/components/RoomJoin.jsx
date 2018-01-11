import React, {Component} from 'react';
import  {FormGroup,ControlLabel,FormControl,Button,Label} from 'react-bootstrap';
import {socket} from "../constants/socket-io-client";
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

    componentDidMount()
    {
        console.log('this.props',this.props);
        const {id}=this.props.match.params;
        console.log(id);
    }

    create() {
        const {nick}=this.state;
        this.setState({nick:''});
        socket.emit('roomCreate', {name:nick}, res=> {

        });

    }


    render() {
        console.log('this props',this.props);
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


export default RoomJoin;