import  React ,{Component} from  'react';
import {connect} from  'react-redux';
import {goalRef} from '../firebase';


class AddGoal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
    }

    addGoal() {

        console.log('this.props in AddGoal.jsx ', this.props);

        const { email }=this.props;
        const { title }=this.state;

        goalRef.push({ email, title});
    }

    render() {

        return (
            <div className="form-inline">
                <div className="form-group">
                    <input onChange={event=>this.setState({title:event.target.value})} value={this.state.title}
                           type="text" placeholder="Add a goal" style={{ marginRigth:'5px'}} className="form-control"/>
                    <button onClick={()=>this.addGoal()} className="btn btn-success" type="button"> Submit</button>
                </div>
            </div>
        );

    }


}


function mapStatetoProps(state){
    const { email }=state;
    console.log('mapStatetoProps in  AddGoal.jsx',state);

    return {
        email
    };
}


export  default connect(mapStatetoProps,null)(AddGoal);