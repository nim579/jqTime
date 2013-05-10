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
