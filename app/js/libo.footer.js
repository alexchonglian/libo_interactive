/*
 * libo.footer.js
 * Head module for SPA
￼*/



/*jsLint          browser : true,  continue : true,
  devel  : true,  indent  : 2,     maxerr   : 50,
  newcap : true,  nomen   : true,  plusplus : true,
  regexp : true,  sloppy  : true,  vars     : false,
  white  : true   
*/


/*global $, libo */


libo.footer = (function() {
	var 
		configMap = {
			main_html: String()
			+ '<div class="footer">'
				+'<div class="footer-left">Copyright Feb 2015</div>'
				+'<div class="footer-right">alexchonglian@nyu.edu</div>'
			+ '</div>'

		},
		stateMap = {

		},
		jqueryMap = {

		},

		setJqueryMap,
		setup, run
		;

	//////////////////////////////////////////////////////////////////
	// TODO :
	//	add more stuff like contact and recruiting 
	//////////////////////////////////////////////////////////////////


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


