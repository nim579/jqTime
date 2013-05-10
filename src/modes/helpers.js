(function() {
  if ($.jqTime == null) {
    $.jqTime = {};
  }

  $.jqTime.helper = {
    returnString: function(tmpl, sepor, hou, min, sec) {
      var sar, str;

      str = '';
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
      str = sar.join(sepor);
      return str;
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
    stingToTime: function(str) {
      var i, time, v, _i, _len;

      if (str != null) {
        str = str.split(':');
        time = 0;
        v = 2;
        for (_i = 0, _len = str.length; _i < _len; _i++) {
          i = str[_i];
          time += Number(i) * Math.pow(60, v);
          v--;
        }
        return time;
      } else {
        return null;
      }
    },
    expToTime: function(str, hou, min, sec) {
      str = str.replace(/([h]+)/g, hou);
      str = str.replace(/([H]+)/g, this.formater(hou));
      str = str.replace(/([m]+)/g, min);
      str = str.replace(/([M]+)/g, this.formater(min));
      str = str.replace(/([s]+)/g, sec);
      str = str.replace(/([S]+)/g, this.formater(sec));
      return str;
    }
  };

}).call(this);
