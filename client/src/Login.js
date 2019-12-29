
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Menu from './Menu';
 
class Login extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
         submitted: false, // Indique si on a validé le nom 
         error:{}
        };
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
      }
      onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
      }
          
      submitName(event) {
        this.props.submitForm(event)
        this.setState({submitted: true})
        
      }

      onSubmit = async e => {
        e.preventDefault();
        const user={
          email:this.props.email,
          password:this.props.password
        }
        console.log(user)
        if ((this.props.email === '' || this.props.password === '' )) {
          return alert('u shoud fill all the fields !') 
         }
        fetch('login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }).then(response => 
          response.json()
          ).then(data=>{
              console.log('token'+data.token)
              localStorage.setItem('token',data.token)
              this.props.history.push(`/Menu`)
                
          }).catch((err)=>{alert("check ur information")})
      //  this.setState({ submitted : true });
      };
      

      render() {
        return (
          <div id="container">
            <form  className="App-form" onSubmit={this.onSubmit}>
                <div className="App-form-group">   
                     <h1>Connexion</h1>
                     <label><b>E-mail</b></label>
                     <input 
                      type="text" 
                      placeholder="Entrer e-mail" 
                      name="email"
                      onChange={(event) => this.props.handleChange(event)}
                     ></input>
                     <label><b>password</b></label>
                     <input 
                     type="password" 
                     placeholder="Entrer le mot de passe" 
                     name="password" 
                     onChange={(event) => this.props.handleChange(event)}
                     ></input>
                    <button type="submit" className="App-btn"  ><b>Login</b></button>
                 </div>   
           </form>
    
          </div>
        );
      }

}

export default withRouter(Login);