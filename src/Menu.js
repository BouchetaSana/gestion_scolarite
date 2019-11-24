
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Menu extends Component {

    render () {
        return (
          <div>
 
              <Link className="App-btn App-btn-yellow " to={'/Student'}  ><p>Ajouter étudiant</p></Link>
               
              <Link className="App-btn App-btn-yellow" to={'/Addnote'}  ><p>Ajouter note</p></Link>
           
          </div>
        )
      }


}
export default  Menu;