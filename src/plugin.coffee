$.jqTime = {}

$.fn.jqTime = (mode, options, customTime)->

    options = $.extend {
        wrap: false
        hour12: false
        utc: 'real'
        exp: 'HH:MM:SS d'
        timeFrom: ''
        timeTo: ''
        alt: null
        inInterval: null
        outInterval: null
        pm: 'p.m.'
        am: 'a.m.'
    }, options

    context = @

    options.today = new Date()

    options.i = 3600 * options.today.getHours() + 60 * options.today.getMinutes() + options.today.getSeconds()
    options.i += ( options.today.getTimezoneOffset() * 60 + options.utc * 3600 ) if options.utc != 'real'

    options.iFrom = $.jqTime.helper.stingToTime options.timeFrom
    options.iTo = $.jqTime.helper.stingToTime options.timeTo

    if $.jqTime.modes[mode]?
        this.each (index, el)->
            
            $el = $(@)

            if mode is 'clear'
                $.jqTime.modes[mode].call context, @

            else
                @jqTimeCurr = options.i
                @jqTimeToggle = null
                @oldHtml = $(@).html()
                
                clearInterval @jqTimeTimer if @jqTimeTimer?
                @jqTimeTimer = setInterval =>
                    $.jqTime.modes[mode].call context, @, options
                , 1000



