import React, {Component} from 'react';
import  {FormGroup,ControlLabel,FormControl,Button} from 'react-bootstrap';
import {socket} from "../constants/socket-io-client";

class SignIn extends Component {


    constructor(props)
    {
        super(props);

        this.state={
            nick:''
        }

    }

    login()
    {

        console.log('this props',this.state.nick);
        const {nick}=this.state;

        socket.emit('login',nick,function (res) {
            console.log(res);
        })

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