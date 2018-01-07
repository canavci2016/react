import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl, Button, Label} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {socket} from "../constants/socket-io-client";

class SignIn extends Component {


    constructor(props) {
        super(props);

        this.state = {
            name: '',
            surname: '',
            email: '',
            nick: '',
            facebook_id: '',
            error: {
                message: ''
            },
            success: {
                message: ''
            }
        }

    }

    login() {
        const {nick} = this.state;
        socket.emit('login', nick, res => {
            if (res === 101)
                this.setState({error: {message: 'Boyle bir kullanıcı bulunmamaktadır'}, success: {messsage: ''}});
            else if (res === 202)
                this.setState({success: {message: 'Giriş Başarılı'}, error: {message: ''}});


        });
    }


    render() {
        return (
            <div className="container">


                <div className="row">
                    <h1>Kayıt Ol</h1>

                    <div className="col-md-12">
                        <FormGroup>
                            <ControlLabel>İsim</ControlLabel>
                            <FormControl onChange={event => {
                                this.setState({name: event.target.value})
                            }}
                                         id="formControlsText"
                                         type="text"
                                         label="Text"
                                         value={this.state.name}
                                         placeholder="Enter NickName Your Nickname Must be unique"
                            />
                            <ControlLabel>Soy isim</ControlLabel>
                            <FormControl onChange={event => {
                                this.setState({surname: event.target.value})
                            }}
                                         id="formControlsText"
                                         type="text"
                                         label="Text"
                                         value={this.state.surname}
                                         placeholder="Enter NickName Your Nickname Must be unique"
                            />
                            <ControlLabel>Email</ControlLabel>
                            <FormControl onChange={event => {
                                this.setState({email: event.target.value})
                            }}
                                         id="formControlsText"
                                         type="text"
                                         label="Text"
                                         value={this.state.email}
                                         placeholder="Enter NickName Your Nickname Must be unique"
                            />
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
                            <div><Link to={'/signin'}> Zaten bir hesabım var ? </Link></div>

                        </FormGroup>


                        <Button onClick={() => this.login()} type="submit">
                            Kayıt Ol
                        </Button>
                    </div>

                </div>
            </div>

        );
    }


}


export default SignIn;