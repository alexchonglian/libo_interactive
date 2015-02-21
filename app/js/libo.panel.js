/*
 * libo.panel.js
 * Panel module for SPA
￼*/



/*jsLint          browser : true,  continue : true,
  devel  : true,  indent  : 2,     maxerr   : 50,
  newcap : true,  nomen   : true,  plusplus : true,
  regexp : true,  sloppy  : true,  vars     : false,
  white  : true   
*/


/*global $, libo */


libo.panel = (function() {
	var 
		configMap = {
			main_html: String()
				+'<div class="panel-upper">Structure and Interpretation of Computer Programs - 2nd Edition MIT</div>'
				+'<div class="panel-left">'
				+'</div>'
				+'<div class="panel-right">'
				+'</div>'
				+'<div class="panel-lower"></div>'
		},
		stateMap = {},
		jqueryMap = {},

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

