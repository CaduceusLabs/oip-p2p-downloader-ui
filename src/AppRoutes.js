import React, { Component } from 'react'
import {
  Route,
} from 'react-router-dom'
import ReactDOM from 'react-dom';
import './App.css';
import DownloadFileList from './DownloadFileList.js';
import BdcWrapper from './BdcWrapper.js';
import Loader from './Loader.js';
import oip from './oip.svg';

class AppRoutes extends Component {
  render() {
    return (
      <div className="App">
   <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#"> <img src={oip} width="30" height="30" alt=""/></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href="load">Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="Bulk">List</a>
      </li>
    </ul>
  </div>
</nav>
        <br />
        <Route path="/DownloadFileList" render={props => <DownloadFileList Core={this.props.Core}{...props} />} />
					<Route path="/Bulk" render={props => <BdcWrapper Core={this.props.Core}{...props} />} />
					 <Route path="/load" render={props => <Loader Core={this.props.Core}{...props} />} />
        

      </div>
    );
  }
}

export default AppRoutes;
