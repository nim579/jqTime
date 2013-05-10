$.jqTime = {}

$.fn.jqTime = (mode, options, customTime)->

    options = $.extend {
                sepor: ':'
                wrap: false
                format: true
                utc: 'real'
                template: 'hms'
                exp: null
                timeFrom: ''
                timeTo: ''
                alt: null
                inInterval: null
                outInterval: null
    }, options

    if customTime?
        if customTime instanceof window.Date && customTime.getHours?
            options.today = customTime
        else if typeof customTime is 'string'
            options.today = new Date(customTime)
        else
            options.today = new Date()
    else
        options.today = new Date()

    options.i = 3600 * options.today.getHours() + 60 * options.today.getMinutes() + options.today.getSeconds()
    options.i += eval(options.today.getTimezoneOffset()*60 + options.utc*3600) if options.utc != 'real'
    seeta = 'ter'

    options.iFrom = $.jqTime.helper.stingToTime options.timeFrom
    options.iTo = $.jqTime.helper.stingToTime options.timeTo

    if $.jqTime.modes[mode]?
        this.each (index, el)->
            
            $el = $(@)

            if mode is 'clear'
                $.jqTime.modes[mode](@)
            else
                @jqTimeCurr = options.i
                @jqTimeToggle = null
                @oldHtml = $(@).html()
                
                clearInterval @jqTimeTimer if @jqTimeTimer?
                @jqTimeTimer = setInterval =>
                    $.jqTime.modes[mode](@, options)
                , 1000



