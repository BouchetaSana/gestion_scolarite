
import React, { Component } from 'react'
import { Link,withRouter } from 'react-router-dom'

class Student extends Component {

    constructor(props) {
        super(props);
        this.state = {
         submitted: false, // Indique si on a validé le nom
        };
        this.onSubmit = this.onSubmit.bind(this)

      }
     
      onSubmit(e){
        e.preventDefault();
        const student={
          email:this.props.FirstName[0]+'_'+this.props.FamilyName+"@esi.dz",
          password:this.props.FamilyName+this.props.FirstName,
          FirstName:this.props.FirstName,
          FamilyName:this.props.FamilyName,
          dateBirth:this.props.dateBirth,
          matricule:this.props.matricule,
          level:this.props.level,       
        }

        const token=localStorage.getItem('token')//////
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
            console.log(data)
            console.log(data.body)
            alert(data.message)
            this.props.history.push(`/Student`)

          })
        }).catch(()=>{
          alert("verify the informations")

        })
    
      } 
     
     
     
      submitName(event) {
        this.props.submitForm(event)
        this.setState({submitted: true})
        
      }
      render() {
        return (
          <div id="container">
            <form  className="App-form" onSubmit={this.onSubmit}>
                <div className="App-form-group">   
                     <h1>ADD STUDENT</h1>
                     <label><b>First Name </b></label>
                     <input  type="text"  placeholder="Entrer le nom d'étudiant" name="FirstName" onChange={(event) => this.props.handleChange(event)}
                     ></input>
                     <label><b>Family Name </b></label>
                     <input  type="text"  placeholder="Entrer le prénom  d'étudiant" name="FamilyName" onChange={(event) => this.props.handleChange(event)}
                     ></input>
                     <label><b>Date Birth</b></label>
                     <input  type="date"  placeholder="Entrer la date de naissance" name="dateBirth" onChange={(event) => this.props.handleChange(event)}
                     ></input>
                     <label><b>Matricule</b></label>
                     <input  type="number"  placeholder="Entrer matricule" name="matricule" onChange={(event) => this.props.handleChange(event)}
                     ></input>
                     <label><b>level</b></label>
                     <input  type="String"  placeholder="Entrer Niveau" name="level" onChange={(event) => this.props.handleChange(event)}
                     ></input>
                    
                      <button type="submit" className="App-btn"  ><b>ADD</b></button>
                 </div>   
           </form>
          
          </div>
        );
      }
}
export default  withRouter(Student);