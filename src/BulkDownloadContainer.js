import React, { Component } from 'react';
import Folder from './assets/imgs/folder-open.svg';
import DownloadFileList from './DownloadFileList';
import { Artifact } from 'oip-js';
import filesize from 'filesize';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { ipcRenderer, remote } = window.require('electron');



class BulkDownloadContainer extends Component {
    constructor(props){
        super(props)

        this.state = {
            selectedFiles: []
        }

        this.onFileSelect = this.onFileSelect.bind(this)
        this.downloadSelectedFiles = this.downloadSelectedFiles.bind(this)


        ipcRenderer.on("toast", (message) => {
            toast(message);
        })
    }
    
    // In renderer process (web page).
  

    onFileSelect(selected, index){
        console.log("Index", index)
        // setState, change selectedFiles Array based on `selected` variable and index

        // Get array from state
        // Create temp variable to store changes we need to make to the selectedFiles array
        var tmpSelected = this.state.selectedFiles;

        // If selected is true
            // If index is in tmpSelected array
                // If index is not, then add the index to the tmpSelected array

        let i = tmpSelected.indexOf(index)
        if (selected === true && i === -1) {
            tmpSelected.push(index)
        }
        if (selected === false && i > -1) {
            tmpSelected.splice(i, 1)
        }

        console.log("onFileSelectd", tmpSelected, selected, index)

        this.setState({
            selectedFiles: tmpSelected
        })
    }
    downloadSelectedFiles() {
    
        console.log(new Date())
         console.log(this.props.artifact)
         console.log(this.state.selectedFiles)

       var  dlStatus = ipcRenderer.sendSync("downloadFile", this.props.artifact, this.state.selectedFiles,)
        if (dlStatus.success === false) {
            toast(dlStatus.reason)
        }
       // })
       
    }
    render(){
       //  console.log(this.props.artifact)
        var value;

        if (this.props.artifact){
            value = this.props.artifact;
        } else {
			value = new Artifact();
		}
    
        var selectedFiles = [];
        var files = value.getFiles();
        

        var totalDownloadSize = 0;

        for (var i = 0; i < this.state.selectedFiles.length; i++){
            selectedFiles.push( files[ this.state.selectedFiles[i] ] )

            totalDownloadSize += files[ this.state.selectedFiles[i] ].getFilesize();
        }

        //console.log(this.state)
    
        return(
           <div>
           <div>
              <ToastContainer />
            </div>
    
            <div class="card">
                <div class="card-header">
                        <p className="OpenFolder"><img width="30" height="30" src={Folder} style={{marginRight:"10px"}}/>{value.getTitle()}</p>
                        <p className="ArtDownloadAmount">{value.getFiles().length} {} in Artifact</p>
                        <p className="ArtSelectDownload">Selected: {this.state.selectedFiles.length} file(s) | {filesize(totalDownloadSize)} </p>
                </div>
                <div className="card-body">
                    <h5 className="card-title"></h5>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col" style= {{maxWidth:"10px"}}></th>
                                <th scope="col">Filename</th>
                                <th scope="col">Type</th>
                                <th scope="col">Size</th>
                            </tr>
                        </thead>
                        <tbody> 	
                        {
	                        value.getFiles().map((file, i) => {
		                        return <DownloadFileList key={i} fileIndex={i} file={file} onFileSelectChange={this.onFileSelect} />
				            })
			            }
                        </tbody>
                    </table>
                    <button type="button" class="btn btn-primary btn-lg" onClick={this.downloadSelectedFiles}>Download</button>
                </div>
                </div>
                </div>
    )
    }
}

export default BulkDownloadContainer;