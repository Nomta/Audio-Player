'use strict';

var changeTrackState = function(options) {
	
	var buttonText, buttonStates, getModifierClassName;
	
	buttonText = Array.isArray(options.buttonText) && 
		options.buttonText.length === 2 ?  
		options.buttonText : '';
	
	buttonStates = buttonText ? {
	    paused: buttonText[0],
		playing: buttonText[1]
	} : null;
						
	getModifierClassName = options.getModifierClassName;
		
	function changeState(newState) {
		switch(newState) {
			case 'paused': 
				changeClass('playing', 'paused');
				changeButton('paused');
				break;
			
			case 'playing': 
				changeClass('paused', 'playing');
				changeButton('playing');
				break;
				
			default: 
				currentTrack.classList.remove(
					getModifierClassName('playing'), 
					getModifierClassName('paused')
				);
				changeButton('paused');
				break;
		}
	}
	
	function changeClass(currentState, newState) {
		var current	= getModifierClassName(currentState),
			target = getModifierClassName(newState);
		
		currentTrack.classList.remove(current);
		currentTrack.classList.add(target);
	}
	
	function changeButton(newState) {
		if (!buttonText) return;
		var button = currentTrack.querySelector('button');
		button.innerHTML = buttonStates[newState];	
	}
	
	return changeState;
}

module.exports = changeTrackState;