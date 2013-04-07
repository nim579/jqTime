// Plugin jqTime. Printing current time in selector.
// Aunthor: Ivanushkin Nikolay (Nim579). Sorced 29.04.2011
// Promo: http://nim579.ru/promo/jqtime/
// Documentation: http://nim579.ru/html/jqtime/
// Version: 2.0.0 (Sun Apr 07 2013 13:20:34)

(function() {
  $.jqTimeProc = {
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
    expToTime: function(str) {
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
  $.fn.curTime = function(options) {
    var elements, i, today,
      _this = this;

    options = $.extend({
      sepor: ':',
      wrap: false,
      format: true,
      utc: 'real',
      template: 'hms',
      exp: null
    }, options);
    elements = $(this);
    today = new Date();
    i = 3600 * today.getHours() + 60 * today.getMinutes() + today.getSeconds();
    if (options.utc !== 'real') {
      i += eval(today.getTimezoneOffset() * 60 + options.utc * 3600);
    }
    return setInterval(function() {
      var hou, min, return_str, sec, w;

      i++;
      i %= 86400;
      w = i;
      if (w < 0) {
        w = 86400 + w;
      }
      if (options.warp) {
        w = 86400 - w;
      }
      hou = Math.floor(w / 3600);
      min = Math.floor((w - hou * 3600) / 60);
      sec = Math.floor(w - hou * 3600 - min * 60);
      if (options.format) {
        hou = $.jqTimeProc.formater(hou);
        min = $.jqTimeProc.formater(min);
        sec = $.jqTimeProc.formater(sec);
      }
      if (options.exp != null) {
        return_str = $.jqTimeProc.expToTime(options.exp);
      } else {
        return_str = $.jqTimeProc.returnString(options.template, options.sepor, hou, min, sec);
      }
      elements.text(return_str);
      return i = $.jqTimeProc.updater(i, options.utc);
    }, 1000);
  };

  $.fn.intervalTimer = function(options) {
    var c, elements, i, iFrom, iTo, today,
      _this = this;

    options = jQuery.extend({
      sepor: ':',
      wrap: true,
      format: true,
      utc: 'real',
      template: 'hms',
      exp: '',
      timeFrom: '',
      timeTo: '',
      alt: ''
    }, options);
    elements = $(this);
    today = new Date();
    i = 3600 * today.getHours() + 60 * today.getMinutes() + today.getSeconds();
    if (options.utc !== 'real') {
      i += eval(today.getTimezoneOffset() * 60 + options.utc * 3600);
    }
    iFrom = $.jqTimeProc.stingToTime(options.timeFrom);
    iTo = $.jqTimeProc.stingToTime(options.timeTo);
    c = i;
    return setInterval(function() {
      var b, hou, min, return_str, sec;

      i++;
      i %= 86400;
      if (options.wrap) {
        if (iFrom <= iTo) {
          if (i >= iFrom && i <= iTo) {
            b = iTo - i;
          } else {
            b = -1;
          }
        } else {
          if ((i >= iFrom && i <= 86400) || (i >= 0 && i <= iTo)) {
            b = (86400 + iTo - i) % 86400;
          } else {
            b = -1;
          }
        }
      } else {
        if (iFrom >= iTo) {
          if ((i >= iFrom && i <= 86400) || (i <= iTo && i >= 0)) {
            b = i;
          } else {
            b = -1;
          }
        } else {
          if (i = iFrom && i <= iTo) {
            b = i;
          } else {
            b = -1;
          }
        }
      }
      if (b + 1) {
        hou = Math.floor(b / 3600);
        min = Math.floor((b - hou * 3600) / 60);
        sec = Math.floor(b - hou * 3600 - min * 60);
        if (options.format) {
          hou = jqTimeProc.formater(hou);
          min = jqTimeProc.formater(min);
          sec = jqTimeProc.formater(sec);
        }
        if (options.exp != null) {
          return_str = $.jqTimeProc.expToTime(options.exp);
        } else {
          return_str = $.jqTimeProc.returnString(options.template, options.sepor, hou, min, sec);
        }
        elements.text(return_str);
      } else {
        elements.html(options.alt);
      }
      return i = $.jqTimeProc.updater(i, options.utc);
    }, 1000);
  };

  $.fn.timeToggler = function(options) {
    var doToggle, elements, i, iFrom, iTo, o_ev, startContent, today,
      _this = this;

    options = $.extend({
      timeFrom: '',
      timeTo: '',
      inInterval: null,
      outInterval: null,
      utc: 'real'
    }, options);
    elements = $(this);
    startContent = $(this).html();
    today = new Date();
    i = 3600 * today.getHours() + 60 * today.getMinutes() + today.getSeconds();
    if (options.utc !== 'real') {
      i += eval(today.getTimezoneOffset() * 60 + options.utc * 3600);
    }
    iFrom = jqTimeProc.sting_to_time(options.timeFrom);
    iTo = jqTimeProc.sting_to_time(options.timeTo);
    o_ev = null;
    doToggle = function(ev) {
      if (ev !== o_ev) {
        if (ev) {
          $(document).trigger('inInterval.jqTime');
          if (options.inInterval != null) {
            if (typeof options.inInterval === 'Function') {
              options.inInterval();
            } else {

            }
            elements.html(options.inInterval);
          } else {
            elements.html(startContent).show();
          }
        } else {
          $(document).trigger('outInterval.jqTime');
          if (options.inInterval != null) {
            if (typeof options.outInterval === 'Function') {
              options.outInterval();
            } else {
              elements.html(options.outInterval);
            }
          } else {
            elements.hide();
          }
        }
        return o_ev = ev;
      }
    };
    return setInterval(function() {
      var inInterval_flag;

      i++;
      if (iFrom <= iTo) {
        inInterval_flag = i >= iFrom && i < iTo;
      } else {
        inInterval_flag = (i >= iFrom && i <= 86400) || (i >= 0 && i < iTo);
      }
      doToggle(inInterval_flag);
      return i = jqTimeProc.updater(i, options.utc);
    }, 1000);
  };

}).call(this);
