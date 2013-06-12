$.jqTime = {} unless $.jqTime?
$.jqTime.modes = {} unless $.jqTime.modes?

$.jqTime.modes.multi = (el, options)->
    time =
        utc: options.utc
        formated: ''
        inInterval: false

    intervalIndex = 0

    i = el.jqTimeCurr
    i++

    if !(options.multi?) or options.multi.length == 0
        options.multi = [
            {
                after: "00:00"
                payload: 'am'
            },
            {
                after: "13:00",
                payload: "pm"
            }
        ]

    if options.multi.length == 1
        options.multi.push
            after: if $.jqTime.helper.stingToTime(options.multi[0].after) isnt 0 then "00:00" else "13:00"
            payload: if $.jqTime.helper.stingToTime(options.multi[0].after) isnt 0 then "am" else "pm"

    options.multi = $.jqTime.helper.filter options.multi, (val)->
        return !!val.after

    for interval, index in options.multi
        interval.id = "interval" + (index+1)
        interval.after = $.jqTime.helper.stingToTime interval.after

    options.multi.sort = options.multi.sort (index, ii)->
        return 1 if index.after > ii.after
        return -1 if index.after < ii.after
        return 0 if index.after == ii.after

    for interval, index in options.multi
        if i >= interval.after
            intervalIndex = index

    intervalIndex = options.multi.length-1 if i <= options.multi[0].after

    time.inInterval = options.multi[intervalIndex].id

    if el.jqTimeMulti isnt time.inInterval
        el.jqTimeMulti = time.inInterval

        $(el).trigger "#{time.inInterval}.jqTime"
        if options.multi[intervalIndex].payload
            if typeof options.multi[intervalIndex].payload is 'Function'
                options.multi[intervalIndex].payload()

            else
                $(el).html(options.multi[intervalIndex].payload).show()

        else
            $(el).hide()

    el.jqTimeCurr = i
    i = $.jqTime.helper.updater i, options.utc

    return time
