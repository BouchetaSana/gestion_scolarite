import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import row from './row'


class Addnote extends Component {
    constructor(props) {
        super(props);
        
      }

      tow() {
        this.render (
            <tr>
            <td>ibtissem</td>
            <td>khedim</td>
            <td>20</td>
            <td>20</td>
            </tr>
        )
          
      }

    render () {
        return (
          <div>
              <table> 
                    <thead>
                       <tr>
                         <th>matricule</th>
                         <th>Nom</th>
                         <th>prenom</th>
                         <th>Note</th>
                         <th></th>
                       </tr>
                    </thead>
                    <tbody>
                        {this.tow}
                        
                    </tbody>
                       
                </table> 
               
                   
             
          </div>
        )
      }

      

      






}
export default  Addnote;