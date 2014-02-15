var TOP_PADDING = 100,
    DEBOUNCE_INT = 100,
    macbookHeight,
    $window,
    $webcontainers,
    $largeheaders,
    isIphone,
    isIpad;

$(function() {
  
  // Cache selectors
  $window = $(window);
  $webcontainers = $($('.web-container').get().reverse());
  $largeheaders = $($('.large-header').get().reverse());

  // Hide content until the brick bg is loaded
  var bgImg = new Image;
  bgImg.src = '/images/brick.jpg';
  bgImg.onload = function() {
    $('body').removeClass('body-init');
  }

  // Detect Safari 5
  if (navigator.userAgent.match('Safari') && navigator.userAgent.match('Version/5')) {
    $('html').addClass('safari5');
  }

  // Detect iphone
  if (navigator.userAgent.match('iPhone')) {
    isIphone = true;
    $('html').addClass('iphone');
    $window.height = function() {
      return window.screen.height;
    }
  }

  // Detect iPad
  if (navigator.userAgent.match('iPad')) {
    isIpad = true
    $('html').addClass('ipad');
    $window.height = function() {
      return window.screen.height;
    }
  }

  if(!isIpad && !isIphone) {
    $window.on('scroll', _.throttle(popLockMacbook, DEBOUNCE_INT / 2));
    $window.on('resize', _.debounce(setMacbookMargins, DEBOUNCE_INT));
    _.defer(setMacbookMargins);
  }
  if(!isIphone) {
    $window.on('scroll', _.throttle(highlightNav, DEBOUNCE_INT));
    $window.on('scroll', _.throttle(fadeInHeader, DEBOUNCE_INT));
    $window.on('resize', _.debounce(resizeHomeToViewport, DEBOUNCE_INT));
    _.defer(resizeHomeToViewport);
  }
  if (isIphone) {
    $('#hamburger').click(function() {
      $('#header').toggle();
    });
    $('#header a').click(function() {
      $('#header').toggle();
    });  
  }
});

// 
// Pop lock the macbook on scroll
// 
var popLockMacbook = function() {
  $webcontainers.each(function() {
    if (relativeToEl(this) == 'between') {
      $(this).removeClass('web-end').addClass('web-fixed');
    } else if (relativeToEl(this) == 'past') {
      $(this).removeClass('web-fixed').addClass('web-end');
    } else if (relativeToEl(this) == 'before') {
      $(this).removeClass('web-fixed web-end')
    }
  });
};

// 
// Determine where the viewport is relative to an elemente
// 
var relativeToEl = function(el) {
  var $el = $(el),
      winTop = $window.scrollTop(),
      winBottom = $window.scrollTop() + $window.height(),
      elTop = $el.offset().top,
      elBottom = $el.offset().top + $el.height();
  if (winTop + TOP_PADDING > elTop && winTop + macbookHeight + TOP_PADDING <= elBottom) {
    return 'between';
  } else if(winTop + macbookHeight + TOP_PADDING >= elBottom) {
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
  $('#home, #footer-container').height($window.height());
}

// 
// Highlight nav section as you scroll
//  
var highlightNav = function() {
  $('#header nav a').removeClass('nav-active');
  if (($window.height() + $window.scrollTop() >= $(document).height())
      || ($window.scrollTop() + 220 > $("#footer").offset().top)) {
    $('#header nav a:last-child').addClass('nav-active');
  } else {
    $largeheaders.each(function(i) {
      if (relativeToEl(this) == 'between' || relativeToEl(this) == 'past' && !$('.nav-active').length) {
        $('#header nav a:nth-child(' + ($largeheaders.length - i + 1) + ')').addClass('nav-active');
      }
    });
  }
}

// 
// Fade in the header as you scroll
// 
var fadeInHeader = function() { 
  var opacity = $window.scrollTop() > $window.height() ? 1:
                (($window.scrollTop() - ($window.height() / 2)) / $window.height()) * 2;
  $('#header').css({ opacity: opacity });
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
$('#home-up-arrow').click(function() {
  scrollToEl($('#home'));
});

//
// Set the margin between the macbook
// 
var setMacbookMargins = function() {
  macbookHeight = $('.web-left-frame').first().height();
  var margin = Math.max($window.height() - macbookHeight - 120, 100);
  $('.web-container').css({ 'margin-bottom': margin });
}

// 
// Open modal window on clicking an image or macbook
//
var closeModal= function() {
  $('#modal-container').fadeOut(200);
};
var setModal = function($img) {
  $('#modal-container img').attr('src', $img.attr('src'))
  $('#modal-container').fadeIn(200);
  var imgLoad = function() {
    var tooTall = $('#modal-container img').height() > $(window).height();
    var top = tooTall ? 0 : $('#modal-container img').height() / 2;
    $('#modal').css({
      'margin-top': ('-' + top + 'px'),
      top: (tooTall ? 0 : '50%')
    });
  };
  $('#modal-container img').on('load', imgLoad);
  $('#modal-container img').on('error', imgLoad);
}
$('.web-overlay').click(function(e) {
  var $imgs = $(this).closest('.web-container').find('.web-images img'),
      $img;
  $imgs.each(function() {
    var top = $(this).offset().top - $window.scrollTop(),
        bottom = $(this).offset().top + $(this).height() - $window.scrollTop();
    if(e.clientY >= top && e.clientY <= bottom) $img = $(this);
  });
  setModal($img);
});
$('#modal-close').click(closeModal);
$('#modal-container').click(closeModal);
$(document).on('keyup', function(e) {
  if(e.which == 27) closeModal(); // ESC key
});
$('.two-divided-grid img, .three-divided-grid img').click(function() {
  setModal($(this));
});
$('#photo-video img').click(function() {
  setModal($(this));
});

// Click through slideshow
var next = function() {
  var $lis = $(this).prev('ul').children();
  $li = $lis.filter('.active').removeClass('active');
  ($li.next().length ? $li.next() : $lis.first()).addClass('active');
}
var prev = function() {
  var $lis = $(this).next('ul').children();
  $li = $lis.filter('.active').removeClass('active');
  ($li.prev().length ? $li.prev() : $lis.last()).addClass('active');
}
$('.slide-show-next').click(next);
$('.slide-show-prev').click(prev);
$('.slide-show ul').click(function() {
  $(this).next('.slide-show-next').click()
});

// Arrow through slideshow
$(document).on('keydown', function(e) {
  var $closestSlideshow;
  $('.slide-show').each(function() {
    if (!$closestSlideshow && $(this).offset().top >= $(window).scrollTop()) {      
      $closestSlideshow = $(this);
    }
  });
  if(!$closestSlideshow) return;
  if (e.which == 39) {
    $closestSlideshow.find('.slide-show-next').click()
  } else if (e.which == 37) {
    $closestSlideshow.find('.slide-show-prev').click()
  }
});
