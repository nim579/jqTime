$.jqTime = {} unless $.jqTime?
$.jqTime.modes = {} unless $.jqTime.modes?

$.jqTime.modes.current = (el, options)->
    time =
        hours: 0
        minutes: 0
        seconds: 0
        utc: options.utc
        formated: ''

    i = el.jqTimeCurr

    i++
    i %= 86400
    w = i
    w = 86400 + w if w < 0
    w = 86400 - w if options.wrap

    time.hours = Math.floor w / 3600
    time.minutes = Math.floor (w - time.hours * 3600) / 60
    time.seconds = Math.floor w - time.hours * 3600 - time.minutes * 60

    if options.hour12
        middayBoolean = Math.floor time.hours/13
        time.hours -= 12 * middayBoolean
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
    el.jqTimeCurr = i

    i = $.jqTime.helper.updater i, options.utc
