import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl, Button, Label} from 'react-bootstrap';
import  {Link} from 'react-router-dom';
import {socket} from "../constants/socket-io-client";
import {SECRET} from "../constants/client_secret_key";

class SignIn extends Component {


    constructor(props) {
        super(props);

        this.state = {
            nick: '',
            error: {
                message: ''
            },
            success: {
                message: ''
            }
        }

    }

    login() {
        console.log(SECRET);
        const {nick} = this.state;
        socket.emit('login', nick, res => {
            if (res === 101)
                this.setState({error: {message: 'Boyle bir kullanıcı bulunmamaktadır'}, success: {messsage: ''}});
            else if (res === 202)
                this.setState({success: {message: 'Giriş Başarılı'}, error: {message: ''}});
            else if (res === 402)
                this.setState({error: {message: 'Servis bağlantı hatası ( Error Message : Mysql Hatası)'}, success: {messsage: ''}});


        });
    }


    render() {
        return (
            <div className="container">


                <div className="row">
                    <h1>Sign In</h1>

                    <div className="col-md-12">
                        <FormGroup>
                            <ControlLabel>NickName</ControlLabel>

                            <FormControl onChange={event => {
                                this.setState({nick: event.target.value})
                            }}
                                         id="formControlsText"
                                         type="text"
                                         label="Text"
                                         value={this.state.nick}
                                         placeholder="Enter NickName Your Nickname Must be unique"
                            />
                            <Label bsStyle="danger">{this.state.error.message}</Label>
                            <Label bsStyle="success">{this.state.success.message}</Label>
                            <div><Link to={'/signup'}>Yeni Kayıt Aç </Link></div>

                        </FormGroup>


                        <Button onClick={() => this.login()} type="submit">
                            Login
                        </Button>
                    </div>

                </div>
            </div>

        );
    }


}


export default SignIn;