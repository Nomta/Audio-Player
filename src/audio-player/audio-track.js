'use strict';

var helpers 		= require('./helpers'),
    createElement 	= helpers.createElement;

function AudioTrack(options) {
	
	var className 		= options.className,
	    buttonText 		= options.buttonText,
	    getChildClassName   = options.getChildClassName;
		
	var initButtonText	= Array.isArray(buttonText) && buttonText.length === 2 ? buttonText[0] : '';
		
	var render = function(trackName) {
		var track, playButton, trackTitle, progressBar, current;
		
		track 		= createElement('div', className);
		playButton 	= createElement('button', getChildClassName('play-button'), initButtonText);
		trackTitle 	= createElement('p', getChildClassName('track-title'), trackName);
		
		progressBar 	= createElement('div', getChildClassName('progress-bar'));
		current 	= createElement('div', getChildClassName('progress-bar__current'));
		
		progressBar.appendChild(current);
		
		[playButton, trackTitle, progressBar].forEach(function(element) {
			track.appendChild(element);
		});
		track.setAttribute('data-name', trackName);
		
		return track;
	}
	
	this.render = render;
}

module.exports = AudioTrack;
