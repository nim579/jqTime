// Plugin jqTime. Printing current time in selector.
// Aunthor: Nick Iv (Nim579). Sorced 29.04.2011
// Promo: http://dev.nim579.ru/jqTime/
// Documentation: http://dev.nim579.ru/jqTime/docs/
// Version: 2.2.1 (Tue May 21 2013 09:53:20)

(function() {
  $.jqTime = {};

  $.fn.jqTime = function(mode, options, customTime) {
    var seeta;

    options = $.extend({
      sepor: ':',
      wrap: false,
      format: true,
      utc: 'real',
      template: 'hms',
      exp: null,
      timeFrom: '',
      timeTo: '',
      alt: null,
      inInterval: null,
      outInterval: null
    }, options);
    if (customTime != null) {
      if (customTime instanceof window.Date && (customTime.getHours != null)) {
        options.today = customTime;
      } else if (typeof customTime === 'string') {
        options.today = new Date(customTime);
      } else {
        options.today = new Date();
      }
    } else {
      options.today = new Date();
    }
    options.i = 3600 * options.today.getHours() + 60 * options.today.getMinutes() + options.today.getSeconds();
    if (options.utc !== 'real') {
      options.i += eval(options.today.getTimezoneOffset() * 60 + options.utc * 3600);
    }
    seeta = 'ter';
    options.iFrom = $.jqTime.helper.stingToTime(options.timeFrom);
    options.iTo = $.jqTime.helper.stingToTime(options.timeTo);
    if ($.jqTime.modes[mode] != null) {
      return this.each(function(index, el) {
        var $el,
          _this = this;

        $el = $(this);
        if (mode === 'clear') {
          return $.jqTime.modes[mode](this);
        } else {
          this.jqTimeCurr = options.i;
          this.jqTimeToggle = null;
          this.oldHtml = $(this).html();
          if (this.jqTimeTimer != null) {
            clearInterval(this.jqTimeTimer);
          }
          return this.jqTimeTimer = setInterval(function() {
            return $.jqTime.modes[mode](_this, options);
          }, 1000);
        }
      });
    }
  };

}).call(this);

(function() {
  if ($.jqTime == null) {
    $.jqTime = {};
  }

  if ($.jqTime.modes == null) {
    $.jqTime.modes = {};
  }

  $.jqTime.modes.clear = function(el) {
    if (el.jqTimeTimer != null) {
      clearInterval(el.jqTimeTimer);
      delete el.jqTimeTimer;
    }
    if (el.jqTimeCurr != null) {
      delete el.jqTimeCurr;
    }
    if (el.jqTimeToggle != null) {
      delete el.jqTimeToggle;
    }
    if (el.oldHtml != null) {
      $(el).html(el.oldHtml);
      return delete el.oldHtml;
    }
  };

}).call(this);

(function() {
  if ($.jqTime == null) {
    $.jqTime = {};
  }

  if ($.jqTime.modes == null) {
    $.jqTime.modes = {};
  }

  $.jqTime.modes.current = function(el, options) {
    var hou, i, min, return_str, sec, w;

    i = el.jqTimeCurr;
    i++;
    i %= 86400;
    w = i;
    if (w < 0) {
      w = 86400 + w;
    }
    if (options.wrap) {
      w = 86400 - w;
    }
    hou = Math.floor(w / 3600);
    min = Math.floor((w - hou * 3600) / 60);
    sec = Math.floor(w - hou * 3600 - min * 60);
    if (options.format) {
      hou = $.jqTime.helper.formater(hou);
      min = $.jqTime.helper.formater(min);
      sec = $.jqTime.helper.formater(sec);
    }
    if (options.exp != null) {
      return_str = $.jqTime.helper.expToTime(options.exp, hou, min, sec);
    } else {
      return_str = $.jqTime.helper.returnString(options.template, options.sepor, hou, min, sec);
    }
    $(el).text(return_str);
    el.jqTimeCurr = i;
    return i = $.jqTime.helper.updater(i, options.utc);
  };

}).call(this);

(function() {
  if ($.jqTime == null) {
    $.jqTime = {};
  }

  $.jqTime.helper = {
    returnString: function(tmpl, sepor, hou, min, sec) {
      var sar, str;

      str = '';
      sar = [];
      tmpl = tmpl.toLowerCase();
      if (tmpl.indexOf('h') >= 0) {
        sar[tmpl.indexOf('h')] = hou;
      }
      if (tmpl.indexOf('m') >= 0) {
        sar[tmpl.indexOf('m')] = min;
      }
      if (tmpl.indexOf('s') >= 0) {
        sar[tmpl.indexOf('s')] = sec;
      }
      str = sar.join(sepor);
      return str;
    },
    formater: function(f_c) {
      if (f_c != null) {
        if (String(f_c).length > 0) {
          if (Number(f_c <= 9)) {
            f_c = '0' + Number(f_c);
          }
        }
        return String(f_c);
      }
      return null;
    },
    updater: function(increment, utc) {
      var today;

      if (increment % 300 === 0) {
        today = new Date();
        increment = 3600 * today.getHours() + 60 * today.getMinutes() + today.getSeconds();
        if (utc !== 'real') {
          increment += today.getTimezoneOffset() * 60 + utc * 3600;
        }
      }
      return increment;
    },
    stingToTime: function(str) {
      var i, time, v, _i, _len;

      if (str != null) {
        str = str.split(':');
        time = 0;
        v = 2;
        for (_i = 0, _len = str.length; _i < _len; _i++) {
          i = str[_i];
          time += Number(i) * Math.pow(60, v);
          v--;
        }
        return time;
      } else {
        return null;
      }
    },
    expToTime: function(str, hou, min, sec) {
      str = str.replace(/([h]+)/g, hou);
      str = str.replace(/([H]+)/g, this.formater(hou));
      str = str.replace(/([m]+)/g, min);
      str = str.replace(/([M]+)/g, this.formater(min));
      str = str.replace(/([s]+)/g, sec);
      str = str.replace(/([S]+)/g, this.formater(sec));
      return str;
    }
  };

}).call(this);

(function() {
  if ($.jqTime == null) {
    $.jqTime = {};
  }

  if ($.jqTime.modes == null) {
    $.jqTime.modes = {};
  }

  $.jqTime.modes.interval = function(el, options) {
    var b, hou, i, min, return_str, sec;

    i = el.jqTimeCurr;
    i++;
    i %= 86400;
    if (options.wrap) {
      if (options.iFrom <= options.iTo) {
        if (i >= options.iFrom && i <= options.iTo) {
          b = options.iTo - i;
        } else {
          b = false;
        }
      } else {
        if ((i >= options.iFrom && i <= 86400) || (i >= 0 && i <= options.iTo)) {
          b = (86400 + options.iTo - i) % 86400;
        } else {
          b = false;
        }
      }
    } else {
      if (options.iFrom >= options.iTo) {
        if ((i >= options.iFrom && i <= 86400) || (i <= options.iTo && i >= 0)) {
          b = i;
        } else {
          b = false;
        }
      } else {
        if (i >= options.iFrom && i <= options.iTo) {
          b = i;
        } else {
          b = false;
        }
      }
    }
    if (b !== false) {
      hou = Math.floor(b / 3600);
      min = Math.floor((b - hou * 3600) / 60);
      sec = Math.floor(b - hou * 3600 - min * 60);
      if (options.format) {
        hou = $.jqTime.helper.formater(hou);
        min = $.jqTime.helper.formater(min);
        sec = $.jqTime.helper.formater(sec);
      }
      if (options.exp != null) {
        return_str = $.jqTime.helper.expToTime(options.exp, hou, min, sec);
      } else {
        return_str = $.jqTime.helper.returnString(options.template, options.sepor, hou, min, sec);
      }
      $(el).text(return_str);
    } else {
      if (options.alt != null) {
        $(el).html(options.alt);
      } else {
        $(el).html(el.oldHtml);
      }
    }
    el.jqTimeCurr = i;
    return i = $.jqTime.helper.updater(i, options.utc);
  };

}).call(this);

(function() {
  if ($.jqTime == null) {
    $.jqTime = {};
  }

  if ($.jqTime.modes == null) {
    $.jqTime.modes = {};
  }

  $.jqTime.modes.toggler = function(el, options) {
    var i, inInterval_flag;

    i = el.jqTimeCurr;
    i++;
    if (options.iFrom <= options.iTo) {
      inInterval_flag = i >= options.iFrom && i < options.iTo;
    } else {
      inInterval_flag = (i >= options.iFrom && i <= 86400) || (i >= 0 && i < options.iTo);
    }
    if (inInterval_flag !== el.jqTimeToggle) {
      if (inInterval_flag) {
        $(el).trigger('inInterval.jqTime');
        if (options.inInterval != null) {
          if (typeof options.inInterval === 'Function') {
            options.inInterval();
          } else {

          }
          $(el).html(options.inInterval);
        } else {
          $(el).html(el.oldHtml).show();
        }
      } else {
        $(el).trigger('outInterval.jqTime');
        if (options.inInterval != null) {
          if (typeof options.outInterval === 'Function') {
            options.outInterval();
          } else {
            $(el).html(options.outInterval);
          }
        } else {
          $(el).hide();
        }
      }
      el.jqTimeToggle = inInterval_flag;
    }
    el.jqTimeCurr = i;
    return i = $.jqTime.helper.updater(i, options.utc);
  };

}).call(this);
