(function() {
  $.jqTime = {};

  $.fn.jqTime = function(mode, options, customTime) {
    var context;
    options = $.extend({
      wrap: false,
      hour12: false,
      utc: 'real',
      exp: 'HH:MM:SS d',
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
            return $.jqTime.modes[mode].call(context, _this, options);
          }, 1000);
        }
      });
    }
  };

}).call(this);
