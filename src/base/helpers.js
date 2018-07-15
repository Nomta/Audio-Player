'use strict';

var dom = require('./dom-cache');	

var elementPrototypes 	= [
	Element.prototype, 
	Document.prototype, 
	DocumentFragment.prototype
];

var helpers = {
	
	createElement: function(nodeName, className, content) {
		var elem = document.createElement(nodeName);
		if (className) elem.className = className;
		if (content) elem.innerHTML = content;
		return elem;
	},

	getNodeFromSelector: getNodesWith(dom.query),
	getNodesFromSelector: getNodesWith(dom.queryAll)
}

function getNodesWith(f) {
	return function(value) {
		if (typeof value === 'string') return f(value);
		return value;
	}
}

module.exports = helpers;