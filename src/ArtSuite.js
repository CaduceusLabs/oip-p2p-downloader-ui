import React, { Component } from "react";
import Up from "./assets/imgs/arrow-up.svg";
import Down from "./assets/imgs/arrow-down.svg";
import Pause from "./assets/imgs/pause-circle.svg";
import ToggleDisplay from 'react-toggle-display';
import { Artifact, Multipart, Index,} from 'oip-index';
import Art from './Art.js';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

class ArtSuite extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFiles: [],
            showArt: false

        }
    }
    
showArt = () => {
    ipcRenderer.send('toggle-Art')
}
        render(){
            return (
<div className="ActiveNode">
<div className="card">

    <div className="card-body">
        <h4 style={{ marginLeft: "20px", textAlign:"center" }}>
            Connected 8 nodes, DL from 7 nodes
        </h4>
        <p className="Upload" style={{float:"right"}}>
        <img  style={{ marginLeft: "10px" }}width="30"height="30"src={Up}/>0.00KB/S</p>


        <p className="Download" style={{float:"right"}}>
        <img style={{ marginRight: "5px" }}width="30"height="30"src={Down}/>2.67MB/S</p>
        <div className="card-footer">
        <button type="button" class="btn btn-primary btn-lg" onClick={() => this.showArt()}>Find Artifact</button>
        </div>
    </div>
</div>

			<ToggleDisplay if = {this.state.showArt}>
			<Art artifact={this.state.artifact} artID={this.state.searchText}/>
			</ToggleDisplay>
</div>

            )
        }
    }


export default ArtSuite;