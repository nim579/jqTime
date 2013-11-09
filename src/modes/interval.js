(function() {
  if ($.jqTime == null) {
    $.jqTime = {};
  }

  if ($.jqTime.modes == null) {
    $.jqTime.modes = {};
  }

  $.jqTime.modes.interval = function(el, options) {
    var b, i, middayBoolean, time;
    time = {
      utc: options.utc,
      formated: '',
      inInterval: false
    };
    i = el.jqTimeCurr;
    i++;
    i %= 86400;
    b = false;
    if (options.wrap) {
      if (options.iFrom <= options.iTo) {
        if (i >= options.iFrom && i <= options.iTo) {
          b = options.iTo - i;
        }
      } else {
        if ((i >= options.iFrom && i <= 86400) || (i >= 0 && i <= options.iTo)) {
          b = (86400 + options.iTo - i) % 86400;
        }
      }
    } else {
      if (options.iFrom >= options.iTo) {
        if ((i >= options.iFrom && i <= 86400) || (i <= options.iTo && i >= 0)) {
          b = i;
        }
      } else {
        if (i >= options.iFrom && i <= options.iTo) {
          b = i;
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
      time.formated = $.jqTime.helper.expToTime(options.exp, time.hours, time.minutes, time.seconds, time.midday != null ? {
        now: time.midday,
        pm: options.pm,
        am: options.am
      } : void 0);
      $(el).html(time.formated);
    } else {
      if (options.alt != null) {
        $(el).html(options.alt);
        time.formated = options.alt;
      } else {
        $(el).html(el.oldHtml);
        time.formated = el.oldHtml;
      }
    }
    el.jqTimeCurr = i;
    return i = $.jqTime.helper.updater(i, options.utc);
  };

}).call(this);
