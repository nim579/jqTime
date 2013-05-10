$.jqTime = {} unless $.jqTime?
$.jqTime.modes = {} unless $.jqTime.modes?

$.jqTime.modes.clear = (el)->

    if el.jqTimeTimer?
        clearInterval el.jqTimeTimer
        delete el.jqTimeTimer
        
    if el.jqTimeCurr?
        delete el.jqTimeCurr

    if el.jqTimeToggle?
        delete el.jqTimeToggle

    if el.oldHtml?
        $(el).html el.oldHtml
        delete el.oldHtml