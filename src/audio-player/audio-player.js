'use strict';

var AudioPlayer 	= ya.music.Audio,
	audioPlayer 	= new AudioPlayer();
	
var getUrl, getModifierClassName, getChildClassName, changeTrackState, progress;
	
module.exports = function(options) {
	
	this.controlPlayback 			= controlPlayback,
	this.handlePlaybackPosition		= handlePlaybackPosition;
		
	function controlPlayback(trackElem) {
		
		getUrl 					      = options.getUrl,
		getModifierClassName 	= options.getModifierClassName,
		getChildClassName 		= options.getChildClassName,
		changeTrackState		  = options.changeTrackState;
		
		
		var state		= audioPlayer.getState(),
			isTarget 	= currentTrack === trackElem;
		
		if (isTarget && state === 'playing')
			pause();
		
		else if (isTarget && state === 'paused') 
			resume();
		
		else play(trackElem);
		
			
		function pause() {
			audioPlayer.pause().then(updateState);
		}	
		function resume() {
			audioPlayer.resume().then(updateState);
		}
		function play(trackElem) {
			var track = getUrl(trackElem.getAttribute('data-name'));
				
			if (currentTrack) resetState();
			
			currentTrack = trackElem;
			progress = currentTrack.getElementsByClassName(getChildClassName('progress-bar'))[0];
			
			updatePlaybackPosition();
			
			if (audioPlayer.isPreloaded(track)) 
				audioPlayer.playPreloaded(track).then(updateState, showErr);
			else audioPlayer.play(track).then(updateState, showErr);
		}
		
		
		function resetState() {
			changeTrackState('reset');
		}
    
    function updateState() {
			changeTrackState(audioPlayer.getState());
    }
    
    function showErr() {
      changeTrackState('error');
    }
	
		function updatePlaybackPosition() {
			
			var current = progress.getElementsByClassName(getChildClassName('progress-bar__current'))[0];
				
			audioPlayer.on(ya.music.Audio.EVENT_PROGRESS, function(timings) {
				current.style.width = (timings.position / timings.duration * 100).toFixed(2) + "%";
			});
		}
	
		audioPlayer.on(ya.music.Audio.EVENT_LOADED, function() {
			
			var track, nextTrack = currentTrack.nextElementSibling;
			
			if (nextTrack) {
				track = getUrl(nextTrack.getAttribute('data-name'));
				audioPlayer.preload(track);
			}
		});
		
		audioPlayer.on(ya.music.Audio.EVENT_ENDED, function() {
			
			var nextTrack = currentTrack.nextElementSibling;
			if (nextTrack) play(nextTrack)();
			else resetState();
		});
	}
	
	
	function handlePlaybackPosition(trackElem, e) {
			
		if (trackElem !== currentTrack) return;
			
		var fullWidth = progress.offsetWidth,
			offset = handleOffset(progress);
		
		var relativePosition = Math.max(0, Math.min(1, ((e.pageX || e.screenX) - offset) / fullWidth)),
			duration = audioPlayer.getDuration();
		
		audioPlayer.setPosition(duration * relativePosition);
	
		function handleOffset(node) {
			var offset = node.offsetLeft;
			if (node.offsetParent) 
				offset += handleOffset(node.offsetParent);
			return offset;
		};
	}
}