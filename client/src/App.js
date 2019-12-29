import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Header from './Header';
import Login from './Login';
import Menu from './Menu';
import Student from './Student';
import Addnote from './Addnote';


import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
            email: '',
            password:'',
            FirstName:'',
            FamilyName:'',
            date:'',
            matricule:0,
            niveau:'',
            Note:0,
            
            tmpNamo:''
      
    }
  }
  handleChange(event) {
    this.setState({
        [ event.target.name]: event.target.value
    });
  }
  submitForm(event) {
    event.preventDefault();
    //alert( " username:"+this.state.username + " mot de passe: "+this.state.password)
    //alert( " username:"+this.state.nom + " mot de passe: "+this.state.matricule   )
    
  }
  
  
 

  render() {

    return (
      <Router>
        <div>
          <Header></Header>
          
         <Route exact path="/" render = {() => ( <Login 
           email = {this.state.email} 
           password ={ this.state.password}
          handleChange = {(event) => this.handleChange(event)}
          submitForm = {(event) => this.submitForm(event)}
          ></Login>)}
          ></Route>


         <Route exact path="/Menu" render = {() => (<Menu>{this.props.history}</Menu>)} ></Route>
          <Route exact path="/Student" render = {() => (<Student
          nom = {this.state.nom} 
          Prenom ={ this.state.Prenom}
          date ={ this.state.date}
          matricule ={ this.state.matricule}
          email ={ this.state.email}
          niveau ={ this.state.niveau}
         handleChange = {(event) => this.handleChange(event)}
         submitForm = {(event) => this.submitForm(event)}
          
          
          
          ></Student>)} ></Route>
          <Route exact path="/Addnote" render = {() => (<Addnote></Addnote>)} ></Route>
          
        </div>
      </Router>
    );
  }
}



export default App;
