(function() {
  if ($.jqTime == null) {
    $.jqTime = {};
  }

  $.jqTime.helper = {
    returnString: function(tmpl, sepor, hou, min, sec) {
      var i, result, sar, _i, _len;

      if (tmpl == null) {
        tmpl = "hms";
      }
      if (sepor == null) {
        sepor = ':';
      }
      if (hou == null) {
        hou = "H";
      }
      if (min == null) {
        min = "M";
      }
      if (sec == null) {
        sec = "S";
      }
      if (typeof tmpl !== 'string') {
        tmpl = "hms";
      }
      if (!(typeof sepor === 'string' || typeof sepor === 'number')) {
        sepor = ":";
      }
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
      result = [];
      for (_i = 0, _len = sar.length; _i < _len; _i++) {
        i = sar[_i];
        if (!!i) {
          result.push(i);
        }
      }
      return result.join(sepor);
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
    stingToTime: function(string) {
      var arr, i, time, v, _i, _len;

      if (string != null) {
        time = 0;
        if (!string) {
          return 0;
        }
        if (typeof string === 'number') {
          return string;
        }
        arr = string.split(':');
        arr = arr.slice(0, 3);
        time = 0;
        for (v = _i = 0, _len = arr.length; _i < _len; v = ++_i) {
          i = arr[v];
          if (Number(i === NaN)) {
            return NaN;
          }
          time += Math.floor(Number(i)) * Math.pow(60, 2 - v);
        }
        return time;
      } else {
        return null;
      }
    },
    expToTime: function(str, hou, min, sec) {
      if (str && typeof str === 'string') {
        if ((hou != null) && typeof hou === 'string' || typeof hou === 'number') {
          str = str.replace(/([h]+)/g, hou);
          str = str.replace(/([H]+)/g, this.formater(hou));
        }
        if ((min != null) && typeof min === 'string' || typeof min === 'number') {
          str = str.replace(/([m]+)/g, min);
          str = str.replace(/([M]+)/g, this.formater(min));
        }
        if ((sec != null) && typeof sec === 'string' || typeof sec === 'number') {
          str = str.replace(/([s]+)/g, sec);
          str = str.replace(/([S]+)/g, this.formater(sec));
        }
        return str;
      }
      return null;
    }
  };

}).call(this);
