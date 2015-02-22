/*
 * libo.header.acct.js
 * Head module for SPA
￼*/



/*jsLint          browser : true,  continue : true,
  devel  : true,  indent  : 2,     maxerr   : 50,
  newcap : true,  nomen   : true,  plusplus : true,
  regexp : true,  sloppy  : true,  vars     : false,
  white  : true   
*/


/*global $, libo */


libo.header.acct = (function() {
	var 
		configMap = {
			main_html_auth: String()
						+'<div class="header-acct-btn header-acct-msg">msg</div>'
						+'<div class="header-acct-btn header-acct-user">user</div>'
						+'<div class="header-acct-dropdown">'
							+'<ul>'
								+'<li>item1</li><li>item2</li><li>item3</li><li>item4</li>'
							+'</ul>'
						+'</div>'
			,
			main_html_unauth: String()
						+'<div class="header-acct-btn header-acct-login">login</div>'
						+'<div class="header-acct-dropdown">'
							+'<ul>'
								+'<li>item1</li><li>item2</li><li>item3</li><li>item4</li>'
							+'</ul>'
						+'</div>'
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
			$container : $container
		};
	};

	setup = function() {

	};

	run = function($container) {
		stateMap.$container = $container;
		$container.html( configMap.main_html_unauth );
		//$container.hide().slideDown();
		setJqueryMap();
		return true;
	}

	return {
		run: run,
		setup: setup
	}
})();