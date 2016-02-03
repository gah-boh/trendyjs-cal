import range from 'lodash/utility/range';
import moment from 'moment';
import Immutable from 'immutable';
import {inject} from 'di';

import DayRecord from '../models/day-record';

@inject(DayRecord)
export default class DateBuilder {
    constructor(DayRecord) {
        this.DayRecord = DayRecord;
    }
    // Build a full week using the week number (0-51)
    // and corresponding year returning a Day model for
    // each day.
    buildWeek(yearNumber, weekNumber) {
        var momentDate = moment(`${yearNumber}`, 'YYYY').week(weekNumber);
        var week = this.daysForWeek(momentDate.startOf('week'))
                          .map(this.createDayModel.bind(this));
        return Immutable.List(week);
    }
    // Build a month using the month number using the month (1-12) and
    // corresponding year. It will get each week of that month including
    // weeks that have days of previous and following month.
    buildMonth(month, year) {
        var momentMonth = year ? moment(`${month}-${year}`, 'M-YYYY') : moment(month, 'M') ;
        var weeks = this.weeksForMonth(momentMonth)
                        .map(weekStart => {
                            return this.buildWeek(weekStart.year(), weekStart.week());
                        });
        // TODO: Return an immutable record
        return {
            name: moment.localeData().months(momentMonth),
            year,
            weeks: Immutable.List(weeks)
        };
    }
    // Create a model of a day
    // Returns a DayRecord which is an
    // immutable data stucture.
    createDayModel(momentDay) {
        return new this.DayRecord({
            date: momentDay.date(),
            month: momentDay.month()+1,
            year: momentDay.year()
        });
    }
    // Get an array of days for every day of the week
    daysForWeek(startOfWeek) {
        return range(7).map(index => {
            return startOfWeek.clone().add(index, 'day');
        });
    }
    // Get an array of weeks that correspond to a month.
    // The week will include days that may fall outside
    // of current month but also have days that fall inside
    // current month.
    weeksForMonth(momentMonth) {
        var week = momentMonth.clone().startOf('month').startOf('week');
        var amountOfWeeks = ((week.diff(momentMonth.clone().endOf('month').endOf('week'), 'days') -1) * -1) / 7;
        return range(amountOfWeeks).map((index) => {
            return week.clone().add(index, 'week');
        });
    }
    // Get all the months corresponding to the given year.
    monthsForYear(yearNum) {
        var year = moment(''+yearNum, 'YYYY'); // using ''+yearNum to coerce int to string.
        return range(12).map(index => {
            return year.clone().add(index, 'month');
        });
    }
}


