$.jqTime = {} unless $.jqTime?

$.jqTime.helper =
    returnString: (tmpl, sepor, hou, min, sec)->
        str = ''
        sar = []
        tmpl = tmpl.toLowerCase()

        sar[tmpl.indexOf('h')] = hou if tmpl.indexOf('h') >= 0
        sar[tmpl.indexOf('m')] = min if tmpl.indexOf('m') >= 0
        sar[tmpl.indexOf('s')] = sec if tmpl.indexOf('s') >= 0

        str = sar.join(sepor)

        return str

    formater: (f_c)->
        if f_c?
            if String(f_c).length > 0
                f_c = '0' + Number f_c if Number f_c <= 9

            return String f_c

        return null

    updater: (increment, utc)->
        if increment % 300 is 0
            today = new Date()
            increment = 3600 * today.getHours() + 60 * today.getMinutes() + today.getSeconds()

            increment += today.getTimezoneOffset()*60 + utc*3600 if utc != 'real'

        return increment

    stingToTime: (str)->
        if str?
            str = str.split(':')
            time = 0
            v = 2
            for i in str
                time += Number(i) * Math.pow(60, v)
                v--

            return time
        else
            return null

    expToTime: (str, hou, min, sec)->
        str = str.replace /([h]+)/g, hou
        str = str.replace /([H]+)/g, @formater hou
        str = str.replace /([m]+)/g, min
        str = str.replace /([M]+)/g, @formater min
        str = str.replace /([s]+)/g, sec
        str = str.replace /([S]+)/g, @formater sec

        return str
