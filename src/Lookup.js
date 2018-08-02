import React, { Component } from 'react'

import { Artifact, Multipart, Index,} from 'oip-index';
import inspect from './assets/imgs/inspect.svg';
import ArtifactViewer from './ArtifactViewer.js';
import MultipartViewer from './MultipartViewer.js';
import ToggleDisplay from 'react-toggle-display';
import BulkDownloadContainer from './BulkDownloadContainer.js';
import download from './assets/imgs/arrow-down.svg';
import './Lookup.css'
import ScrollToBottom from 'react-scroll-to-bottom';
import Loader from 'react-loader-spinner';


class Lookup extends Component {
	constructor(props){
		super(props);

		this.state = {
			multiparts: [],
			artifact: undefined,
			showBDC: false,
			showLoader: false


			

		}
		
		this.getMultiparts = this.getMultiparts.bind(this)
		this.updateSearchText = this.updateSearchText.bind(this)
	

	}
	
	async getMultiparts(txid){
       this.setState({
		   showLoader: true
	   })
		var index = new Index();
		let mps = await index.getMultiparts(txid)
		console.log(mps)
		var art = new Artifact(mps)
		
			console.log(art)
			this.setState({
				multiparts: mps,
				artifact: art,
				showLoader: false
			
			})
			console.log(art)
	}



	

	updateSearchText(event){
		console.log(event.target.value)
		this.setState({
			searchText: event.target.value
		})
	}
	handleClick() {
		this.setState({
		  showBDC: !this.state.showBDC,
		  showLoader: !this.state.showLoader
		});
	  }

	  async getArtifact(value){
		var index = new Index();
		 let art = await index.getArtifact(value)
		  
		  this.setState({showBDC: true, artifact: art}) 
	  }
	
	
	render(){
		
					window.onscroll = function() {scrollFunction()};
					function scrollFunction() {
					if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
						document.getElementById("myBtn").style.display = "block";
					} else {
						document.getElementById("myBtn").style.display = "none";
					}
				}


			function topFunction() {
		window.scrollTo(0,0)
			}
			function gobottom(){
				console.log("going down")
				var documentHeight=document.documentElement.offsetHeight;
				 var viewportHeight=window.innerHeight;
				window.scrollTo(0,documentHeight-viewportHeight);
				}
				
		console.log(this.state);
		return(
			
		<div className="container">


		<input type="button" value="Top" id="myBtn" onClick={() => {topFunction()}}/> 
			<div className="input-group row">
			<label htmlFor="ArtifactLookup" className="col-form-label" style={{marginRight:"10px"}}>Artifact ID:</label>
  				<input onChange={this.updateSearchText} type="text" className="form-control"/>
  				<div className="input-group-append">
    				<input type="image" name="inspect" src={inspect} width="30" height="30" style={{margin:"10px"}} onClick={ () => this.getMultiparts(this.state.searchText)}>
					</input>					
					<input type="image" name="download" width="30" height="30" style={{margin:"10px"}} src={download} onClick={ () => {this.getArtifact(this.state.searchText); gobottom()} }></input>
  				</div>
			</div>

			<hr />

			<h3 className="text-center" style={{marginTop:"20px"}}>Artifact</h3>
			{this.state.artifact ? <ArtifactViewer artifact={this.state.artifact} /> : ""}
		
			<h3 className="text-center">Multiparts</h3>
			<div className="text-center">
			<ToggleDisplay if = {this.state.showLoader}>
					<Loader 
	     type="Puff"
	     color="#00BFFF"
	     height="100"	
	     width="100" 
		 />   
		 
					</ToggleDisplay>
					</div>
			{
				this.state.multiparts.map(function(mp, i){
					if (mp instanceof Multipart)
						return <MultipartViewer key={i} multipart={mp} />
				})
			}
			 <ToggleDisplay if = {this.state.showBDC}>
			 <ScrollToBottom className="DisplayArts">
			  <BulkDownloadContainer artifact={this.state.artifact} artID={this.state.searchText}/>
			 </ScrollToBottom>
			 </ToggleDisplay>

			
		</div>
		)
	}

}

export default Lookup;