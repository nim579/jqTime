var jqTimeProc = {
    returnString: function (tmpl, sepor, hou, min, sec) {
        var str = '';
        var sar = new Array();
        tmpl = tmpl.toLowerCase();

        if (tmpl.indexOf('h') >= 0) {
            sar[tmpl.indexOf('h')] = hou
        }
        if (tmpl.indexOf('m') >= 0) {
            sar[tmpl.indexOf('m')] = min
        }
        if (tmpl.indexOf('s') >= 0) {
            sar[tmpl.indexOf('s')] = sec
        }
        for (var i in sar) {
            if (i == sar.length - 1) {
                str += sar[i]
            } else {
                str += sar[i] + sepor
            }
        }
        return str;
    },
    formater: function (f_c) {
        if(isFinite(f_c) && f_c.length > 0){
            f_c = Number(f_c);
            if (f_c <= 9) { f_c = '0' + f_c; }
        }
        return f_c;
    },
    updater: function (var_i, utc) {
        if (var_i % 300 == 0) {
            var today = new Date();
            var_i = 3600 * today.getHours() + 60 * today.getMinutes() + today.getSeconds();
            if(utc != 'real'){var_i += eval(today.getTimezoneOffset()*60 + utc*3600)}
        }
        return var_i;
    },
    sting_to_time: function (str) {
        if(str != undefined){
            str = str.split(':');
            var time = 0;
            var v = 2;
            for (var i = 0; i < str.length; i++) {
                time += Number(str[i]) * Math.pow(60, v);
                v--;
            }
            return time;
        } else {
            return undefined;
        }
        
    },
    exp_to_time: function (str) {
        var str = str.replace(/([h]+)/g, hou);
        var str = str.replace(/([H]+)/g, jqTimeProc.formater(hou));
        var str = str.replace(/([m]+)/g, min);
        var str = str.replace(/([M]+)/g, jqTimeProc.formater(min));
        var str = str.replace(/([s]+)/g, sec);
        var str = str.replace(/([S]+)/g, jqTimeProc.formater(sec));
        return str;
    }
};