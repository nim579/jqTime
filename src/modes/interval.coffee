$.jqTime = {} unless $.jqTime?
$.jqTime.modes = {} unless $.jqTime.modes?

$.jqTime.modes.interval = (el, options)->

    i = el.jqTimeCurr

    i++
    i %= 86400
    if options.wrap
        if options.iFrom <= options.iTo
            if i >= options.iFrom && i <= options.iTo
                b = options.iTo - i
            else
              b = false
        else
            if (i >= options.iFrom && i <= 86400) || (i >= 0 && i <= options.iTo)
                b = (86400 + options.iTo - i)%86400
            else 
                b = false
    else
        if options.iFrom >= options.iTo
            if (i >= options.iFrom && i <= 86400) || (i <= options.iTo && i >= 0)
                b = i
            else
                b = false
        else
            if i >= options.iFrom && i <= options.iTo
                b = i
            else
                b = false

    unless b == false
        hou = Math.floor b / 3600
        min = Math.floor (b - hou * 3600) / 60
        sec = Math.floor b - hou * 3600 - min * 60

        if options.format
            hou = $.jqTime.helper.formater hou
            min = $.jqTime.helper.formater min
            sec = $.jqTime.helper.formater sec

        if options.exp?
            return_str = $.jqTime.helper.expToTime options.exp, hou, min, sec
        else
            return_str = $.jqTime.helper.returnString options.template, options.sepor, hou, min, sec

        $(el).text return_str
    else
        if options.alt?
            $(el).html options.alt
        else
            $(el).html el.oldHtml

    el.jqTimeCurr = i

    i = $.jqTime.helper.updater i, options.utc