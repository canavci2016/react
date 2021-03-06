import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl, Button, Label} from 'react-bootstrap';
import {Link, withRouter} from 'react-router-dom';

import {socket} from "../constants/socket-io-client";
import {connect} from "react-redux";
import {signedUser} from "../actions";

class SignUp extends Component {


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

    /*
     * state ve proplar yüklenmeden önce çalışır
     * */
    componentWillUpdate(nextProps, nextState) {
        nextState.facebook_id = Date.now();
    }

    register() {
        const {name, surname, email, nick, facebook_id} = this.state;
        const obj = {name, surname, email, nick, facebook_id};

        socket.emit('register', obj, res => {

            const {code,token} = res;

            if (code === 101)
                this.setState({error: {message: 'Boyle bir kullanıcı bulunmaktadır.'}, success: {messsage: ''}});
            else if (code === 102)
                this.setState({error: {message: 'Son eklenen kullanıcı bilgileri getirilemiyor.'}, success: {messsage: ''}});
            else if (code === 202) {
                const userObject={ token };
                this.props.signedUser(userObject);
                this.props.history.push('/app');
            }
            else if (code === 402)
                this.setState({
                    error: {message: 'Servis bağlantı hatası ( Error Message : Mysql Hatası)'},
                    success: {messsage: ''}
                });

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


                        <Button onClick={() => this.register()} type="submit">
                            Kayıt Ol
                        </Button>
                    </div>

                </div>
            </div>

        );
    }


}

function mapStateToProps(state) {
    const {user} = state;

    return {
        user

    };
}

export default withRouter(connect(mapStateToProps, {signedUser})(SignUp));