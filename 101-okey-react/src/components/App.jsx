import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Tabs, Tab} from 'react-bootstrap-tabs';
import  RoomList from './RoomList';

class App extends Component {


    componentDidMount()
    {
        console.log('this.props',this.props);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <Tabs onSelect={(index, label) => console.log(label + ' selected')}>
                        <Tab label="Hesabım">
                            <h3>Hesap Detayları</h3>
                            <ul id="rooms">
                                <li>Hoş geldin : <strong>{this.props.user.nick}</strong></li>
                                <li>Oda 2</li>
                                <li>Oda 3</li>
                                <li>Oda 4</li>
                            </ul>

                        </Tab>
                        <Tab label="Masalar">
                            <h3>Odalar</h3>
                           <RoomList/>
                        </Tab>
                        <Tab label="Online Kullanıcılar">
                            <h2>Online Kullanıcılar</h2>
                            <ul id="users">
                                <li>User 1</li>
                                <li>User 2</li>
                                <li>User 3</li>
                                <li>User 4</li>
                                <li>User 5</li>

                            </ul>
                        </Tab>
                        <Tab label="Mesajlar">
                            <h2>Mesajlar</h2>
                            <ul id="users">
                                <li>User 1</li>
                                <li>User 2</li>
                                <li>User 3</li>
                                <li>User 4</li>
                                <li>User 5</li>

                            </ul>
                        </Tab>
                    </Tabs>


                </div>
            </div>

        );
    }


}

function mapStateToProps(state)
{
const  {user}=state;
    return {user};
}


export default connect(mapStateToProps,null)(App);