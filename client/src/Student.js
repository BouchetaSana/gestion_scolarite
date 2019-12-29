
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Student extends Component {

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
                     <h1>Ajouter étudiant</h1>
                     <label><b>Nom </b></label>
                     <input  type="text"  placeholder="Entrer le nom d'étudiant" name="nom" onChange={(event) => this.props.handleChange(event)}
                     ></input>
                     <label><b>Prénom </b></label>
                     <input  type="text"  placeholder="Entrer le prénom  d'étudiant" name="prenom" onChange={(event) => this.props.handleChange(event)}
                     ></input>
                     <label><b>Date de naissance </b></label>
                     <input  type="date"  placeholder="Entrer la date de naissance" name="date" onChange={(event) => this.props.handleChange(event)}
                     ></input>
                     <label><b>E_mail</b></label>
                     <input  type="E_mail"  placeholder="Entrer email" name="email" onChange={(event) => this.props.handleChange(event)}
                     ></input>
                     <label><b>Matricule</b></label>
                     <input  type="E_mail"  placeholder="Entrer matricule" name="matricule" onChange={(event) => this.props.handleChange(event)}
                     ></input>
                     <label><b>Niveau</b></label>
                     <input  type="number"  placeholder="Entrer Niveau" name="niveau" onChange={(event) => this.props.handleChange(event)}
                     ></input>
                    
                      <button className="App-btn" onClick={(event) => this.submitName(event)} ><b>Ajouter</b></button>
                 </div>   
           </form>
           <p>le nom : {this.props.username}
                 {this.getWarning()}</p>

          </div>
        );
      }



}
export default  Student;