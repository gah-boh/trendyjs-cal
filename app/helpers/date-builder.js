import _ from 'lodash';
import moment from 'moment';


export function buildMonth(monthNumber, yearNumber) {
    var momentMonth = yearNumber ? moment(`${monthNumber}-${yearNumber}`, 'MM-YYYY') : moment(monthNumber, 'MM') ;
    var days = _.chain(firstDaysOfWeeksForMonth(momentMonth))
                .map(firstDayOfWeek => {
                    return daysForWeek(firstDayOfWeek).map(day => {
                        return {
                            dayNumber: day.date()
                        }
                    })
                })
                .flatten()
                .value();
    return {
        name: moment.localeData().months(momentMonth),
        days
    };
}

export function daysForWeek(startOfWeek) {
    return _.range(7).map(index => {
        return startOfWeek.clone().add(index, 'day');
    });
}

export function firstDaysOfWeeksForMonth(momentDate) {
    var week = momentDate.clone().startOf('month').startOf('week');
    var amountOfWeeks = ((week.diff(momentDate.clone().endOf('month').endOf('week'), 'days') -1) * -1) / 7;
    return _.range(amountOfWeeks).map((index) => {
        return week.clone().add(index, 'week');
    });
}

export function monthsForYear(yearNum) {
    var year = moment(''+yearNum, 'YYYY');
    return _.range(12).map(index => {
        return year.clone().add(index, 'month');
    });
}

