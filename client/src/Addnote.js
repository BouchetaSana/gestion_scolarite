import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Mytable from './Mytable';

import row from './row'


class Addnote extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

      

    render () {
        return (
          <div>
            
              
               
                <Mytable></Mytable>
             
          </div>
        )
      }

      

      






}
export default  Addnote;