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
			$left: $container.find('.panel-left'),
			$right: $container.find('.panel-right'),
			$upper: $container.find('.panel-upper'),
			$lower: $container.find('.panel-lower')
		};
	};

	setup = function() {

	};

	run = function($container) {
		stateMap.$container = $container;
		$container.html( configMap.main_html );
		setJqueryMap();

		setTimeout(function() {
			jqueryMap.$left.hide();
			jqueryMap.$right.animate({width: "960px"}, 500);
			jqueryMap.$right.animate({width: "660px"}, 500, function() {jqueryMap.$left.show()});

		}, 500);
		return true;
	}

	return {
		run: run,
		setup: setup
	}
})();

