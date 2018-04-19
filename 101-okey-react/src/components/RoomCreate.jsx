import React, {Component} from 'react';
import {connect} from 'react-redux';
import  {FormGroup,ControlLabel,FormControl,Button,Label,Row} from 'react-bootstrap';
import {socket} from "../constants/socket-io-client";

class RoomCreate extends Component {


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

    create() {
        const {nick}=this.state;
        const {token}=this.props.user;


        this.setState({nick: ''});
        socket.emit('roomCreate', {name: nick, token: token}, res=> {
            const {code}=res;

            if (code === 101) //user not found
            {
                this.setState({error: {message: 'Boyle bir kullanıcı bulunmaktadır.'}, success: {message: ''}});

            }
            else if (code === 202) ////Success
            {
                this.setState({error: {message: ''}, success: {message: 'Oda oluşturuldu.'}});

            }
            else if (code === 301) ////jwt verify error
            {
                this.setState({error: {message: 'JWT Verify Hatası alındı.'}, success: {message: ''}});

            }
            else if (code === 402) //mysql error
            {
                this.setState({
                    error: {message: 'Servis bağlantı hatası ( Error Message : Mysql Hatası)'},
                    success: {message: ''}
                });
            }


        });

    }


    render() {
        return (
            <div className="container">


                <Row>
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
                            <Label bsStyle="success">{this.state.success.message}</Label>

                        </FormGroup>


                        <Button  onClick={()=>this.create()} type="submit">
                            Oluştur
                        </Button>
                    </div>

                </Row>
            </div>

        );
    }


}

function mapStateToProps(state) {

    const {user}=state;

    return {
        user
    };

}


export default connect(mapStateToProps, null)(RoomCreate);