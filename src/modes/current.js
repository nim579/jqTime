(function() {
  if ($.jqTime == null) {
    $.jqTime = {};
  }

  if ($.jqTime.modes == null) {
    $.jqTime.modes = {};
  }

  $.jqTime.modes.current = function(el, options) {
    var i, middayBoolean, time, w;
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
    time.formated = $.jqTime.helper.expToTime(options.exp, time.hours, time.minutes, time.seconds, time.midday != null ? {
      now: time.midday,
      pm: options.pm,
      am: options.am
    } : void 0);
    $(el).html(time.formated);
    el.jqTimeCurr = i;
    return i = $.jqTime.helper.updater(i, options.utc);
  };

}).call(this);
