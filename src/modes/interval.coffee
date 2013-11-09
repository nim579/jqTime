$.jqTime = {} unless $.jqTime?
$.jqTime.modes = {} unless $.jqTime.modes?

$.jqTime.modes.interval = (el, options)->
    time =
        utc: options.utc
        formated: ''
        inInterval: false

    i = el.jqTimeCurr

    i++
    i %= 86400

    b = false

    if options.wrap
        if options.iFrom <= options.iTo
            b = options.iTo - i if i >= options.iFrom && i <= options.iTo

        else
            b = (86400 + options.iTo - i)%86400 if (i >= options.iFrom && i <= 86400) || (i >= 0 && i <= options.iTo)

    else
        if options.iFrom >= options.iTo
            b = i if (i >= options.iFrom && i <= 86400) || (i <= options.iTo && i >= 0)

        else
            b = i if i >= options.iFrom && i <= options.iTo

    unless b is false
        time.inInterval = true

        time.hours = Math.floor b / 3600
        time.minutes = Math.floor (b - time.hours * 3600) / 60
        time.seconds = Math.floor b - time.hours * 3600 - time.minutes * 60

        if options.hour12
            middayBoolean = Math.floor time.hours/13
            time.hours -= 12*middayBoolean
            time.midday = if !!middayBoolean then 'pm' else 'am'

        time.formated = $.jqTime.helper.expToTime(
            options.exp
            time.hours
            time.minutes
            time.seconds
            if time.midday? then {
                now: time.midday
                pm: options.pm
                am: options.am
            }
        )

        $(el).html time.formated
    else
        time.inInterval = false

        if options.alt?
            $(el).html options.alt
            time.formated = options.alt

        else
            $(el).html el.oldHtml
            time.formated = el.oldHtml

    el.jqTimeCurr = i

    i = $.jqTime.helper.updater i, options.utc

    return time
