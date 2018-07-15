'use strict';

var cache = {};

module.exports = {
	query 		: queryWidth('querySelector'),
	queryAll 	: queryWidth('querySelectorAll')
}
	
	
function queryWidth(f) {
	return function(selector, element) {
		
		if (cache[selector]) return cache[selector];
		
		var element 	= element || document;
		cache[selector] = element[f](selector);
		
		return cache[selector];
	}
}