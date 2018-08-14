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
import ArtSuite from './ArtSuite.js'
import BulkDownloadContainer from './BulkDownloadContainer';


class AppRoutes extends Component {
  render() {
    return (
      <div className="App">
        <br />
        <Route exact path='/' render={props => <ArtSuite Core={this.props.Core}{...props} />} />
        <Route exact path='/download' component={Lookup} />
    </div>
    );
  }
}

export default AppRoutes;
