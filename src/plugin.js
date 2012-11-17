$.fn.curTime = function(options) {
    var options = $.extend({
                sepor: ':',
                wrap: false,
                format: true,
                utc: 'real',
                template: 'hms',
                exp: null
            }, options);
    var elements = this;
    
    var today = new Date();
    var i = 3600 * today.getHours() + 60 * today.getMinutes() + today.getSeconds();
    if(options.utc != 'real'){i += eval(today.getTimezoneOffset()*60 + options.utc*3600)}

    setInterval(function() {
        i++;
        i %= 86400;
        w = i;
        if (w < 0) {w = 86400 + w;}
        if (options.wrap) {w = 86400 - w}
        hou = Math.floor(w / 3600);
        min = Math.floor((w - hou * 3600) / 60);
        sec = Math.floor(w - hou * 3600 - min * 60);
        if(options.format){
            hou = jqTimeProc.formater(hou);
            min = jqTimeProc.formater(min);
            sec = jqTimeProc.formater(sec);
        }
        if(options.exp != null){var return_str = jqTimeProc.exp_to_time(options.exp)}else{var return_str = jqTimeProc.returnString(options.template, options.sepor, hou, min, sec)}
        $(elements).text(return_str);
        i = jqTimeProc.updater(i, options.utc);
    }, 1000);
};

jQuery.fn.intervalTimer = function(options) {
    var options = jQuery.extend({
                sepor: ':',
                wrap: true,
                format: true,
                utc: 'real',
                template: 'hms',
                exp: '',
                timeFrom: '',
                timeTo: '',
                alt: ''
            }, options);
    var elements = this;

    var today = new Date();
    var i = 3600 * today.getHours() + 60 * today.getMinutes() + today.getSeconds();
    if(options.utc != 'real'){i += eval(today.getTimezoneOffset()*60 + options.utc*3600)}
    
    var iFrom = jqTimeProc.sting_to_time(options.timeFrom);
    var iTo = jqTimeProc.sting_to_time(options.timeTo);
    
    var c = i;
    setInterval(function() {
        i++;
        i %= 86400;
        if (options.wrap) {
            if (iFrom <= iTo) {
                if (i >= iFrom && i <= iTo) {var b = iTo - i} else {var b = -1}
            } else {
                if ((i >= iFrom && i <= 86400) || (i >= 0 && i <= iTo)) {var b = (86400 + iTo - i)%86400} else {var b = -1}
            }
        //ok
        } else {
            if (iFrom >= iTo) {
                if ((i >= iFrom && i <= 86400) || (i <= iTo && i >= 0)) {var b = i;} else {var b = -1}
            } else {
                if (i = iFrom && i <= iTo) {b = i;} else {var b = -1}
            }
        }
        
        if (b+1) {
            hou = Math.floor(b / 3600)
            min = Math.floor((b - hou * 3600) / 60)
            sec = Math.floor(b - hou * 3600 - min * 60)
            if(options.format){
                hou = jqTimeProc.formater(hou);
                min = jqTimeProc.formater(min);
                sec = jqTimeProc.formater(sec);
            }
            if(options.exp != null){var return_str = jqTimeProc.exp_to_time(options.exp)}else{var return_str = jqTimeProc.returnString(options.template, options.sepor, hou, min, sec)}
            $(elements).text(return_str);
        } else {
            $(elements).html(options.alt);
        }
        i = jqTimeProc.updater(i, options.utc);
    }, 1000)
};

jQuery.fn.timeToggler = function(options) {
    var options = $.extend({
                timeFrom: '',
                timeTo: '',
                inInterval: null,
                outInterval: null,
                utc: 'real'
            }, options);
            
    var elements = this;
    var el_html = $(elements).html()

    var today = new Date();
    var i = 3600 * today.getHours() + 60 * today.getMinutes() + today.getSeconds();
    if(options.utc != 'real'){i += eval(today.getTimezoneOffset()*60 + options.utc*3600)}
    
    var iFrom = jqTimeProc.sting_to_time(options.timeFrom);
    var iTo = jqTimeProc.sting_to_time(options.timeTo);
    
    setInterval(function() {
                i++
                if (iFrom <= iTo) {
                        if (i >= iFrom && i < iTo) {var inInterval_flag = true} else {var inInterval_flag = false}
                    } else {
                        if ((i >= iFrom && i <= 86400) || (i >= 0 && i < iTo)) {var inInterval_flag = true} else {var inInterval_flag = false}
                    }
                    ev_listener(inInterval_flag);
                    i = jqTimeProc.updater(i, options.utc);
            }, 1000);
    var o_ev = null;
    function ev_listener(ev){
        if(ev != o_ev){
            if (ev) {
                if(options.inInterval == null){$(elements).html(el_html).show();}else{$(elements).html(options.inInterval);}
            } else {
                if(options.outInterval == null){$(elements).hide();}else{$(elements).html(options.outInterval);}
            }
            o_ev = ev;
        }
    }
};