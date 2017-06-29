//= require_tree .

// html5 mini framework -> https://gist.github.com/garyv/5174927
var html5 = document.querySelector && window.addEventListener &&
(document.documentElement.className = 'html5') &&
($ = function(s){ return document.querySelector(s) }) &&
($.bind = function(x,e,c){ x.addEventListener(e,c,!1) });

// init
if (html5) {

  // get dom elements
  var video = $('video'),
      play = $('#play'),
      pause = $('#pause'),
      nav = $('nav'),
      hamburger = $('#hamburger'),
      started;

  // menu toggle
  $.bind( hamburger, 'click', function(){
    nav.classList.toggle('hide');
  });

  // detect iOS
  iOS = navigator.userAgent.match(/iPhone|iPad/);

  // video aspect ratio
  var setAspecRatio = function() {
    if (iOS) video.style.minHeight = video.offsetWidth * 9.0 / 16.0 + 'px';
  };
  $.bind( window, 'orientationchange', setAspecRatio);
  setAspecRatio();

  // video controls
  $.bind( play, 'click', function(){
    video.play();
  });
  $.bind( pause, 'click', function(){
    video.pause();
  });

  var togglePlayPauseButton = function() {
    if (video.paused) {
      play.classList.remove('hide');
      pause.classList.add('hide');
    } else { // playing
      play.classList.add('hide');
      pause.classList.remove('hide');
      if (!started) {
        started = true;
      }
    }
  }


  $.bind( video, 'pause', togglePlayPauseButton);
  $.bind( video, 'play', togglePlayPauseButton);
  $.bind( window, 'load', togglePlayPauseButton);
  togglePlayPauseButton();

  // autoplay on iOS workaround
  var eagerStart = function(event) {
    if (!started) {
      if (event.target !== play) {
        video.play();
      }
      started = true;
      removeMinimumHeight();
    }
  }

  var videoTriggers = [ $('header'), $('#section-1'), $('#section-2'), $('#section-3') ];
  videoTriggers.forEach(function(){
    $.bind( this, 'touchstart', eagerStart);
    $.bind( this, 'touchmove', eagerStart);
  })


} else {
  alert('This website requires an HTML5 web browser such as Google Chrome)');
}



