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
            dateBirth:'',
            matricule:0,
            level:'',
            cc:0,
            ci:0,
            cf:0,
            prof:"",
            module:"",
            
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


         <Route exact path="/Menu" render = {() => (<Menu></Menu>)} ></Route>
          <Route exact path="/Student" render = {() => (<Student
          FirstName = {this.state.FirstName} 
          FamilyName ={ this.state.FamilyName}
          dateBirth ={ this.state.dateBirth}
          matricule ={ this.state.matricule}
          email ={ this.state.email}
          level ={ this.state.level}
         handleChange = {(event) => this.handleChange(event)}
         submitForm = {(event) => this.submitForm(event)}
          
          
          
          ></Student>)} ></Route>
          <Route exact path="/Addnote" render = {() => (<Addnote
           
          handleChange = {(event) => this.handleChange(event)}
          submitForm = {(event) => this.submitForm(event)}></Addnote>)} ></Route>
          
        </div>
      </Router>
    );
  }
}



export default App;
/* onSubmit(e){
    e.preventDefault();
    const student={
      //email:this.props.FirstName[0]+'_'+this.props.FamilyName+"@esi.dz",
      //password:this.props.FamilyName+this.props.FirstName,
      FirstName:this.props.FirstName,
      FamilyName:this.props.FamilyName,
      dateBirth:this.props.dateBirth,
      matricule:this.props.matricule,
      level:this.props.level,       
    }
    if ((this.props.matricule === '' || this.props.FamilyName === '' || this.props.FirstName === '' || this.props.level === '')) {
      return alert('you shoud fill all the fields !') 
     }
    fetch('students/add',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(student)
    }).then((response,error)=>{
      response.json()
      .then((data)=>{
        alert(data)
        this.props.history.push(`/Menu`)
      })
    }).catch(()=>{
      alert("verify the informations")
    })

  }*/