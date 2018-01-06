import React, {Component} from 'react';
import  {Link} from 'react-router';
import  {Navbar,MenuItem,Nav,NavItem,NavDropdown} from 'react-bootstrap';
import {socket} from "../constants/socket-io-client";
class Header extends Component {


    constructor(props) {
        super(props);

        this.state = {
            nick: '',
            error: {
                message: ''
            }
        }

    }

    create() {
        const {nick}=this.state;
        this.setState({nick:''});
        socket.emit('roomCreate', {name:nick}, res=> {

        });

    }


    render() {
        return (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link  to="/app"> 101 Okey</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="#">
                        Link
                    </NavItem>
                    <NavItem eventKey={2} href="#">
                        Link
                    </NavItem>
                    <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                        <MenuItem eventKey={3.1}>Action</MenuItem>
                        <MenuItem eventKey={3.2}>Another action</MenuItem>
                        <MenuItem eventKey={3.3}>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey={3.4}>Separated link</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>

        );
    }


}


export default Header;