'use strict';

var AudioTrack	= require('./audio-track'),
	AudioPlayer		= require('./audio-player'),
	PlayerSetter	= require('./player-setter');

function renderPlayList(options) {
	
	var options	= new PlayerSetter(options),
      player	= new AudioPlayer(options);
	
	var container			  = options.container,
		className 			  = options.className,
		tracks	 			    = options.tracks,
		getChildClassName = options.getChildClassName;
		
	tracks.forEach(function(trackName) {
		container.appendChild(renderTrack(trackName));
	});
	
	container.addEventListener('click', function(e) {

		var target  = e.target,
			button    = target.closest('button'),
			progress  = className ? 
				target.closest('.' + getChildClassName('progress-bar')) : 
				target.closest('.progress-bar');
			
		if (!(button || progress)) return;
	
		var trackElem = target.closest('[data-name]');
		
		if (button) player.controlPlayback(trackElem);
		else player.handlePlaybackPosition(trackElem, e);
	});
	
	function renderTrack(trackName) {
		return new AudioTrack(options).render(trackName);
	}
}
 
module.exports = renderPlayList;