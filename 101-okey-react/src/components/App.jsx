import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap-tabs';

class App extends Component {

    render() {
        return (
            <div className="container">


                <div className="row">
                    <Tabs onSelect={(index, label) => console.log(label + ' selected')}>
                        <Tab label="Hesabım">
                            <h3>Hesap Detayları</h3>
                            <ul id="rooms">
                                <li>Oda 1</li>
                                <li>Oda 2</li>
                                <li>Oda 3</li>
                                <li>Oda 4</li>
                            </ul>

                        </Tab>
                        <Tab label="Masalar">
                            <h3>Odalar</h3>
                            <ul id="rooms">
                                <li>Oda 1</li>
                                <li>Oda 2</li>
                                <li>Oda 3</li>
                                <li>Oda 4</li>
                            </ul>

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


export default App;