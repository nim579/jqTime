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
