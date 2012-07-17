// Plugin NimTime. Printing current time in selector.
// Autor Ivanushkin Nikolay (Nim579). Sorced 29.04.2011
// Promo http://nim579.ru/promo/jqtime.html
// Documentation - http://nim579.ru/html/jqtime.html (http://nim579.ru/dev/jqtime.html)
// Version 2.0b (17.07.2012)

$.fn.curTime = function(options) {
	var options = $.extend({
				sepor : ':',
				wrap : false,
				utc : 'real',
				template : 'hms',
				format : false,
				exp: null
			}, options);
	var elements = this;
	
	var today = new Date();
	var i = 3600 * today.getHours() + 60 * today.getMinutes() + today.getSeconds();
	if(options.utc != 'real'){i += eval(today.getTimezoneOffset()*60 + options.utc*3600)}
//	var i = 3600 * 23 + 60 * 59 + 50;

	setInterval(function() {
		i++;
		i %= 86400;
		w = i;
		if (w < 0) {w = 86400 + w;}
		if (options.wrap) {w = 86400 - w}
		hou = Math.floor(w / 3600);
		min = Math.floor((w - hou * 3600) / 60);
		sec = Math.floor(w - hou * 3600 - min * 60);
		if(options.exp != null){var return_str = jqTimeProc.exp_to_time(options.exp)}else{var return_str = jqTimeProc.returnString(options.template, options.sepor, jqTimeProc.formater(hou), jqTimeProc.formater(min), jqTimeProc.formater(sec))}
		$(elements).text(return_str);
		i = jqTimeProc.updater(i);
	}, 1000);
};

jQuery.fn.IntervalTimer = function(options) {
	var options = jQuery.extend({
				sepor : ':',
				wrap : true,
				format : true,
				template : 'hms',
				timeFrom : '',
				timeTo : '',
				alt : ''
			}, options);
	var elements = this;

	var today = new Date();
	var i = 3600 * today.getHours() + 60 * today.getMinutes() + today.getSeconds();
	if(options.utc != 'real'){w += eval(today.getTimezoneOffset()*60 + options.utc*3600)}
//	var i = 3600 * 23 + 60 * 59 + 50;
	
	var iFrom = jqTimeProc.sting_to_time(options.timeFrom);
	var iTo = jqTimeProc.sting_to_time(options.timeTo);
//	iFrom = Number(iFrom[0]) * 3600 + Number(iFrom[1]) * 60 + Number(iFrom[2])
//	iTo = Number(iTo[0]) * 3600 + Number(iTo[1]) * 60 + Number(iTo[2])
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
		i = jqTimeProc.updater(i);
	}, 1000)
};

jQuery.fn.TimerToggler = function(options) {
	var options = $.extend({
				timeFrom : '',
				timeTo : '',
				inInterval : null,
				outInterval: null,
				utc: 'real'
			}, options);
			
	var elements = this;
	var el_html = $(elements).html()

	var today = new Date();
	var i = 3600 * today.getHours() + 60 * today.getMinutes() + today.getSeconds();
	if(options.utc != 'real'){i += eval(today.getTimezoneOffset()*60 + options.utc*3600)}
//	var w = 3600 * 0 + 60 * 0 + 10;
	
	var iFrom = jqTimeProc.sting_to_time(options.timeFrom);
	var iTo = jqTimeProc.sting_to_time(options.timeTo);
//	iFrom = Number(iFrom[0]) * 3600 + Number(iFrom[1]) * 60 + Number(iFrom[2])
//	iTo = Number(iTo[0]) * 3600 + Number(iTo[1]) * 60 + Number(iTo[2])
	
	setInterval(function() {
				i++
				if (iFrom <= iTo) {
						if (i >= iFrom && i < iTo) {var inInterval_flag = true} else {var inInterval_flag = false}
					} else {
						if ((i >= iFrom && i <= 86400) || (i >= 0 && i < iTo)) {var inInterval_flag = true} else {var inInterval_flag = false}
					}
					ev_listener(inInterval_flag);
					i = jqTimeProc.updater(i);
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
		if (f_c <= 9) {
			f_c = '0' + f_c;
		}
		return f_c;
	},
	updater: function (var_i) {
		if (var_i % 300 == 0) {
			var today = new Date();
			return 3600 * today.getHours() + 60 * today.getMinutes()
					+ today.getSeconds();
		} else {
			return var_i
		}
	},
	sting_to_time: function (str) {
		str = str.split(':');
		var time = 0;
		var v = 2;
		for (var i = 0; i < str.length; i++) {
			time += Number(str[i]) * Math.pow(60, v);
			v--;
		}
		return time
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