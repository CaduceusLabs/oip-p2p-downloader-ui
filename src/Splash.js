 import React, { Component } from 'react';
 import oip from './oip.jpeg'


	class SimpleExample extends React.Component {
		// React components are simple functions that take in props and state, and render HTML
		render() {
			return (

					<div className="image"> 
						<img src={oip} class="img-fluid" alt="Responsive image"/>

					</div> 
			)}};
 export default SimpleExample;

