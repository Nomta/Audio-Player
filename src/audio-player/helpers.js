'use strict';

var helpers = {
	createElement: function(nodeName, className, content) {
		var elem = document.createElement(nodeName);
		if (className) elem.className = className;
		if (content) elem.innerHTML = content;
		return elem;
	}
}

module.exports = helpers;