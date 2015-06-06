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
    buildWeek(yearNumber, weekNumber) {
        var momentDate = moment(`${yearNumber}`, 'YYYY').week(weekNumber);
        var week = this.daysForWeek(momentDate.startOf('week'))
                          .map(this.createDayModel.bind(this));
        return Immutable.List(week);
    }
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
    createDayModel(momentDay) {
        return new this.DayRecord({
            date: momentDay.date(),
            month: momentDay.month()+1,
            year: momentDay.year()
        });
    }
    daysForWeek(startOfWeek) {
        return range(7).map(index => {
            return startOfWeek.clone().add(index, 'day');
        });
    }
    weeksForMonth(momentMonth) {
        var week = momentMonth.clone().startOf('month').startOf('week');
        var amountOfWeeks = ((week.diff(momentMonth.clone().endOf('month').endOf('week'), 'days') -1) * -1) / 7;
        return range(amountOfWeeks).map((index) => {
            return week.clone().add(index, 'week');
        });
    }
    monthsForYear(yearNum) {
        var year = moment(''+yearNum, 'YYYY');
        return range(12).map(index => {
            return year.clone().add(index, 'month');
        });
    }
}


