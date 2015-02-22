/*
 * libo.header.js
 * Head module for SPA
￼*/



/*jsLint          browser : true,  continue : true,
  devel  : true,  indent  : 2,     maxerr   : 50,
  newcap : true,  nomen   : true,  plusplus : true,
  regexp : true,  sloppy  : true,  vars     : false,
  white  : true   
*/


/*global $, libo */


libo.header = (function() {
	var 
		configMap = {
			main_html: String()
				+'<div class="libo-shell-header">'
					+'<div class="header-logo">LOGO</div>'
					+'<div class="header-search">'
					+'</div>'
					+'<div class="header-acct libo-x-group">'
					+'</div>'
				+'</div><!-- libo-shell-header -->'
				+'<div class="libo-shell-nav">'
				+'</div><!-- libo-shell-nav -->'

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
			$search: $container.find('.header-search'),
			$acct: $container.find('.header-acct'),
			$nav: $container.find('.libo-shell-nav')
		};
	};

	setup = function() {

	};

	run = function($container) {
		stateMap.$container = $container;
		$container.html( configMap.main_html );
		setJqueryMap();

		libo.header.search.run( jqueryMap.$search 	);
		libo.header.acct.run( 	jqueryMap.$acct 	);
		libo.header.nav.run( 	jqueryMap.$nav 		);

		return true;
	}

	return {
		run: run,
		setup: setup
	}
})();