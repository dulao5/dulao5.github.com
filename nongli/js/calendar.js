(function() {
  var Calendar, CalendarView;
  Calendar = (function() {
    function Calendar(year, month) {
      this.setMonth(year, month);
      this.lunar = new Lunar;
    }
    Calendar.prototype.setMonth = function(year, month) {
      if ((year != null) && (month != null)) {
        this.currentYear = year2Ayear(year);
        this.currentMonth = month;
      }
      if (year != null) {
        this.currentYear = year2Ayear(year);
        this.currentMonth = 1;
      }
      if (year == null) {
        this.setByToday();
      }
      return this.todayJd = this.getLocalTodayH12Jd();
    };
    Calendar.prototype.currentMonth = null;
    Calendar.prototype.currentYear = null;
    Calendar.prototype.todayJd = null;
    Calendar.prototype.lunar = null;
    Calendar.prototype.previousMonth = function() {
      this.currentMonth -= 1;
      if (this.currentMonth === 0) {
        this.currentYear -= 1;
        this.currentMonth = 12;
        if (this.currentYear === 0) {
          return this.currentYear = 1;
        }
      }
    };
    Calendar.prototype.nextMonth = function() {
      this.currentMonth += 1;
      if (this.currentMonth === 13) {
        this.currentYear += 1;
        this.currentMonth = 1;
        if (this.currentYear === 0) {
          return this.currentYear = 1;
        }
      }
    };
    Calendar.prototype.checkYear = function() {};
    Calendar.prototype.setByToday = function() {
      var now;
      now = new Date();
      this.currentYear = now.getFullYear();
      return this.currentMonth = now.getMonth() + 1;
    };
    Calendar.prototype.getLocalTodayH12Jd = function() {
      var now;
      now = new Date();
      return JD.JD(now.getFullYear(), now.getMonth() + 1, now.getDate()) - J2000 + 0.5;
    };
    Calendar.prototype.getLocalTodayH12Jd2 = function() {
      var curTZ, now;
      now = new Date();
      now.setHours(12);
      now.setMinutes(0);
      now.setSeconds(0);
      curTZ = now.getTimezoneOffset() / 60;
      return int2(now / 86400000 - 10957.5 - curTZ / 24);
    };
    Calendar.prototype.getMonthly = function() {
      this.lunar.yueLiCalc(this.currentYear, this.currentMonth);
      return this.lunar;
    };
    Calendar.prototype.getMonthlyHtml = function() {
      this.lunar.yueLiHTML(this.currentYear, this.currentMonth, this.todayJd);
      return this.lunar.pg1;
    };
    return Calendar;
  })();
  window.Calendar = Calendar;
  CalendarView = (function() {
    CalendarView.prototype.calendar = null;
    function CalendarView(calendar) {
      this.calendar = calendar;
    }
    CalendarView.prototype.renderCurrentMonth = function(divId, headerId, footerId) {
      $("#" + divId)[0].innerHTML = this.calendar.getMonthlyHtml();
      $("#" + headerId)[0].innerHTML = "" + this.calendar.currentYear + "-" + this.calendar.currentMonth;
      return $("#" + footerId)[0].innerHTML = "农历" + this.calendar.lunar.Ly + "【" + this.calendar.lunar.ShX + "年】";
    };
    CalendarView.prototype.renderPreviousMonth = function(divId, headerId, footerId) {
      this.calendar.previousMonth();
      return this.renderCurrentMonth(divId, headerId, footerId);
    };
    CalendarView.prototype.renderNextMonth = function(divId, headerId, footerId) {
      this.calendar.nextMonth();
      return this.renderCurrentMonth(divId, headerId, footerId);
    };
    return CalendarView;
  })();
  window.CalendarView = CalendarView;
}).call(this);
