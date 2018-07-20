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
import Multipart from './Multipart.js';
import Artifact from './ArtifactInspec';
import DlManager from './DownloadManager';
import oiplogo from './oip-wordmark-and-logo.png'
const imagestyle = {
	textAlign: 'center',
	marginTop: '40px'
}


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
        <a className="nav-link" href="/artLook">Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/multipart">Multipart Inspector<span className="sr-only"></span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/DlManager">Download Manager<span className="sr-only"></span></a>
      </li>
    </ul>
  </div>
</nav>
					
          <Route path="/artlook" render={props => <Lookup Core={this.props.Core}{...props} />} />
          <Route path="/multipart" render={props => <Multipart Core={this.props.Core} {...props} />} />
          <Route path="/artInspec" render={props => <Artifact Core={this.props.Core} {...props} />} />
          <Route path="/DlManager" render={props => <DlManager Core={this.props.Core} {...props} />} />


       	<div className="image"style={imagestyle}> 
						<img src={oiplogo} class="img-fluid" alt="Responsive image"/>

					</div> 

    </div>
    );
  }
}

export default AppRoutes;
