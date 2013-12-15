var core = core || {};

core.config = {
  url: location.protocol + "//" + location.host + '/',
  api: function () {
    return location.protocol + "//" + location.host + '/api/';
  }(),
  enviroment : 'development',
  version: '0.2'
};

var url = document.location.hash, 
last = window.location.href.replace(core.config.url, ""), 
redirect = core.config.url + '#/' + last;
if (!url.match(/#/g)) {
  window.location = redirect;
}

if (typeof (console) === "undefined") {
  window.console = {};
  console.log = console.error = console.info = console.debug = console.warn = console.trace = console.dir = console.dirxml = console.group = console.groupEnd = console.time = console.timeEnd = console.assert = console.profile = function () {};
}

Date.now = Date.now || function () {
  return + new Date();
};

String.prototype.strpos = function(e) {
  return this.indexOf(e)!=-1;
};

core.device = function() {
  var s = this;
  function a(f) {
    var e = document.createElement("div"),
    d = "Khtml ms O Moz Webkit".split(" "),
    c = d.length;
    if (f in e.style) 
      return true;
    f = f.replace(/^[a-z]/, function (g) {
      return g.toUpperCase();
    });
    while (c--) 
      if (d[c] + f in e.style) 
        return true;
    return false;
  }
  this.agent = navigator.userAgent.toLowerCase();
  this.detect = function (d) {
    if (typeof d === "string") 
        d = [d];
    for (var c = 0; c < d.length; c++) 
      if (this.agent.strpos(d[c])) 
        return true;
    return false;
  };
  this.browser = {};
  this.browser.chrome = this.detect("chrome");
  this.browser.safari = !this.browser.chrome && this.detect("safari");
  this.browser.firefox = this.detect("firefox");
  this.browser.ie = this.detect("msie");
  this.browser.old = this.detect(["msie 6", "msie 7", "msie 8", "firefox/3", "safari/3", "safari/4"]);
  this.browser.version = function () {
    if (s.browser.chrome) 
        return Number(s.agent.split("chrome/")[1].split(".")[0]);
    if (s.browser.firefox) 
        return Number(s.agent.split("firefox/")[1].split(".")[0]);
    if (s.browser.safari) 
        return Number(s.agent.split("safari/")[1].split(".")[0].charAt(0));
    if (s.browser.ie) 
      return Number(s.agent.split("msie ")[1].split(".")[0]);
  }();
  this.mobile = !! ("ontouchstart" in window) ? {} : false;
  if (this.mobile) {
    this.mobile.tablet = window.innerWidth > 600 || window.innerHeight > 600;
    this.mobile.phone = !this.mobile.tablet;
  }
  this.system = {};
  this.system.plugins = navigator.plugins;
  this.system.retina = window.devicePixelRatio > 1 ? true : false;
  this.system.webworker = typeof window.Worker !== "undefined";
  this.system.offline = !! window.applicationCache;
  this.system.geolocation = "geolocation" in navigator;
  this.system.pushstate = typeof window.history.pushState !== "undefined";
  this.system.webcam = !! (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
  this.system.fullscreen = function() {
    var e = document.documentElement;
    return !! (e.requestFullscreen || e.mozRequestFullScreen || e.webkitRequestFullScreen);
  }();
  this.system.language = function() {
    var b = window.navigator.userLanguage || window.navigator.language;
    return b.split("-")[0];
  }();
  this.system.localStorage = function () {
    try {
      return "localStorage" in window && window.localStorage !== null;
    } catch (c) {
      return false;
    }
  }();
  this.system.os = function () {
    if (s.detect("mac os")) 
        return "mac";
    if (s.detect("windows nt 6.2")) 
        return "windows8";
    if (s.detect("windows nt 6.1")) 
        return "windows7";
    if (s.detect("windows nt 6.0")) 
        return "vista";
    if (s.detect("windows nt 5.1")) 
        return "xp";
    if (s.detect("linux")) 
        return "linux";
    return "undetected";
  }();
  this.media = {};
  this.media.audio = function () {
    if ( !! document.createElement("audio").canPlayType) 
      return s.detect(["firefox", "opera"]) ? "ogg" : "mp3";
    else 
      return false;
  }();
  this.media.video = function () {
    var c = document.createElement("video");
    if ( !! c.canPlayType) {
      if (s.mobile) 
          return "mp4";
      if (s.browser.chrome) 
          return "webm";
      if (s.browser.firefox || s.browser.opera) {
          if (c.canPlayType('video/webm; codecs="vorbis,vp8"')) 
              return "webm";
          return "ogv";
      }
      return "mp4";
    } else 
      return false;
  }();
  this.graphics = {};
  this.graphics.svg = typeof window.SVGSVGElement !== "undefined";
  this.graphics.webgl = typeof window.WebGLRenderingContext !== "undefined";
  this.graphics.canvas = function () {
    var c = document.createElement("canvas");
    return c.getContext ? true : false;
  }();
  this.styles = {};
  this.styles.filter = a("filter") && !s.browser.firefox;
  this.styles.needsFix = function () {
    if (s.detect("msie 7")) 
        return "ie7";
    if (s.detect("msie 8")) 
        return "ie8";
    return false;
  }();
  this.styles.vendor = function () {
    if (s.browser.firefox) 
        return "Moz";
    if (s.browser.opera) 
        return "O";
    if (s.browser.ie) 
        return "ms";
    return "Webkit";
  }();
  this.tween = {};
  this.tween.transition = a("transition");
  this.tween.css2d = a("transform");
  this.tween.css3d = a("perspective");
  this.tween.complete = function () {
    if (s.browser.firefox || s.detect("msie 10")) 
        return "transitionend";
    if (s.browser.opera) 
        return "oTransitionEnd";
    if (s.browser.ie) 
        return "msTransitionEnd";
    return "webkitTransitionEnd";
  }();
};

core.device = new core.device();

core.ev = function() {
  this.tap = (core.device.mobile) ? 'tap' : 'mousedown';
  this.click = (core.device.mobile) ? 'touchend' : 'click';
  this.resize = (core.device.mobile) ? 'orientationchange' : 'resize';
  this.enter = (core.device.mobile) ? 'touchstart' : 'mouseenter';
  this.leave = (core.device.mobile) ? 'touchend' : 'mouseleave';
};

core.ev = new core.ev();

(function (b, c, d, f, h, i) {

  /*
   * (internal use)
   * ie8 workaround to convert NodeList to an array
   * a = NodeList
   * b = placeholder for each node
   * c = index
   * d = empty array
   * returns array of dom nodes
   */
  h = function (a, b, c, d) {
    c = -1
    d = []
    while (b = a[++c]) d[c] = b
    return d
  }

  /*
   * (internal use)
   * Cross-browser super-type event handler https://gist.github.com/dciccale/5521816
   * action = 'on' or 'off'
   * type = event type (i.e. 'click')
   * element = the element to add the event
   * callback = function to execute when event is triggered
   * method = placeholder for the native method to call (internal use)
   */
  i = function (action, type, element, callback, method) {
    method = {on: 'addEventListener', off: 'removeEventListener'}[action]
    try {
      element[method](type, callback, false)
    } catch (e) {
      method = {on: 'attachEvent', off: 'detachEvent'}[action]
      element[method](action + type, function () { callback.apply(element, arguments) })
    }
  }

  /*
   * $ main method
   * a = css selector, dom object, or function
   * returns instance
   */
  this.$ = function (a) {
    return new $[d].i(a)
  }

  // ki prototype
  f = {
    // default length
    length: 0,

    /*
     * init method (internal use)
     * a = selector, dom element or function
     */
    i: function (a) {
      console.log(a.toString() === '[object Window]');
      c.push.apply(this, a && a.nodeType ? [a] : "" + a === a ? h(b.querySelectorAll(a)) : /^f/.test(typeof a) ? $(b).r(a) : null)
    },

    /*
     * ready method
     * Smallest DOMReady code, ever
     * http://www.dustindiaz.com/smallest-domready-ever
     * a = function to call when dom is ready
     * return this
     */
    r: function (a) {
      /c/.test(b.readyState) ? a() : $(b).on('DOMContentLoaded', a)
      return this
    },

    /*
     * on method
     * a = string event type i.e 'click'
     * b = function
     * return this
     */
    on: function (a, b) {
      return this.each(function (c) {
        i('on', a, this, b)
      })
    },

    /*
     * off method
     * a = string event type i.e 'click'
     * b = function
     * return this
     */
    off: function (a, b) {
      return this.each(function (c) {
        i('off', a, this, b)
      })
    },

    /*
     * each method
     * use native forEach to iterate collection
     * a = the function to call each loop
     * (b = internal use)
     * return this
     */
    each: function (a, b, c, d) {
      for (b=this,c=0,d=b.length;c<d;++c) {
        a.call(b[c],b[c],c,b)
      }
      return b
    },

    // for some reason is needed to get an array-like
    // representation instead of an object
    splice: c.splice
  }

  // set prototypes
  $[d] = f.i[d] = f
})(document, [], 'prototype');

$.prototype.text = function (a) {
  return a === []._ ? this[0].textContent : this.each(function (b) {
    b.textContent = a
  })
};

/*$.prototype.motion = function (css, speed) {
  return TweenMax.to(this[0], speed / 1e3, css);
};*/

$.prototype.create = function (selector, attributes, data) {
  return a === []._ ? this[0].textContent : this.each(function (b) {
    b.textContent = a
  })
};

core.alert = function () {
  alert('b');
};

var stage = document.getElementById("stage");

var item = document.createElement('div');
item.className = "item iphone";
item.style.display = 'block';
item.style.position = 'absolute';
item.style.left = "0px";
item.style.top = stage.offsetHeight/3+"px";
item.style.width = stage.offsetWidth+"px";
item.style.height = "100px";
item.style.backgroundColor = "#ff0000";

stage.appendChild(item);


$('.item').on('click', core.alert);

$(document).on('DOMContentLoaded', core.alert);
$(window).on('resize', core.alert);