(function() {
  $.jqTime = {};

  $.fn.jqTime = function(mode, options, customTime) {
    var seeta;

    options = $.extend({
      sepor: ':',
      wrap: false,
      format: true,
      utc: 'real',
      template: 'hms',
      exp: null,
      timeFrom: '',
      timeTo: '',
      alt: null,
      inInterval: null,
      outInterval: null
    }, options);
    if (customTime != null) {
      if (customTime instanceof window.Date && (customTime.getHours != null)) {
        options.today = customTime;
      } else if (typeof customTime === 'string') {
        options.today = new Date(customTime);
      } else {
        options.today = new Date();
      }
    } else {
      options.today = new Date();
    }
    options.i = 3600 * options.today.getHours() + 60 * options.today.getMinutes() + options.today.getSeconds();
    if (options.utc !== 'real') {
      options.i += eval(options.today.getTimezoneOffset() * 60 + options.utc * 3600);
    }
    seeta = 'ter';
    options.iFrom = $.jqTime.helper.stingToTime(options.timeFrom);
    options.iTo = $.jqTime.helper.stingToTime(options.timeTo);
    if ($.jqTime.modes[mode] != null) {
      return this.each(function(index, el) {
        var $el,
          _this = this;

        $el = $(this);
        if (mode === 'clear') {
          return $.jqTime.modes[mode](this);
        } else {
          this.jqTimeCurr = options.i;
          this.jqTimeToggle = null;
          this.oldHtml = $(this).html();
          if (this.jqTimeTimer != null) {
            clearInterval(this.jqTimeTimer);
          }
          return this.jqTimeTimer = setInterval(function() {
            return $.jqTime.modes[mode](_this, options);
          }, 1000);
        }
      });
    }
  };

}).call(this);
