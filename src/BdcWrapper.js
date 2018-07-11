import React, { Component } from 'react';
import  download,  {downloadFile} from 'oip-p2p-downloader';
import BulkDownloadContainer from './BulkDownloadContainer.js'
import Loader from './Loader.js';
import { Downloader } from 'oip-p2p-downloader'; 


class BdcWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            artifact: undefined,
            value: ""
        }

        this.updateArtifactText = this.updateArtifactText.bind(this);
        this.getArtifactFromID = this.getArtifactFromID.bind(this);
    }

    updateArtifactText(event){
        console.log(event.target.value)
        this.setState({
            value: event.target.value
        })
    }

    getArtifactFromID(){
        var self = this;
        let value = this.state.value;
        this.props.Core.Index.getArtifactFromID(value, function(artifact){
            console.log(`value ${artifact}`)
            self.setState({
                artifact: artifact
            })
        }, function(err){
            console.error(err)
        })
    }

    render() 
    { 
        return (
            
            <div>
                <br/>
                <form className="form-inline">
                <div className="form-group mx-sm-3 mb-2">
                    <label for="inputArtifact" class="sr-only">Artifact </label>
                    <input type="text" value={this.state.value} class="form-text" id="Artifactinput" onChange={this.updateArtifactText} onBlur={this.getArtifactFromID} placeholder="Artifact"/>
                    <input type="submit" value="Submit" />
                 </div>
                </form>
                <BulkDownloadContainer artifact={this.state.artifact} artID={this.state.value}/>

            </div>
        )
    }
}

 
export default BdcWrapper;