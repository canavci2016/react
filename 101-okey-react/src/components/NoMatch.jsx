import React, {Component} from 'react';
import  {FormGroup,ControlLabel,FormControl,Button,Label} from 'react-bootstrap';
import {socket} from "../constants/socket-io-client";

class NoMatch extends Component {


    constructor(props) {
        super(props);

        this.state = {
            nick: '',
            error: {
                message: ''
            }
        }

    }

    create() {
        const {nick}=this.state;
        this.setState({nick:''});
        socket.emit('roomCreate', {name:nick}, res=> {

        });

    }


    render() {
        return (
            <div className="container">


                <div className="row">
                    <h1>404 SAYFASI</h1>

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


export default NoMatch;