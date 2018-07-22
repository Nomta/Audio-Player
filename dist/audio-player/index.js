var AudioPlayer =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var AudioPlayer = __webpack_require__(1);

module.exports = AudioPlayer;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var AudioTrack	= __webpack_require__(2),
	AudioPlayer		= __webpack_require__(4),
	PlayerSetter	= __webpack_require__(5);

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers 		= __webpack_require__(3),
	createElement = helpers.createElement;

function AudioTrack(options) {
	
	var className 			= options.className,
		buttonText 			  = options.buttonText,
		getChildClassName = options.getChildClassName;
		
	var initButtonText	= Array.isArray(buttonText) && buttonText.length === 2 ? buttonText[0] : '';
		
	var render = function(trackName) {
		var track, playButton, trackTitle, progressBar, current;
		
		track 		  = createElement('div', className);
		playButton 	= createElement('button', getChildClassName('play-button'), initButtonText);
		trackTitle 	= createElement('p', getChildClassName('track-title'), trackName);
		
		progressBar = createElement('div', getChildClassName('progress-bar'));
		current 	  = createElement('div', getChildClassName('progress-bar__current'));
		
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

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var helpers = {
	createElement: function(nodeName, className, content) {
		var elem = document.createElement(nodeName);
		if (className) elem.className = className;
		if (content) elem.innerHTML = content;
		return elem;
	}
}

module.exports = helpers;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var trackState = __webpack_require__(6);
	
var playerSetter = function(options) {
	
	this.tracks			  = options.tracks		|| [],	
	this.className		= options.className		|| '',
	this.buttonText		= 'buttonText' in options ? 
						options.buttonText 		: ['Play', 'Pause'],
	this.container		= options.container		|| document.body;

	var pathName	= options.pathName	|| '',
      ext			  = options.ext			  || '.mp3';
		
	window.currentTrack = '';
		
	var getChildClassName  	= addClass.bind(this, '__'),
		getModifierClassName 	= addClass.bind(this, '--');
	
	function addClass(separator, subClassName) {
		if (this.className) return this.className + separator + subClassName;
		return subClassName;
	}
	
	function getUrl(trackName) {
		return pathName + trackName + ext;
	}

	this.getModifierClassName = getModifierClassName,
	this.getChildClassName  	= getChildClassName,
	this.changeTrackState		  = trackState(this),
	this.getUrl 				      = getUrl;
}

module.exports = playerSetter;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
			
			case 'error': 
				currentTrack.classList.add(
          getModifierClassName('error')
        );
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

/***/ })
/******/ ]);