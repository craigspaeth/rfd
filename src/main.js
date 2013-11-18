var TOP_PADDING = 100,
    MACBOOK_HEIGHT = 500;

$(function() {
  console.log('hi');
  $(window).on('scroll', popLockMacbook);
});

var popLockMacbook = function() {
  var $els = $($('.web-container').get().reverse());
  $els.each(function() {
    console.log(relativeToEl(this));
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