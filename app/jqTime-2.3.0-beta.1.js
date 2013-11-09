// Plugin jqTime. jqTime - this is a jQuery plugin that displays the time on the screen. The plugin contains many flexible settings.
// Aunthor: Nick Iv (Nim579). Sorced 29.04.2011
// Promo: http://dev.nim579.ru/jqTime/
// Documentation: http://dev.nim579.ru/jqTime/docs/
// Version: 2.3.0-beta.1 (Wed Jun 12 2013 14:19:44)

(function() {
  $.jqTime = {};

  $.fn.jqTime = function(mode, options, callback) {
    var context;

    options = $.extend({
      sepor: ':',
      wrap: false,
      format: true,
      hour12: false,
      utc: 'real',
      template: 'hms',
      exp: null,
      timeFrom: '',
      timeTo: '',
      alt: null,
      inInterval: null,
      outInterval: null,
      pm: 'p.m.',
      am: 'a.m.'
    }, options);
    context = this;
    options.today = new Date();
    options.i = 3600 * options.today.getHours() + 60 * options.today.getMinutes() + options.today.getSeconds();
    if (options.utc !== 'real') {
      options.i += options.today.getTimezoneOffset() * 60 + options.utc * 3600;
    }
    options.iFrom = $.jqTime.helper.stingToTime(options.timeFrom);
    options.iTo = $.jqTime.helper.stingToTime(options.timeTo);
    if ($.jqTime.modes[mode] != null) {
      return this.each(function(index, el) {
        var $el,
          _this = this;

        $el = $(this);
        if (mode === 'clear') {
          return $.jqTime.modes[mode].call(context, this);
        } else {
          this.jqTimeCurr = options.i;
          this.jqTimeToggle = null;
          this.oldHtml = $(this).html();
          if (this.jqTimeTimer != null) {
            clearInterval(this.jqTimeTimer);
          }
          return this.jqTimeTimer = setInterval(function() {
            var JSON;

            JSON = $.jqTime.modes[mode].call(context, _this, options);
            if ((callback != null) && typeof callback === "Function") {
              return callback(JSON);
            }
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
    var hours, i, middayBoolean, minutes, seconds, time, w;

    time = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      utc: options.utc,
      formated: ''
    };
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
    time.hours = Math.floor(w / 3600);
    time.minutes = Math.floor((w - time.hours * 3600) / 60);
    time.seconds = Math.floor(w - time.hours * 3600 - time.minutes * 60);
    if (options.hour12) {
      middayBoolean = Math.floor(time.hours / 13);
      time.hours -= 12 * middayBoolean;
      time.midday = !!middayBoolean ? 'pm' : 'am';
    }
    if (options.format) {
      hours = $.jqTime.helper.formater(time.hours);
      minutes = $.jqTime.helper.formater(time.minutes);
      seconds = $.jqTime.helper.formater(time.seconds);
    }
    if (options.exp != null) {
      time.formated = $.jqTime.helper.expToTime(options.exp, hours, minutes, seconds, time.midday != null ? {
        now: time.midday,
        pm: options.pm,
        am: options.am
      } : void 0);
    } else {
      time.formated = $.jqTime.helper.returnString(options.template, options.sepor, hours, minutes, seconds);
    }
    $(el).html(time.formated);
    el.jqTimeCurr = i;
    i = $.jqTime.helper.updater(i, options.utc);
    return time;
  };

}).call(this);

(function() {
  if ($.jqTime == null) {
    $.jqTime = {};
  }

  $.jqTime.helper = {
    returnString: function(tmpl, sepor, hou, min, sec) {
      var i, result, sar, _i, _len;

      if (tmpl == null) {
        tmpl = "hms";
      }
      if (sepor == null) {
        sepor = ':';
      }
      if (hou == null) {
        hou = "H";
      }
      if (min == null) {
        min = "M";
      }
      if (sec == null) {
        sec = "S";
      }
      if (typeof tmpl !== 'string') {
        tmpl = "hms";
      }
      if (!(typeof sepor === 'string' || typeof sepor === 'number')) {
        sepor = ":";
      }
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
      result = [];
      for (_i = 0, _len = sar.length; _i < _len; _i++) {
        i = sar[_i];
        if (!!i || i === 0) {
          result.push(i);
        }
      }
      return result.join(sepor);
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
    stingToTime: function(string) {
      var arr, i, time, v, _i, _len;

      if (string != null) {
        time = 0;
        if (!string) {
          return 0;
        }
        if (typeof string === 'number') {
          return string;
        }
        arr = string.split(':');
        arr = arr.slice(0, 3);
        time = 0;
        for (v = _i = 0, _len = arr.length; _i < _len; v = ++_i) {
          i = arr[v];
          if (Number(i === NaN)) {
            return NaN;
          }
          time += Math.floor(Number(i)) * Math.pow(60, 2 - v);
        }
        return time;
      } else {
        return null;
      }
    },
    expToTime: function(str, hou, min, sec, midday) {
      if (str && typeof str === 'string') {
        if ((hou != null) && typeof hou === 'string' || typeof hou === 'number') {
          str = str.replace(/([h]+)/g, hou);
          str = str.replace(/([H]+)/g, this.formater(hou));
        }
        if ((min != null) && typeof min === 'string' || typeof min === 'number') {
          str = str.replace(/([m]+)/g, min);
          str = str.replace(/([M]+)/g, this.formater(min));
        }
        if ((sec != null) && typeof sec === 'string' || typeof sec === 'number') {
          str = str.replace(/([s]+)/g, sec);
          str = str.replace(/([S]+)/g, this.formater(sec));
        }
        if ((midday != null) && (midday.now === 'am' || midday.now === 'pm')) {
          str = str.replace(/([d]+)/g, midday[midday.now]);
          str = str.replace(/([D]+)/g, midday[midday.now]);
        } else {
          str = str.replace(/([d]+)/g, '');
          str = str.replace(/([D]+)/g, '');
        }
        return str;
      }
      return null;
    },
    filter: function(obj, iterator, context) {
      var results;

      results = [];
      if (obj == null) {
        return results;
      }
      if (Array.prototype.filter && obj.filter === Array.prototype.filter) {
        return obj.filter(iterator, context);
      }
      each(obj, function(value, index, list) {
        if (iterator.call(context, value, index, list)) {
          return results[results.length] = value;
        }
      });
      return results;
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
    var b, hours, i, middayBoolean, minutes, seconds, time;

    time = {
      utc: options.utc,
      formated: '',
      inInterval: false
    };
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
      time.inInterval = true;
      time.hours = Math.floor(b / 3600);
      time.minutes = Math.floor((b - time.hours * 3600) / 60);
      time.seconds = Math.floor(b - time.hours * 3600 - time.minutes * 60);
      if (options.hour12) {
        middayBoolean = Math.floor(time.hours / 13);
        time.hours -= 12 * middayBoolean;
        time.midday = !!middayBoolean ? 'pm' : 'am';
      }
      if (options.format) {
        hours = $.jqTime.helper.formater(time.hours);
        minutes = $.jqTime.helper.formater(time.minutes);
        seconds = $.jqTime.helper.formater(time.seconds);
      }
      if (options.exp != null) {
        time.formated = $.jqTime.helper.expToTime(options.exp, hours, minutes, seconds, time.midday != null ? {
          now: time.midday,
          pm: options.pm,
          am: options.am
        } : void 0);
      } else {
        time.formated = $.jqTime.helper.returnString(options.template, options.sepor, hours, minutes, seconds);
      }
      $(el).html(time.formated);
    } else {
      time.inInterval = false;
      if (options.alt != null) {
        $(el).html(options.alt);
        time.formated = options.alt;
      } else {
        $(el).html(el.oldHtml);
        time.formated = el.oldHtml;
      }
    }
    el.jqTimeCurr = i;
    i = $.jqTime.helper.updater(i, options.utc);
    return time;
  };

}).call(this);

(function() {
  if ($.jqTime == null) {
    $.jqTime = {};
  }

  if ($.jqTime.modes == null) {
    $.jqTime.modes = {};
  }

  $.jqTime.modes.multi = function(el, options) {
    var i, index, interval, intervalIndex, time, _i, _j, _len, _len1, _ref, _ref1;

    time = {
      utc: options.utc,
      formated: '',
      inInterval: false
    };
    intervalIndex = 0;
    i = el.jqTimeCurr;
    i++;
    if (!(options.multi != null) || options.multi.length === 0) {
      options.multi = [
        {
          after: "00:00",
          payload: 'am'
        }, {
          after: "13:00",
          payload: "pm"
        }
      ];
    }
    if (options.multi.length === 1) {
      options.multi.push({
        after: $.jqTime.helper.stingToTime(options.multi[0].after) !== 0 ? "00:00" : "13:00",
        payload: $.jqTime.helper.stingToTime(options.multi[0].after) !== 0 ? "am" : "pm"
      });
    }
    options.multi = $.jqTime.helper.filter(options.multi, function(val) {
      return !!val.after;
    });
    _ref = options.multi;
    for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
      interval = _ref[index];
      interval.id = "interval" + (index + 1);
      interval.after = $.jqTime.helper.stingToTime(interval.after);
    }
    options.multi.sort = options.multi.sort(function(index, ii) {
      if (index.after > ii.after) {
        return 1;
      }
      if (index.after < ii.after) {
        return -1;
      }
      if (index.after === ii.after) {
        return 0;
      }
    });
    _ref1 = options.multi;
    for (index = _j = 0, _len1 = _ref1.length; _j < _len1; index = ++_j) {
      interval = _ref1[index];
      if (i >= interval.after) {
        intervalIndex = index;
      }
    }
    if (i <= options.multi[0].after) {
      intervalIndex = options.multi.length - 1;
    }
    time.inInterval = options.multi[intervalIndex].id;
    if (el.jqTimeMulti !== time.inInterval) {
      el.jqTimeMulti = time.inInterval;
      $(el).trigger("" + time.inInterval + ".jqTime");
      if (options.multi[intervalIndex].payload) {
        if (typeof options.multi[intervalIndex].payload === 'Function') {
          options.multi[intervalIndex].payload();
        } else {
          $(el).html(options.multi[intervalIndex].payload).show();
        }
      } else {
        $(el).hide();
      }
    }
    el.jqTimeCurr = i;
    i = $.jqTime.helper.updater(i, options.utc);
    return time;
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
    var i, time;

    time = {
      utc: options.utc,
      formated: '',
      inInterval: false
    };
    i = el.jqTimeCurr;
    i++;
    if (options.iFrom <= options.iTo) {
      time.inInterval = !!(i >= options.iFrom && i < options.iTo);
    } else {
      time.inInterval = !!((i >= options.iFrom && i <= 86400) || (i >= 0 && i < options.iTo));
    }
    if (time.inInterval !== el.jqTimeToggle) {
      if (time.inInterval) {
        $(el).trigger('inInterval.jqTime');
        if (options.inInterval != null) {
          if (typeof options.inInterval === 'Function') {
            options.inInterval();
          } else {
            $(el).html(options.inInterval);
          }
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
      el.jqTimeToggle = time.inInterval;
    }
    el.jqTimeCurr = i;
    i = $.jqTime.helper.updater(i, options.utc);
    return time;
  };

}).call(this);
