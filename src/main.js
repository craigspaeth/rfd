var TOP_PADDING = 100,
    MACBOOK_HEIGHT = 500,
    DEBOUNCE_INT = 100;

$(function() {
  var bgImg = new Image
  bgImg.src = '/images/brick.jpg'
  bgImg.onload = function() {
    $('body').removeClass('body-init');
  }
  $(window).on('scroll', _.throttle(popLockMacbook, DEBOUNCE_INT));
  $(window).on('scroll', _.throttle(highlightNav, DEBOUNCE_INT));
  $(window).on('scroll', _.throttle(fadeInHeader, DEBOUNCE_INT));
  $(window).on('resize', _.debounce(resizeHomeToViewport, DEBOUNCE_INT));
  resizeHomeToViewport();
  if (navigator.userAgent.match('Safari') && navigator.userAgent.match('Version/5')) {
    $('html').addClass('safari5');
  }
});

// 
// Pop lock the macbook on scroll
// 
var popLockMacbook = function() {
  var $els = $($('.web-container').get().reverse());
  $els.each(function() {
    if (relativeToEl(this) == 'between') {
      $(this).removeClass('web-end').addClass('web-fixed');
    } else if (relativeToEl(this) == 'past') {
      $(this).removeClass('web-fixed').addClass('web-end');
    } else if (relativeToEl(this) == 'before') {
      $(this).removeClass('web-fixed web-end')
    }
  });
};

var relativeToEl = function(el) {
  var $el = $(el),
      winTop = $(window).scrollTop(),
      winBottom = $(window).scrollTop() + $(window).height(),
      elTop = $el.offset().top,
      elBottom = $el.offset().top + $el.height();
  if (winTop + TOP_PADDING > elTop && winTop + MACBOOK_HEIGHT + TOP_PADDING <= elBottom) {
    return 'between';
  } else if(winTop + MACBOOK_HEIGHT + TOP_PADDING >= elBottom) {
    return 'past';
  } else if(winTop < elTop) {
    return 'before';
  }
}

//
// Clicking play runs the campari video
// 
$('#campari-video-play').click(function() {
  $('#campari-video-player').show()[0].play()
});

// 
// Homepage hero unit scales to the height of the viewport
// 
var resizeHomeToViewport = function() {
  $('#home, #footer-container').height($(window).height());
}

// 
// Highlight nav section as you scroll
//  
var highlightNav = function() {
  var $els = $($('.large-header').get().reverse());
  $('#header nav a').removeClass('nav-active');
  if (($(window).height() + $(window).scrollTop() >= $(document).height())
      || ($(window).scrollTop() + 220 > $("#footer").offset().top)) {
    $('#header nav a:last-child').addClass('nav-active');
  } else {
    $els.each(function(i) {
      if (relativeToEl(this) == 'between' || relativeToEl(this) == 'past' && !$('.nav-active').length) {
        $('#header nav a:nth-child(' + ($els.length - i + 1) + ')').addClass('nav-active');
      }
    });
  }
}

// 
// Fade in the header as you scroll
// 
var fadeInHeader = function() {
  $('#header').css({ opacity: $(window).scrollTop() / $(window).height() });
}

// 
// Animate scroll to id
// 
var scrollToEl = function($el) {
  $('html, body').animate({ scrollTop: $el.offset().top }, 1000);
}
$('#home-down-arrow').click(function() {
  scrollToEl($('#campari'));
});
$('#header nav a').click(function() {
  scrollToEl($($(this).attr('href')));
  return false
});