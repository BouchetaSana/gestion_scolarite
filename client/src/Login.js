
import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Menu from './Menu';
 
class Login extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
         submitted: false, // Indique si on a validé le nom 
         error:{},
         email:"",
         password:""
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
          email:this.state.email,
          password:this.state.password
        }
        console.log(user)
        if ((this.state.email === '' || this.state.password === '' )) {
          return alert('you shoud fill all the fields !') 
         }
        fetch('http://localhost:8000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        }).then(response =>{
          if (response.status== '200'){
            response.json()
            .then(data=>{
                console.log('token'+data.token)
                localStorage.setItem('token',data.token)
                this.props.history.push(`/Menu`)
                  
            }).catch((err)=>{
              alert("email or password invalid!!")
          
            })

          }else{
            alert("email or password invalid!!")
          }
        }).catch(()=>{
          alert("email or password invalid!!")
         
        } 
        ) 
      } 
          
         
      //  this.setState({ submitted : true });
    
      

      render() {
        return (
          <div id="container">
            <form  className="App-form" onSubmit={this.onSubmit}>
                <div className="App-form-group">   
                     <h1>Connexion</h1>
                     <label><b>E-mail</b></label>
                     <input 
                      type="email" 
                      placeholder="Entrer e-mail" 
                      name="email"
                      value={this.state.email}
                      onChange={ this.onChange}
                     ></input>
                     <label><b>password</b></label>
                     <input 
                     type="password" 
                     placeholder="Entrer le mot de passe" 
                     name="password" 
                     value={this.state.password}
                     onChange={ this.onChange}
                     ></input>
                    <button type="submit" className="App-btn"  ><b>Login</b></button>
                 </div>   
           </form>
    
          </div>
        );
      }

}

export default withRouter(Login);