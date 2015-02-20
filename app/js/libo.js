/*
 * libo.js
 * Root namespace module
￼*/



/*jsLint         browser : true,  continue : true,
  devel  : true,  indent : 2,      maxerr  : 50,
  newcap : true,   nomen : true,  plusplus : true,
  regexp : true,  sloppy : true,      vars : false,
  white  : true   
*/

/*global $, libo */


var libo = (function() {
	var run = function($container) {
		// housekeeping here ...
		// if we need to configure shell
		// we would invoke libo.shell.configModule first
		libo.shell.run( $container );
	};

	return { run : run };
})();