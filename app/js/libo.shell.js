/*
 * libo.shell.js
 * Shell module for SPA
￼*/



/*jsLint          browser : true,  continue : true,
  devel  : true,  indent  : 2,     maxerr   : 50,
  newcap : true,  nomen   : true,  plusplus : true,
  regexp : true,  sloppy  : true,  vars     : false,
  white  : true   
*/


/*global $, libo */


libo.shell = (function() {

	//[[ Module Scope Variables
	var 
		configMap = { // static
			anchor_schema_map : {
				chat: {opened : true, closed: true}
			},
			main_html: String()
			+'<div class="libo-shell-top">'
			+'</div><!-- libo-shell-top -->'
			+'<div class="libo-shell-panel libo-x-group">'
			+'</div><!-- libo-shell-panel -->	'
			+'<div class="libo-shell-bottom">'
			+'</div>'
			+'<div class="libo-shell-bookreader">'
			+'</div>'
				,
			chat_extend_time: 300,
			chat_retract_time: 300,
			chat_extend_height: 450,
			chat_retract_height: 15,
			chat_extend_title: 'Click to retract',
			chat_retract_title: 'Click to extend',
			resize_interval: 200
		},

		stateMap = {  //dynamic
			$container: undefined,
			anchor_map: {},
			count : 0,
			resize_idto: undefined
		},

		jqueryMap = {},// cache DOM elements

		// hoisted functions
		copyAnchorMap, setJqueryMap,
		changeAnchorPart, onHashchange, onResize, testNow, 
		setChatAnchor, run;
	//Module Scope Variables ]]



	//[[ Utility Methods
	copyAnchorMap = function () {
		return $.extend( true, {}, stateMap.anchor_map );
	};
	//Utility Methods ]]


	//[[ DOM Methods
	setJqueryMap = function() {
		var $container = stateMap.$container;
		jqueryMap = { 
			$container : $container,
			$top : $container.find('.libo-shell-top'),
			$panel : $container.find('.libo-shell-panel'),
			$bottom: $container.find('.libo-shell-bottom')
		};
	};


	// DOM method /changeAnchorPart/
	// Purpose : Changes part of the URI anchor component
	// Arguments:
	//   * arg_map - The map describing what part of the URI anchor
	//     we want changed.
	// Returns : boolean
	//   * true - the Anchor portion of the URI was update
	//   * false - the Anchor portion of the URI could not be updated
	// Action :
	//   The current anchor rep stored in stateMap.anchor_map.
	//   See uriAnchor for a discussion of encoding.
	//   This method
	//		* Creates a copy of this map using copyAnchorMap().
	//		* Modifies the key-values using arg_map.
	//		* Manages the distinction between independent
	//       and dependent values in the encoding.
	//		* Attempts to change the URI using uriAnchor.
	//		* Returns true on success, and false on failure.
	changeAnchorPart = function( arg_map ) {
		var 
			anchor_map_revise = copyAnchorMap(),
			bool_return = true,
			key_name, key_name_dep;

		//[[merge changes into anchor map
		KEYVAL:
		for ( key_name in arg_map ) {
			if (arg_map.hasOwnProperty(key_name)) {

				// skip dependent keys during iteration
				if (key_name.indexOf('_') === 0) { continue KEYVAL; }

				// update independent key value
				anchor_map_revise[key_name] = arg_map[key_name];

				// update matching dependent key
				key_name_dep = '_' + key_name;
				if ( arg_map[key_name_dep] ) {
					anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
				} else {
					delete anchor_map_revise[key_name_dep];
					delete anchor_map_revise['_s' + key_name_dep];
				}
			}
		}
		//merge changes into anchor map]]

		//[[attemp to update URI; revert if fail
		try {
			$.uriAnchor.setAnchor( anchor_map_revise );
		} catch (error) {
			$.uriAnchor.setAnchor( stateMap.anchor_map, null, true );
			bool_return = false;
		}
		// attemp to update URI; revert if fail]]

		return bool_return;
	};

	//DOM Methods ]]


	//[[ Event Handlers

	// Begin Event handler /onHashchange/
	// Purpose : Handles the hashchange event. API for bookmarkable states
	// Arguments:
	//   * event - jQuery event object.
	// Settings : none
	// Returns  : false
	// Action   :
	//   * Parses the URI anchor component
	//   * Compares proposed application state with current
	//   * Adjust the application only where proposed state
	//     differs from existing and is allowed by anchor schema
	//
	onHashchange = function( event ) {
		var 
			_s_chat_previous, 
			_s_chat_proposed, 
			s_chat_proposed,
			anchor_map_proposed,
			is_ok = true;
			anchor_map_previous = copyAnchorMap;

		// attempt to parse anchor
		try { anchor_map_proposed = $.uriAnchor.makeAnchorMap(); }
		catch (error) {
			$.uriAnchor.setAnchor( anchor_map_previous, null, true );
			return false;
		}
		stateMap.anchor_map = anchor_map_proposed;

		// convenience vars
		_s_chat_previous = anchor_map_previous._s_chat;
		_s_chat_proposed = anchor_map_proposed._s_chat;

		//[[adjust chat component if chagned
		if ( ! anchor_map_previous || _s_chat_previous !== _s_chat_proposed ) {
			s_chat_proposed = anchor_map_proposed.chat;
			switch ( s_chat_proposed ) {
				case 'opened':
					is_ok = libo.chat.setSliderPosition( 'opened' );
					break;
				case 'closed':
					is_ok = libo.chat.setSliderPosition( 'closed' );
					break;
				default:
					libo.chat.setSliderPosition( 'closed' );
					delete anchor_map_proposed.chat;
					$.uriAnchor.setAnchor( anchor_map_proposed, null, true );
			}
		}
		//adjust chat component if chagned]]

		// revert anchor is slider change denied
		if ( !is_ok ) {
			if ( anchor_map_previous ) {
				$.uriAnchor.setAnchor( anchor_map_previous, null, true );
				stateMap.anchor_map = anchor_map_previous;
			} else {
				delete anchor_map_proposed.chat;
				$.uriAnchor.setAnchor( anchor_map_proposed, null, true );
			}
		}

		return false;
	};

	//Event Handlers ]]


	//[[Callback Methods
	// Begin callback method /setChatAnchor/
	// Example : setChatAnchor('closed')
	// Purpose : Change the chat component of the anchor
	// Arguments :
	//	* position_type - may be 'closed' or 'opened'
	// Action :
	//	Change the URI anchor parameter 'chat' to the requested
	//	value if possible
	// Returns :
	//	* true  - requested anchor part was updated
	//	* false - requested anchor part was not updated 
	// Throws : none
	setChatAnchor = function( position_type ) {
		return changeAnchorPart({ chat: position_type });
	};
	//Callback Methods]]


	//[[Public Methods
	// Example : libo.shell.run( $('#app_div_id') );
	// Purpose :
	//		Directs the Shell to offer its capability to the user
	// Arguments :
	// 	* 	$container (example: $('#app_div_id') )
	//		A jquery collection that should represent
	//		a single DOM container
	// Action:
	//		Populates $container with the shell of UI
	//		and then configures and initializes feature modules
	//		The shell is also responsible for browser-wide issues
	//		such as URI anchor and cookie management
	// Returns : none
	// Throws : none
	//

	testNow = function(event) {
		//event.stopPropagation();
		//event.preventDefault();
		console.log(document.location.href);
		console.log(event);
		stateMap.count += 1;
		return false;
	};
	//	$(window).bind('hashchange', testNow);
	//if (stateMap.count === 0) {document.location.href = '#page=1';}

	run = function( $container ) {
		// load html and map jquery collections
		stateMap.$container = $container;
		$container.html( configMap.main_html );
		setJqueryMap();

		

		libo.header.run( jqueryMap.$top );
		libo.panel.run( jqueryMap.$panel );
		libo.footer.run( jqueryMap.$bottom );
		//libo.reader.run( jqueryMap.$container );

		

	};
	//Public Methods]]


	return { run : run };

})();

