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
