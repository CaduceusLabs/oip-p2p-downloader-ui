import React, { Component } from "react";
import Up from "./assets/imgs/arrow-up.svg";
import Down from "./assets/imgs/arrow-down.svg";
import Pause from "./assets/imgs/pause-circle.svg";
import ToggleDisplay from 'react-toggle-display';

class ArtSuite extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFiles: [],
            showArt: false
        }
    }
    

        render(){

            return (
<div className="ActiveNode">
<div class="card">

    <div class="card-body">
        <h4 style={{ marginLeft: "20px", textAlign:"center" }}>
            Connected 8 nodes, DL from 7 nodes
        </h4>
        <p className="Pause" style={{}}>
        <img className="float-right"  style={{ margin: "5px" }}width="30"height="30"src={Pause} /></p>

        <p className="Upload" style={{float:"right"}}>
        <img  style={{ marginLeft: "10px" }}width="30"height="30"src={Up}/>0.00KB/S</p>


        <p className="Download" style={{float:"right"}}>
        <img style={{ marginRight: "5px" }}width="30"height="30"src={Down}/>2.67MB/S</p>
        
    </div>
</div>
</div>
            )
        }
    }


export default ArtSuite;