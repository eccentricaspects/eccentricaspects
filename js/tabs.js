var $j = jQuery.noConflict();

$j(document).ready(function() {
// setting the tabs in the sidebar hide and show, setting the current tab
	$j('div.tabbed div').hide();
	$j('div.t1').show();
	$j('#home-categories div.post').show();
	$j('#home-categories div.entry').show();
	$j('#home-categories div.c').hide();
	$j('#home-categories div.c1').show();
	$j('div.tabbed ul.tabs li.t1 a').addClass('tab-current');
	$j('div.tabbed ul.tabs li.c1 a').addClass('tab-current');
	$j('div.tabbed ul li a').css('cursor', 'pointer');

// SIDEBAR TABS
$j('.tabs-block div.tabbed ul.tabs li a').click(function(){
	var thisClass = this.className.slice(0,2);
	$j('.tabs-block div.tabbed div').hide();
	$j('.tabs-block div.' + thisClass).show();
	$j('.tabs-block div.tabbed ul.tabs li a').removeClass('tab-current');
	$j(this).addClass('tab-current');
	});

// CATEGORY TABS
$j('#home-categories div.tabbed ul.tabs li a').click(function(){
	var categoryClass = this.className.slice(0,2);
	$j('#home-categories div.tabbed div.c').hide();
	$j('#home-categories div.' + categoryClass).show();
	$j('#home-categories div.tabbed ul.tabs li a').removeClass('tab-current');
	$j(this).addClass('tab-current');
	});
});