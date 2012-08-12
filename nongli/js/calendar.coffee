class Calendar
	constructor: (year, month) ->
		@setMonth year , month
		@lunar = new Lunar

	setMonth: (year, month) ->
		if year? and month?
			@currentYear = year2Ayear(year)
			@currentMonth = month
		if year?
			@currentYear = year2Ayear(year)
			@currentMonth = 1
		unless year?
			@setByToday()
		@todayJd = @getLocalTodayH12Jd()
		
	currentMonth: null
	currentYear: null
	todayJd: null
	lunar: null

	previousMonth: ->
		@currentMonth -= 1
		if @currentMonth == 0
			@currentYear -= 1
			@currentMonth = 12
			if @currentYear == 0
				@currentYear = 1
		
	nextMonth: ->
		@currentMonth += 1
		if @currentMonth == 13
			@currentYear += 1
			@currentMonth = 1
			if @currentYear == 0
				@currentYear = 1
	checkYear: ->
		
	setByToday: ->
		now = new Date()
		@currentYear = now.getFullYear()
		@currentMonth = now.getMonth()+1
		
	getLocalTodayH12Jd: ->
		#J2000起算的儒略日数(当前本地时间)
		now = new Date()
		JD.JD(now.getFullYear(), now.getMonth()+1, now.getDate()) - J2000 + 0.5
	getLocalTodayH12Jd2: ->
		now = new Date()
		now.setHours(12)
		now.setMinutes(0)
		now.setSeconds(0)
		curTZ = now.getTimezoneOffset()/60
		int2(now/86400000-10957.5 - curTZ/24) #J2000起算的儒略日数(当前本地时间)

	getMonthly : ->
		@lunar.yueLiCalc(@currentYear , @currentMonth)
		return @lunar

	getMonthlyHtml : ->
		@lunar.yueLiHTML(@currentYear , @currentMonth, @todayJd)
		@lunar.pg1

window.Calendar = Calendar


class CalendarView
	calendar:null
	constructor: (@calendar) ->
	renderCurrentMonth: (divId, headerId, footerId) ->
		$("##{divId}")[0].innerHTML = @calendar.getMonthlyHtml()
		$("##{headerId}")[0].innerHTML = "#{@calendar.currentYear}-#{@calendar.currentMonth}"
		$("##{footerId}")[0].innerHTML = "农历#{@calendar.lunar.Ly}【#{@calendar.lunar.ShX}年】"

	renderPreviousMonth: (divId, headerId, footerId) ->
		@calendar.previousMonth()
		@renderCurrentMonth divId, headerId, footerId

	renderNextMonth: (divId, headerId, footerId) ->
		@calendar.nextMonth()
		@renderCurrentMonth divId, headerId, footerId
		
window.CalendarView = CalendarView
