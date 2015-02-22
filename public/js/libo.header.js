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
	"use strict";
	var 
		configMap = {
			main_html: String()
				+'<div class="libo-shell-header">'
					+'<div class="header-logo">logo</div>'
					+'<div class="header-search">'
						+'<input class="header-search-box" type="text" />'
						//+'<input class="header-search-go" type="button" />'
					+'</div>'
					+'<div class="header-acct libo-x-group">'
						+'<div class="header-acct-btn header-acct-msg">msg</div>'
						+'<div class="header-acct-btn header-acct-user">user</div>'
						+'<div class="header-acct-btn header-acct-login">login</div>'
						+'<div class="header-acct-dropdown" style="display:none">'
							+'<ul>'
								+'<li>Create new writing</li>'
								+'<li>Manage account</li>'
								+'<li>Stub</li>'
								+'<li class="header-acct-logout">Logout</li>'
							+'</ul>'
						+'</div>'
					+'</div>'
				+'</div><!-- libo-shell-header -->'
				+'<div class="libo-shell-nav">'
					+'<div class="nav-btn nav-btn-profile">profile</div>'
					+'<div class="nav-btn nav-btn-recent">recent</div>'
					+'<div class="nav-btn nav-btn-discover">discover</div>'
					+'<div class="nav-btn nav-btn-connection">connection</div>'
				+'</div><!-- libo-shell-nav -->'



		},
		stateMap = {
			
		},
		jqueryMap = {

		},

		setJqueryMap,
		onLoginCompleted, onLogoutCompleted,
		setup, run
		;

	setJqueryMap = function() {
		var $container = stateMap.$container;
		jqueryMap = { 
			$container:$container,
			$search: $container.find('.header-search'),
			$acct: $container.find('.header-acct'),
			$nav: $container.find('.libo-shell-nav'),

			$msg: $container.find('.header-acct-msg'),
			$user: $container.find('.header-acct-user'),
			$login: $container.find('.header-acct-login'),
			$logout: $container.find('.header-acct-logout'),
			$dropdown: $container.find('.header-acct-dropdown'),

			$recent: $container.find('.nav-btn-recent'),
			$profile: $container.find('.nav-btn-profile'),
			$discover: $container.find('.nav-btn-discover'),
			$connection: $container.find('.nav-btn-connection'),

			$searchbox: $container.find('.header-search-box')
		};
	};

	//[[Event Handler

	onLoginCompleted = function(event, login_user) {
		jqueryMap.$user.text(login_user);
		jqueryMap.$dropdown.hide();
		jqueryMap.$login.hide();
		jqueryMap.$msg.show();
		jqueryMap.$user.show();
		jqueryMap.$profile.show();
		jqueryMap.$recent.show();
		jqueryMap.$connection.show();
		return true;
	};

	onLogoutCompleted = function(event) {
		jqueryMap.$user.text("user");
		jqueryMap.$dropdown.hide();
		jqueryMap.$login.show();
		jqueryMap.$msg.hide();
		jqueryMap.$user.hide();
		jqueryMap.$profile.hide();
		jqueryMap.$recent.hide();
		jqueryMap.$connection.hide();
		return true;
	};	
	//Event Handler]]

	setup = function() {

	};

	run = function($container) {
		stateMap.$container = $container;
		$container.html( configMap.main_html );
		setJqueryMap();

		jqueryMap.$msg.hide();
		jqueryMap.$user.hide();
		jqueryMap.$dropdown.hide();
		jqueryMap.$profile.hide();
		jqueryMap.$recent.hide();
		jqueryMap.$connection.hide();
		jqueryMap.$container.on('mouseleave', function() {jqueryMap.$dropdown.hide();})
		jqueryMap.$msg.on('mouseenter', function() { jqueryMap.$dropdown.show(); });
		jqueryMap.$user.on('mouseenter', function() { jqueryMap.$dropdown.show(); });
		jqueryMap.$login.on('click', function() { $.gevent.publish('login-requested', []); });
		jqueryMap.$logout.on('click', function() { $.gevent.publish('logout-requested', []); });

		$.gevent.subscribe($container, 'login-completed', onLoginCompleted);
		$.gevent.subscribe($container, 'logout-completed', onLogoutCompleted);


		return true;
	}

	return {
		run: run,
		setup: setup
	}
})();