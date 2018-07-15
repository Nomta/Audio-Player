'use strict';

var trackState = require('./track-state');
	
var playerSetter = function(options) {
	
	this.tracks			= options.tracks		|| [],	
	this.className		= options.className		|| '',
	this.buttonText		= 'buttonText' in options ? 
						options.buttonText 		: ['Play', 'Pause'],
	this.container		= options.container		|| document.body;

	var pathName		= options.pathName		|| '',
		ext				= options.ext			|| '.mp3';
		
	window.currentTrack 	=  '';
		
	var getChildClassName  		= addClass.bind(this, '__'),
		getModifierClassName 	= addClass.bind(this, '--');
	
	function addClass(separator, subClassName) {
		if (this.className) return this.className + separator + subClassName;
		return subClassName;
	}
	
	function getUrl(trackName) {
		return pathName + trackName + ext;
	}

	this.getModifierClassName 	= getModifierClassName,
	this.getChildClassName  	= getChildClassName,
	this.changeTrackState		= trackState(this),
	this.getUrl 				= getUrl;
}

module.exports = playerSetter;