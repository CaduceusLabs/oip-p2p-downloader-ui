import React, { Component } from 'react'
import {
  Route,
} from 'react-router-dom'
import ReactDOM from 'react-dom';
import './App.css';
import DownloadFileList from './DownloadFileList.js';
import BdcWrapper from './BdcWrapper.js';
import oip from './oip.svg';
import Lookup from './Lookup.js';
import Art from './Art.js';


class AppRoutes extends Component {
  render() {
    return (
      <div className="App">
   <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-link" href="/"> <img src={oip} width="30" height="30" alt=""/></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
    </ul>
  </div>
</nav>
					
          <Route exact path='/' render={props => <Lookup Core={this.props.Core}{...props} />} />


    </div>
    );
  }
}

export default AppRoutes;
