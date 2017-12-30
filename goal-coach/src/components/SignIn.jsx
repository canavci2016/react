import  React,{Component} from  'react';

import  {firebaseApp} from '../firebase';
import {Link} from  'react-router';

class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: {
                message: ''
            }
        };
    }

    SignIn() {

        console.log('this.state', this.state);
        const {email,password}=this.state;
        firebaseApp.auth().signInWithEmailAndPassword(email, password).catch(error=> {
            console.log('signup Errors', error);
            this.setState({error});
        });


    }

    render() {
        return (<div className="form-inline">

            <h2>Sign In</h2>
            <div className="form-group">
                <input style={{marginRight:'5px'}} type="text" value={this.state.email} placeholder="email"
                       onChange={event=>this.setState({email:event.target.value})} className="form-control"/>
                <input style={{marginRight:'5px'}} type="password" value={this.state.password} className="form-control"
                       onChange={event=>this.setState({password:event.target.value})} placeholder="password"/>
                <button onClick={()=>this.SignIn()} className="btn btn-primary">Sign In</button>
            </div>
            <div>{this.state.error.message}</div>
            <div><Link to={'/signup'}>Signup </Link></div>
        </div>);

    }
}


export  default SignIn;