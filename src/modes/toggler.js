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
      formated: null,
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
          if (typeof options.inInterval === 'function') {
            time.formated = '';
            options.inInterval();
          } else {
            time.formated = options.inInterval;
            $(el).html(options.inInterval);
          }
        } else {
          time.formated = '';
          $(el).html(el.oldHtml).show();
        }
      } else {
        $(el).trigger('outInterval.jqTime');
        if (options.inInterval != null) {
          if (typeof options.outInterval === 'function') {
            time.formated = null;
            options.outInterval();
          } else {
            time.formated = options.outInterval;
            $(el).html(options.outInterval);
          }
        } else {
          time.formated = null;
          $(el).hide();
        }
      }
      el.jqTimeToggle = time.inInterval;
    }
    el.jqTimeCurr = i;
    return i = $.jqTime.helper.updater(i, options.utc);
  };

}).call(this);
