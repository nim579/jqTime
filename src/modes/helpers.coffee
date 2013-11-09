$.jqTime = {} unless $.jqTime?

$.jqTime.helper =
    returnString: (tmpl="hms", sepor=':', hou="H", min="M", sec="S")->
        tmpl = "hms" unless typeof tmpl is 'string'
        sepor = ":" unless typeof sepor is 'string' or typeof sepor is 'number'
        sar = []
        tmpl = tmpl.toLowerCase()

        sar[tmpl.indexOf('h')] = hou if tmpl.indexOf('h') >= 0
        sar[tmpl.indexOf('m')] = min if tmpl.indexOf('m') >= 0
        sar[tmpl.indexOf('s')] = sec if tmpl.indexOf('s') >= 0

        result = []
        for i in sar
            result.push i if !!i or i == 0

        return result.join(sepor)

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

    stingToTime: (string)->
        if string?
            time = 0
            return 0 unless string
            return string if typeof string is 'number'
            arr = string.split ':'
            arr = arr.slice 0, 3
            time = 0
            for i, v in arr
                return NaN if Number i is NaN
                time += Math.floor( Number i ) * Math.pow(60, 2-v)

            return time

        else
            return null

    expToTime: (str, hou, min, sec, midday)->
        if str && typeof str is 'string'
            if hou? and typeof hou is 'string' or typeof hou is 'number'
                str = str.replace /([h]+)/g, hou
                str = str.replace /([H]+)/g, @formater hou

            if min? and typeof min is 'string' or typeof min is 'number'
                str = str.replace /([m]+)/g, min
                str = str.replace /([M]+)/g, @formater min

            if sec? and typeof sec is 'string' or typeof sec is 'number'
                str = str.replace /([s]+)/g, sec
                str = str.replace /([S]+)/g, @formater sec

            if midday? and ( midday.now is 'am' or midday.now is 'pm' )
                str = str.replace /([d]+)/g, midday[midday.now]
                str = str.replace /([D]+)/g, midday[midday.now]

            else
                str = str.replace /([d]+)/g, ''
                str = str.replace /([D]+)/g, ''

            return str

        return null

    # Method of Underscoreю.js, not tested
    filter: (obj, iterator, context)->
        results = []
        return results unless obj?
        return obj.filter(iterator, context) if  Array.prototype.filter and obj.filter == Array.prototype.filter

        each obj, (value, index, list)->
            results[results.length] = value if iterator.call context, value, index, list

        return results
