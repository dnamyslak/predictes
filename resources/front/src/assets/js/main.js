$(function() {

    var prevWindowMode = null,
        windowWidth = $(window).width();
    
    $(window).on('resize.rwd', function(e) {
    	var windowMode = 0;

    	windowWidth = $(window).width();

    	if (windowWidth > 1199) {
    		windowMode = 0;
        } else {
    		windowMode = 1;
    	}
    	
        if (windowMode != prevWindowMode)
        {
            prevWindowMode = windowMode;
            switch (windowMode)
            {
                case 0:
                    $('html').removeClass('is-menu-open');
                    closeMobileNavPanel();
                    break;
                 case 1:
                    break;
            }
        } 
    }).trigger('resize.rwd');






    //dropdown //

    // hover
    $(document).on({
        mouseenter: function () {

            var dropdown = $(this).closest('.js-dropdown');

            if (!dropdown.hasClass('is-dropdown-open'))
                $('.js-dropdown.is-dropdown-open').removeClass('is-dropdown-open');

            dropdown.addClass('is-dropdown-open');
        },
        mouseleave: function () {
            var dropdown = $(this).closest('.js-dropdown');
            dropdown.removeClass('is-dropdown-open');
        }
    }, ".js-dropdown-trigger");





    // MOBILE NAV

    $(document).on('click', '.js-mobile-menu', function() {
        if (!$('html').hasClass('is-menu-open'))
            openMobileNavPanel();
        else
            closeMobileNavPanel();
    });

    $(document).on('click', '.js-mobile-nav-trigger', function(e) {
        var $parentItem = $(this).closest('li'),
            $submenu = $parentItem.find('.js-mobile-subnav').first();

        $parentItem.toggleClass('is-expanded');
        $submenu.slideToggle();

        e.preventDefault();
    });


});


$(window).on('load', function() {


});




function openMobileNavPanel() {
    calculateMobileNavPanelHeight();
    $('html').addClass('is-menu-open');
    $('.js-mobile-nav-panel-wrapper').slideDown(250);
}

function closeMobileNavPanel() {
    $('.js-mobile-nav-panel-wrapper').slideUp(250, function() {
        $('html').removeClass('is-menu-open');
    });
    closeAllMobileSubs();
}


function calculateMobileNavPanelHeight() {
    var menuTopOffset = $('.js-top').outerHeight();
    $('.js-mobile-nav-panel').attr('style', 'max-height: calc(100vh - ' + menuTopOffset + 'px)');
}

function closeAllMobileSubs() {
    var $expandedItems = $('.mobile-nav').find('.is-expanded');
    $expandedItems.removeClass('is-expanded');
    $expandedItems.children('.js-mobile-subnav').slideUp();
}