/*
 * libo.header.search.js
 * Head module for SPA
￼*/



/*jsLint          browser : true,  continue : true,
  devel  : true,  indent  : 2,     maxerr   : 50,
  newcap : true,  nomen   : true,  plusplus : true,
  regexp : true,  sloppy  : true,  vars     : false,
  white  : true   
*/


/*global $, libo */


libo.header.search = (function() {
	var 
		configMap = {
			main_html: String()
						+'<input class="header-search-box" type="text" />'
						+'<input class="header-search-go" type="button" />'

		},
		stateMap = {

		},
		jqueryMap = {

		},

		setJqueryMap,
		setup, run
		;

	setJqueryMap = function() {
		var $container = stateMap.$container;
		jqueryMap = { 
			$container : $container,
		};
	};

	setup = function() {

	};

	run = function($container) {
		stateMap.$container = $container;
		$container.html( configMap.main_html );
		setJqueryMap();
		return true;
	}

	return {
		run: run,
		setup: setup
	}
})();