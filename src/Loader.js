import React, { Component } from "react";
import Folder from "./assets/imgs/folder-open.svg";
import Pause from "./assets/imgs/pause-circle.svg";
import Play from "./assets/imgs/play-circle.svg";
import Settings from "./assets/imgs/cog.svg";
import Up from "./assets/imgs/arrow-up.svg";
import Down from "./assets/imgs/arrow-down.svg";
import { Artifact } from "oip-js";

class Loader extends Component {
    constructor(props) {
        super(props);
    }
    

        render(){
        console.log(this.props.artifact)
        var art;

        if (this.props.artifact){
            art = this.props.artifact;
        } else {
			art = new Artifact();
        }
        
  
    
        return (
            <div>
                <div className="modal-background" />
                <div role="dialog" className="modal-dialog">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col" />
                            <th scope="col" />
                            <th scope="col" />
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row" className="OpenFolder">
                                <img
                                    width="50"
                                    height="50"
                                    src={Folder}
                                    style={{ marginRight: "10px" }}/>
                            </th>
                            
                            <td>
                                <div>
                                    {art.getTitle()}
                                </div>
                                <div>
                            
                                    <div className="progress">
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            aria-valuenow="6.19"
                                            aria-valuemin="0"
                                            aria-valuemax="100">
                                       
                                        </div>
                                    </div>
                                </div>
                                <div className="float-right">
                                    DL from 3 nodes, UL to 0 nodes (Down
                                    1.25MB/s Up 0.00KB/s)
                                </div>
                            </td>
                            <td className="Pause">
                                <img width="30" height="30" src={Pause} 
                                    width="30"
                                    height="30"
                                    src={Pause}
                                    style={{ marginLeft: "0px" }}
                                />
                            </td>
                            <td className="Settings">
                                <img width="30" height="30" src={Pause} 
                                    width="30"
                                    height="30"
                                    src={Settings}
                                    style={{ marginLeft: "0px" }}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <div className="card" style={{width: "18rem;"}}>
                 <div className="card-header" style={{marginRight: "10px"}}>
                 <p className="font-weight-bold">
                Connected 8 nodes, DL from 7 nodes</p>
                <img style={{ marginLeft: "10px" }}width="30"height="20"src={Down}/>2.67MB/S
                <img  style={{ marginLeft: "10px" }}width="30"height="20"src={Up}/>0.00KB/S
                <img className="float-right"  style={{ marginRight: "5px" }}width="30"height="30"src={Pause} />
            </div>
    </div>
    </div>
</div>
        );
    }
}

export default Loader;
