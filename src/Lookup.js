import React, { Component } from 'react'

import { Artifact, Multipart } from 'oip-js';
import inspect from './assets/imgs/inspect.svg';
import ArtifactViewer from './ArtifactViewer.js';
import MultipartViewer from './MultipartViewer.js';
import ToggleDisplay from 'react-toggle-display';
import BulkDownloadContainer from './BulkDownloadContainer.js';
import download from './assets/imgs/arrow-down.svg';
import './Lookup.css'
import ScrollToBottom from 'react-scroll-to-bottom';


class Lookup extends Component {
	constructor(props){
		super(props);

		this.state = {
			multiparts: [],
			artifact: undefined,
			showBDC: false

			

		}
		
		this.getMultiparts = this.getMultiparts.bind(this)
		this.updateSearchText = this.updateSearchText.bind(this)
	

	}
	
	getMultiparts(searchTXID){
		var self = this;

		this.props.Core.Index.getMultipartsForArtifact(searchTXID, function(mps){
			if (mps.length === 1 && mps[0] instanceof Artifact) {
				var art = mps[0]
			} else {
				var art = new Artifact();

				art.fromMultiparts(mps);
			}

			self.setState({
				multiparts: mps,
				artifact: art
			})
		}, function(err){
			console.error(err)
		})
	}
	updateSearchText(event){
		console.log(event.target.value)
		this.setState({
			searchText: event.target.value
		})
	}
	handleClick() {
		this.setState({
		  showBDC: !this.state.showBDC
		});
	  }

	  getArtifactFromID(value){
		  this.setState({showBDC: true}) 
        var self = this;
        this.props.Core.Index.getArtifactFromID(value, function(artifact){
            console.log(`value ${artifact}`)
            self.setState({
                artifact: artifact
            })
        }, function(err){
            console.error(err)
        })
	}
	
	
	render(){
		var x = document.documentElement.nodeName;
		var documentHeight=x.offsetHeight;
		var viewportHeight=window.innerHeight;
		window.scrollTo(0, documentHeight-viewportHeight);
		
					window.onscroll = function() {scrollFunction()};
					function scrollFunction() {
					if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
						document.getElementById("myBtn").style.display = "block";
					} else {
						document.getElementById("myBtn").style.display = "none";
					}
				}


			function topFunction() {
			document.body.scrollTop = 0; 
			document.documentElement.scrollTop = 0; 
			}
			function gobottom(){
				var documentHeight=document.documentElement.offsetHeight;
				var viewportHeight=window.innerHeight;
				window.scrollTo(0,documentHeight-viewportHeight);
				}
				
		console.log(this.state);
		return(
			
		<div className="container">
		 <input type="button" value="Go To Bottom" id="myBtn" onclick={gobottom()}/> 
			<div className="input-group row">
			<label htmlFor="ArtifactLookup" className="col-form-label" style={{marginRight:"10px"}}>Artifact ID:</label>
  				<input onChange={this.updateSearchText} type="text" className="form-control"/>
  				<div className="input-group-append">
    				<input type="image" name="inspect" src={inspect} width="30" height="30" style={{margin:"10px"}} onClick={ (event) => this.getMultiparts(this.state.searchText)}>
					</input>
					<input type="image" name="download" width="30" height="30" style={{margin:"10px"}} src={download} onClick={ () => this.getArtifactFromID(this.state.searchText) }></input>
  				</div>
			</div>

			<hr />

			<h3 className="text-center" style={{marginTop:"20px"}}>Artifact</h3>
			{this.state.artifact ? <ArtifactViewer artifact={this.state.artifact} /> : ""}
		
			<h3 className="text-center">Multiparts</h3>
			{
				this.state.multiparts.map(function(mp, i){
					if (mp instanceof Multipart)
						return <MultipartViewer key={i} multipart={mp} />
				})
			}
			 <ToggleDisplay if = {this.state.showBDC}>
			 <ScrollToBottom className="DisplayArts">
			 {this.state.searchText ? <BulkDownloadContainer artifact={this.state.artifact} artID={this.state.searchText}/> : "" }
			 </ScrollToBottom>
			 </ToggleDisplay>

			
		</div>
		)
	}

}

export default Lookup;