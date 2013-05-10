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
    if (options.warp) {
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
