/*
 * libo.header.nav.js
 * Head module for SPA
￼*/



/*jsLint          browser : true,  continue : true,
  devel  : true,  indent  : 2,     maxerr   : 50,
  newcap : true,  nomen   : true,  plusplus : true,
  regexp : true,  sloppy  : true,  vars     : false,
  white  : true   
*/


/*global $, libo */


libo.header.nav = (function() {
	var 
		configMap = {
			main_html_auth: String()
					+'<div class="nav-btn nav-btn-profile">profile</div>'
					+'<div class="nav-btn nav-btn-recent">recent</div>'
					+'<div class="nav-btn nav-btn-discover">discover</div>'
					+'<div class="nav-btn nav-btn-connection">connections</div>'
			,
			main_html_unauth: String()
					+'<div class="nav-btn nav-btn-discover">discover</div>'

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
		$container.html( configMap.main_html_auth );
		setJqueryMap();
		return true;
	}

	return {
		run: run,
		setup: setup
	}
})();