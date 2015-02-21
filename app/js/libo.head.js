/*
 * libo.head.js
 * Head module for SPA
￼*/



/*jsLint          browser : true,  continue : true,
  devel  : true,  indent  : 2,     maxerr   : 50,
  newcap : true,  nomen   : true,  plusplus : true,
  regexp : true,  sloppy  : true,  vars     : false,
  white  : true   
*/


/*global $, libo */


libo.head = (function() {
	var 
		configMap = {
			main_html: String()
				+'<div class="libo-shell-head">'
					+'<div class="head-logo">logo</div>'
					+'<div class="head-search">'
						+'<input class="head-search-box" type="text" />'
						+'<input class="head-search-go" type="button" />'
					+'</div>'
					+'<div class="head-acct libo-x-group">'
						+'<div class="head-acct-msg">msg</div>'
						+'<div class="head-acct-user">user</div>'
						+'<div class="head-acct-dropdown">'
							+'<ul>'
								+'<li>item1</li><li>item2</li><li>item3</li><li>item4</li>'
							+'</ul>'
						+'</div>'
					+'</div>'
				+'</div><!-- libo-shell-head -->'
				+'<div class="libo-shell-nav">'
					+'<div class="nav-btn nav-btn-profile">profile</div>'
					+'<div class="nav-btn nav-btn-recent">recent</div>'
					+'<div class="nav-btn nav-btn-discover">discover</div>'
					+'<div class="nav-btn nav-btn-connection">connections</div>'
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