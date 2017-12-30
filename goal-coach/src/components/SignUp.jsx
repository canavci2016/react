import  React,{Component} from  'react';
import {Link} from  'react-router';
import  {firebaseApp} from '../firebase';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error:{
                message:''
            }
        };
    }

    signUp() {

        const {email,password}=this.state;
        firebaseApp.auth().createUserWithEmailAndPassword(email,password).catch(error=>{
            console.log('signup Errors',error);
            this.setState({error});
        });


    }

    render() {
        return (<div className="form-inline">

            <h2>Signup</h2>
            <div className="form-group">
                <input style={{marginRight:'5px'}} type="text" value={this.state.email} placeholder="email"
                       onChange={event=>this.setState({email:event.target.value})} className="form-control"/>
                <input style={{marginRight:'5px'}} type="password" value={this.state.password} className="form-control"
                       onChange={event=>this.setState({password:event.target.value})} placeholder="password"/>
                <button onClick={()=>this.signUp()} className="btn btn-primary">SignUp</button>
            </div>
            <div>{this.state.error.message}</div>
            <div><Link to={'/signin'}>Already a user ? Sign in instead</Link></div>

        </div>);

    }
}


export  default SignUp;