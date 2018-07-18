 import React, { Component } from 'react';
 import oip from './oip-wordmark-and-logo.png'

const imagestyle = {
	textAlign: 'center',
	marginTop: '40px'
}
	class Splash extends React.Component {
		// React components are simple functions that take in props and state, and render HTML
		render() {
			return (

					<div className="image"style={imagestyle}> 
						<img src={oip} class="img-fluid" alt="Responsive image"/>

					</div> 
			)}};
 export default Splash;

