import React, { Component } from 'react';
import { Multipart } from 'oip-index';

class MultipartViewer extends Component {
	render(){
		var mp;

	
		
		
			mp = this.props.multipart;

		
		return(
			<div className="card" style={{marginTop:"20px"}}>
  				<div className="card-body">
				  <p>TXID: <code>{mp.getTXID()}</code></p>
  						<div>FloData:
					<div className="alert alert-secondary" style={{textAlign:'left'}} role="alert">
					  {mp.toString()}
						</div>
					</div>
    				<p>Part Number: <code>{mp.getPartNumber()}</code></p>
					<p>Total Multipart Length: <code>{mp.getTotalParts()}</code></p>
					<p>Publisher Address: <code>{mp.getPublisherAddress()}</code></p>
					<p>FirstTXIDRef: <code>{mp.getFirstPartTXID()}</code></p>
					<p>Signature: <code>{mp.getSignature()}</code></p>
					<p>PartData: <code style={{wordBreak:"break-word", wordWrap:"break-word", overflowWrap:"break-word", msHyphens:"auto", MozHyphens:"auto", WebkitHyphens:"auto", hyphens:"auto"}}>{mp.getChoppedStringData()}</code></p>
  				</div>
			</div>
		)
	}
}

export default MultipartViewer;