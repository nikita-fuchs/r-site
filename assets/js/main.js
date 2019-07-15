// IE SVG polyfill
svg4everybody();

// Remove touch devices tap delay
$(function () {
    FastClick.attach(document.body);
});

// Detect window width
var isMobile_Tablet = false;
var window_width = $(window).width();

function check_window_width() {
    if (window_width < 1024) {
        isMobile_Tablet = true;
    } else {
        isMobile_Tablet = false;
    }
    return window_width;
}

check_window_width();

var init_delay = true;
$(window).resize(function () {
    if ($(window).width() != window_width && init_delay) {
        window_width = $(window).width();
        init_delay = false;
        setTimeout(function () {
            check_window_width();
            resize_functions();
            init_delay = true
        }, 100);
    }
});

function resize_functions() {
    $('.nav').addClass('no-anim').removeClass('open');
    $('.menu-toggle').removeClass('open');
    $('.message-overlay').find('.close-button').click();
    check_header_top();
}

function open_menu() {
    $('.nav').addClass('open').removeClass('no-anim');
    $('.menu-toggle').addClass('open');
    $('html').addClass('menu-open');

    setTimeout(function () {
        $('.nav').addClass('no-anim');
        $('html').addClass('height-auto');
    }, 301);
}

function close_menu() {
    $('.nav').removeClass('open no-anim');
    $('.menu-toggle').removeClass('open');
    $('html').removeClass('height-auto');

    setTimeout(function () {
        $('.nav').addClass('no-anim');
        $('html').removeClass('menu-open');
    }, 301);
}

// Fixed header
var header_top;

function check_header_top() {
    header_top = parseFloat($('#main-header').css('top'));
}

check_header_top();

$(window).scroll(function () {
    var height = $(window).scrollTop();

    if (height > header_top) {
        $('body').addClass('header-fixed');
    } else {
        $('body').removeClass('header-fixed');
        check_header_top();
    }
});
$(document).ready(function () {
    // Menu Toggle
    $('.menu-toggle').click(function () {
        if ($('.nav').hasClass('open')) {
            close_menu();
        } else {
            open_menu();
        }
    });

    // Overlay Close
    $('.message-overlay').find('.close-button').click(function () {
        $('.message-overlay').hide();
        $('html').removeClass('overlay-open');
    });

    $(document).keyup(function (e) {
        if (e.key === "Escape") {
            $('.message-overlay').find('.close-button').click();
        }
    });

    // Impressum overlay
    $('#main-footer').on('click', '.impressum-link', function () {
        $('#impressum-overlay').show();
        $('html').addClass('overlay-open');
    });

    // Charts view more
    $('#chart').on('click', '.view-more', function () {
        var long_desc = $(this).closest('p').find('.long-desc').html();
        $('#chart-overlay').find('p').html(long_desc);
        $('#chart-overlay').show();
        $('html').addClass('overlay-open');
    });

    // Team view more
    $("#team .team-list li p").each(function () {
        $(this).attr('data-original', $(this).contents().get(0).nodeValue);
    });
    $('#team').on('click', '.view-more', function () {
        var p = $(this).closest('p').attr('data-original');
        var h6 = $(this).closest('li').find('h6').html();
        $('#team-overlay').find('p').html(p);
        $('#team-overlay').find('h6').html(h6);
        $('#team-overlay').show();
        $('html').addClass('overlay-open');
    });

    // Team three dots
    $("#team .team-list li p").dotdotdot({
        callback: function (isTruncated) {
            if ($(this).hasClass('ddd-truncated')) {
                $(this).find('a').removeClass('hidden');
            } else {
                $(this).find('a').addClass('hidden');
            }
        },
        keep: $('#team .team-list li .view-more'),
        watch: "window",
        height: "watch"
    });

    // Nav scroll
    $('#main-header .nav').onePageNav({
        filter: ':not(.external)',
        begin: function () {
            close_menu();
        }
    });

    $('#main-footer').find('a.scroll-link').click(function () {
        $('#main-header').find('a[data-href="' + $(this).attr('data-href') + '"]').click();
    });
});

$(window).load(function () {
    // Charts Load
    $('.charts-container').addClass('loaded');
    $('.charts-container').find('.loader').addClass('hidden');
});