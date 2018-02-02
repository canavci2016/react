import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Tabs,Tab} from 'react-bootstrap';
import RoomList from './RoomList';
import CustomerList from './CustomerList';
import RoomCreate from './RoomCreate';
import {Link} from 'react-router-dom';
import Header  from './Header';

class App extends Component {


    componentDidMount() {
        //console.log('this.props',this.props);
    }

    render() {

        return (
            <div className="container">
                <Header/>
                <div className="row">
                    <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                        <Tab eventKey={1} title="Hesabım">
                            <ul id="rooms">
                                <li>Hoş geldin : <strong>{this.props.user.data.nick}</strong></li>
                                <li><Link to='awdawd'>404 TEST</Link></li>
                                <li>Oda 3</li>
                                <li>Oda 4</li>
                            </ul>                        </Tab>
                        <Tab eventKey={2} title="Masalar">
                            <h3>Masalar</h3>
                            <RoomList/>
                        </Tab>
                        <Tab eventKey={3} title="Masa Aç">
                            <RoomCreate/>
                        </Tab>
                        <Tab eventKey={4} title="Online Kullanıcılar">
                            <h2>Online Kullanıcılar</h2>
                            <CustomerList/>
                        </Tab>

                        <Tab eventKey={5} title=" Mesajlar">
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

function mapStateToProps(state) {
    const {user} = state;
    return {user};
}


export default connect(mapStateToProps, null)(App);