import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormGroup, ControlLabel, FormControl, Button, Label} from 'react-bootstrap';
import  {Link,withRouter} from 'react-router-dom';
import {signedUser} from '../actions';
import {socket} from "../constants/socket-io-client";


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
        const {nick} = this.state;
        socket.emit('login', nick, res => {
            const {code,token}=res;


            if (code === 101)
                this.setState({error: {message: 'Boyle bir kullanıcı bulunmamaktadır'}, success: {messsage: ''}});
            else if (code === 202)
            {

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

function mapStateToProps(state)
{
    const  {user}=state;

    return {
        user

    };
}

export default withRouter(connect(mapStateToProps,{signedUser})(SignIn));