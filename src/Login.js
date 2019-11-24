
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Menu from './Menu';
 
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
         submitted: false, // Indique si on a validé le nom
        };
      }
     
      // Affiche un message d'erreur s'il n'y a pas de nom renseigné
  getWarning() {
    if (this.state.submitted && (this.props.username === '' || this.props.password === '' )) {
      return (
        <p> Vous devez introduir le nom d'utilisateur <b>et</b> le mot de passe !</p>
      )
    }
  }

      submitName(event) {
        this.props.submitForm(event)
        this.setState({submitted: true})
        
      }
      

      render() {
        return (
          <div id="container">
            <form  className="App-form">
                <div className="App-form-group">   
                     <h1>Connexion</h1>
                     <label><b>Nom d'utilisateur</b></label>
                     <input 
                      type="text" 
                      placeholder="Entrer le nom d'utilisateur" 
                      name="username"
                      onChange={(event) => this.props.handleChange(event)}
                     ></input>
                     <label><b>Mot de passe</b></label>
                     <input 
                     type="password" 
                     placeholder="Entrer le mot de passe" 
                     name="password" 
                     onChange={(event) => this.props.handleChange(event)}
                     ></input>
                    <Link className="App-btn" to={'/Menu'} ><b>Login</b></Link>
                 </div>   
           </form>
           <p>le nom : {this.props.username}
                 {this.getWarning()}</p>

          </div>
        );
      }

}

export default Login;