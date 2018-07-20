
import React, { Component } from "react";
import Folder from "./assets/imgs/folder-open.svg";
import Pause from "./assets/imgs/pause-circle.svg";
import Play from "./assets/imgs/play-circle.svg";
import Settings from "./assets/imgs/cog.svg";
import Up from "./assets/imgs/arrow-up.svg";
import Down from "./assets/imgs/arrow-down.svg";
import { Artifact } from "oip-js";

class DlManager extends Component {
	// React components are simple functions that take in props and state, and render HTML
	render() {
		return (
            <div>
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
                                style={{ margin: "0px" }}
                            />
                        </th>
                        <td>
                            <div>
                                <h4 />
                                </div>
                                <div>
                                    249.6 MB of 3.94 GB (6.19%)
                                    <div class="progress">
                                        <div
                                            class="progress-bar"
                                            role="progressbar"
                                            style={{ width: "6.19%" }}
                                            aria-valuenow="6.19"
                                            aria-valuemin="0"
                                            aria-valuemax="100">
                                            6.19%
                                        </div>
                                    </div>
                                </div>
                            </td>
                            </tr>
                    </tbody>
                </table>
                <br />
            </div>
        );
    }
}
		
	


export default DlManager;