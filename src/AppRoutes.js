import React, { Component } from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'
import ReactDOM from 'react-dom';

import logo from './logo.svg';
import './App.css';
import DownloadFileList from './DownloadFileList.js';
import BdcWrapper from './BdcWrapper.js';
import Loader from './Loader.js';

class AppRoutes extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to P2P Downloader</h1>
        </header>
        <br />
        <Route path="/DownloadFileList" render={props => <DownloadFileList Core={this.props.Core}{...props} />} />
					<Route path="/Bulk" render={props => <BdcWrapper Core={this.props.Core}{...props} />} />
					<Route path="/load" render={props => <Loader Core={this.props.Core}{...props} />} />
        

      </div>
    );
  }
}

export default AppRoutes;
