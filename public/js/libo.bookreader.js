/*
 * libo.chat.js
 * Chat feature module for SPA
*/

/*jslint         browser : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/

/*global $, libo */

libo.chat = (function() {
	//{{ module scope var
	var
		configMap = {
			main_html : String()
				+ '<div class="libo-chat">'
				+ 	'<div class="libo-chat-head">'
				+ 		'<div class="libo-chat-head-toggle">+</div>'
				+ 		'<div class="libo-chat-head-title">'
				+ 			'Chat'
				+ 		'</div>'
				+ 	'</div>'
				+ 	'<div class="libo-chat-closer">x</div>'
				+ 	'<div class="libo-chat-sizer">'
				+ 		'<div class="libo-chat-msgs"></div>'
				+ 		'<div class="libo-chat-box">'
				+ 			'<input type="text"/>'
				+ 			'<div>send</div>'
				+ 		'</div>'
				+ 	'</div>'
				+ '</div>',

			settable_map : {
				slider_open_time    : true,
				slider_close_time   : true,
				slider_opened_em    : true,
				slider_closed_em    : true,
				slider_opened_title : true,
				slider_closed_title : true,
				chat_model      : true,
				people_model    : true,
				set_chat_anchor : true
			},

			slider_open_time    : 250,
			slider_close_time   : 250,
			slider_opened_em    : 18,
			slider_closed_em    : 2,
			slider_opened_min_em: 10,
			window_height_min_em: 30,
			slider_opened_title : 'Click to close',
			slider_closed_title : 'Click to open',
			chat_model      : null,
			people_model    : null,
			set_chat_anchor : null
		},

		stateMap = {
			$append_target   : null,
			position_type    : 'closed',
			px_per_em        : 0,
			slider_hidden_px : 0,
			slider_closed_px : 0,
			slider_opened_px : 0
		},

		jqueryMap = {},
		setJqueryMap, getEmSize, setPxSizes, setSliderPosition, 
		onClickToggle,
		removeSlider, handleResize,
		setup, run
		;
	// module scope var}}

	//{{Utility methods
	getEmSize = function(elem) {
		return Number(
			getComputedStyle( elem, '' ).fontSize.match(/\d*\.?\d*/)[0]
		);
	};
	//Utility methods}}

	//{{DOM methods
	setJqueryMap = function() {
		var 
			$append_target = stateMap.$append_target,
			$slider = $append_target.find('.libo-chat');

		jqueryMap = {
			$slider : $slider,
			$head   : $slider.find( '.libo-chat-head' ),
			$toggle : $slider.find( '.libo-chat-head-toggle' ),
			$title  : $slider.find( '.libo-chat-head-title' ),
			$sizer  : $slider.find( '.libo-chat-sizer' ),
			$msgs   : $slider.find( '.libo-chat-msgs' ),
			$box    : $slider.find( '.libo-chat-box' ),
			$input  : $slider.find( '.libo-chat-input input[type=text]')
		};
	};

	setPxSizes = function() {
		var px_per_em, opened_height_em, window_height_em;

		px_per_em = getEmSize( jqueryMap.$slider.get(0) );

		window_height_em = Math.floor( ($(window).height()/px_per_em)+0.5);

		opened_height_em = window_height_em > configMap.window_height_min_em
						 ? configMap.slider_opened_em
						 : configMap.slider_opened_min_em;

		stateMap.px_per_em        = px_per_em;
		stateMap.slider_closed_px = configMap.slider_closed_em * px_per_em;
		stateMap.slider_opened_px = opened_height_em * px_per_em;

		jqueryMap.$sizer.css({
			height: ( opened_height_em - 2 ) * px_per_em
		});
	};


	///////////////////////////////////////////////////////////////////////////
	// Begin public method /handleResize/
	// Purpose : 
	//		Given a window resize event, adjust the presentation
	//		provided by this module if needed
	// Actions :
	// 		if the window height or width falls below a given threshold
	//		resize the chat slider for the reduced window size
	// Return : Boolean
	//	*	false - resize not considered
	//	*	true - resize considered
	// Throws : none
	//
	handleResize = function() {
		// dont resize anything if dont have a slider container
		if (! jqueryMap.$slider) {return false;}
		setPxSizes();
		if (stateMap.position_type === 'opened') {
			jqueryMap.$slider.css({height: stateMap.slider_opened_px});
		}
	};///////////////////////////////////////////////////////////////////////////



	///////////////////////////////////////////////////////////////////////////
	// Begin public method /setSliderPosition/
	//
	// Example : libo.chat.setSliderPosition('closed')
	// Purpose : Ensure chat slider is in the requested state
	// Arguments :
	// 	* position_type - enum('closed', 'open' or 'hidden')
	//	* callback - optional callback at the end of animation
	// 		(callback receives slider DOM element as argument)
	// Action:
	// 	Leaves slider in current state if it matches requested,
	//	otherwise animate to requested state
	// Returns :
	//	* true 	- requested state achieved
	//	* false - requested state not achieved
	// Throws : none
	setSliderPosition = function( position_type, callback ) {
		var 
			height_px, animate_time, slider_title, toggle_text;

		//return true if slider already in requested position
		if (stateMap.position_type === position_type) {
			return true;
		}

		// prepare animation parameters
		switch( position_type ) {
			case 'opened':
				height_px = stateMap.slider_opened_px;
				animate_time = configMap.slider_open_time;
				slider_title = configMap.slider_opened_title;
				toggle_text = '=';
			break;

			case 'hidden':
				height_px = 0;
				animate_time = configMap.slider_open_time;
				slider_title = '';
				toggle_text = '+';
			break;

			case 'closed':
				height_px = stateMap.slider_closed_px;
				animate_time = configMap.slider_close_time;
				slider_title = configMap.slider_closed_title;
				toggle_text = '+';
			break;

			// bail for unknown position_type
			default: return false;
		}

		// animate slider position change
		stateMap.position_type = '';//set to '' to prevent race condition
		jqueryMap.$slider.animate(
			{height: height_px},
			animate_time,
			function() {
				jqueryMap.$toggle.prop('title', slider_title);
				jqueryMap.$toggle.text(toggle_text);
				stateMap.position_type = position_type;
				if (callback) { callback( jqueryMap.$slider ); }
			}
		);

		return true;
	};///////////////////////////////////////////////////////////////////////////

	//DOM methods}}



	//{{Event Handler
	onClickToggle = function() {
		var set_chat_anchor = configMap.set_chat_anchor;
		if (stateMap.position_type === 'opened') {
			set_chat_anchor('closed');
		} else if (stateMap.position_type === 'closed') {
			set_chat_anchor('opened');
		}
		return false;
	}
	//Event Handler}}


	//{{Public methods

	///////////////////////////////////////////////////////////////////////////
	// Example : libo.chat.setup({ slider_open_em: 18 });
	// Purpose : Configure the module prior to initialization
	// Arguments :
	//	* set_chat_anchor - a callback to modify the URI anchor to
	//		indicate opened or closed state. return false if 
	//		the requested state cannot be met
	//	* chat_model - the chat model object provides methods
	//		to interact with our instant messaging
	//	* people_model - the people model object with provides
	//		methods to manage the list of people the model maintains
	//	* slider_* setting. All these are optional scalars.
	//		See mapConfig.settable_map for a full list
	//		Example: slider_open_em is the open height in ems
	// Action :
	// 	The internal configuration data structure (configMap) is 
	//	updated with provided arguments. No other actions are taken
	// Returns : true
	// Throws : Javascript error object and stack trace on
	//			unacceptable or missing arguments
	//
	setup = function( input_map ) {
		libo.util.setConfigMap({
			input_map : input_map,
			settable_map : configMap.settable_map,
			config_map : configMap
		});
		return true;
	};///////////////////////////////////////////////////////////////////////////


	///////////////////////////////////////////////////////////////////////////
	// Begin public method /run/
	// Example : libo.chat.run( $('#div_id') );
	// Purpose :
	// 		Directs Chat to offer its capacity to the user
	// Arguments :
	//		* $append_target (example : $('#div_id')).
	//		A jQuery collection that should represent
	//		a single DOM container
	// Action :
	// 		Appends the chat slider to the provided container and fills
	//		it with HTML content. It then initializes elements,
	//		events, and handlers to provide the user with a chat-room
	//		interface
	// Returns : true on success, false on failure
	// Throws : none
	//
	run = function($append_target) {
		$append_target.append( configMap.main_html );
		stateMap.$append_target = $append_target;
		setJqueryMap();
		setPxSizes();

		// initialize chat slider to default title and state
		jqueryMap.$toggle.prop('title', configMap.slider_closed_title);
		jqueryMap.$head.click( onClickToggle );
		stateMap.position_type = 'closed';
		return true;
	};///////////////////////////////////////////////////////////////////////////



	///////////////////////////////////////////////////////////////////////////
	// Begin public method /removeSlider/
	// Purpose : 
	//	*	removes chatSlider DOM element
	//	*	reverts to initial state
	//	* 	removes points to callbacks and other data
	// Arguments : none
	// Returns : none
	// Throws : none
	//
	removeSlider = function() {
		//unwind initialization and state
		//remove DOM container; this removes event bindsing too
		if (jqueryMap.$slider) {
			jqueryMap.$slider.remove();
			jqueryMap = {};
		}
		stateMap.$append_target = null;
		stateMap.position_type = 'closed'

		// unwind key configurations
		configMap.chat_model = null;
		configMap.people_model = null;
		configMap.set_chat_anchor = null;
		return true;
	};///////////////////////////////////////////////////////////////////////////


	//Public methods}}

	return {
		setSliderPosition : setSliderPosition,
		setup             : setup,
		run               : run,
		removeSlider      : removeSlider,
		handleResize      : handleResize
	};


})();




