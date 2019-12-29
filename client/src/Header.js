import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';

class Header extends Component {

    render () {
        return (
          <div className="App">
            <div className="App-header">
              <div className="App-brand">
                <Link to={process.env.PUBLIC_URL + '/'}>
                  <img src={logo} className="App-logo" alt="logo" />
                </Link>
                <h2>Gestion de scolarité</h2>
              </div>
            </div>
          </div>
        )
      }


}
export default Header;