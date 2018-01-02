import React, {Component} from 'react';
import  {FormGroup,ControlLabel,FormControl,Button,Label} from 'react-bootstrap';
import {socket} from "../constants/socket-io-client";

class SignIn extends Component {


    constructor(props) {
        super(props);

        this.state = {
            nick: '',
            error: {
                message: ''
            }
        }

    }

    login() {
        const {nick}=this.state;
        socket.emit('login', nick, res=> {
            if (res === 101)
                this.setState({error: {message: 'Bu kullanıcı şuan online durumdadır'}});


        });
    }


    render() {
        return (
            <div className="container">


                <div className="row">
                    <h1>Sign In</h1>

                    <div className="col-md-12">
                        <FormGroup >
                            <ControlLabel>NickName</ControlLabel>

                            <FormControl onChange={event=>{this.setState({nick:event.target.value})}}
                                         id="formControlsText"
                                         type="text"
                                         label="Text"
                                         value={this.state.nick}
                                         placeholder="Enter NickName Your Nickname Must be unique"
                            />
                            <Label bsStyle="danger">{this.state.error.message}</Label>

                        </FormGroup>


                        <Button onClick={()=>this.login()} type="submit">
                            Login
                        </Button>
                    </div>

                </div>
            </div>

        );
    }


}


export default SignIn;