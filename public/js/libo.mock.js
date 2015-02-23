$(function() {
	$('.head-acct-dropdown').hide();
	$('.head-acct-user').mouseenter(function(){
		$('.head-acct-dropdown').show();
	});
	$('.head-acct-msg').mouseenter(function(){
		$('.head-acct-dropdown').show();
	});
	$('.head-acct').mouseleave(function(){
		$('.head-acct-dropdown').hide();
	});

/*
	$('.nav-btn-discover').click(function() {
		$('.libo-shell-bookreader').css({
			background: 'red',
			opacity: 0.5,
			position: 'absolute', 
			top: 0, 
			bottom:0, 
			left: 0, 
			right: 0
		});
	})
*/
	$('.head-search-box').on('focus', function() { 
		$(this).animate({ width: '300px' }, 300);
	})
	$('.head-search-box').on('blur', function() {
		$(this).animate({ width: '200px' }, 200);
	})
})