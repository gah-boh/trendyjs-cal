import range from 'lodash/utility/range';
import moment from 'moment';

function createDayModel(momentDay) {
    return {
        date: momentDay.date(),
        month: momentDay.month()+1
    };
}

export function buildWeek(dayNumber, monthNumber, yearNumber) {
    var momentDate = yearNumber ? moment(`${dayNumber}-${monthNumber}-${yearNumber}`, 'D-M-YYYY') : moment(`${dayNumber}-${monthNumber}`, 'D-M') ;
    return daysForWeek(momentDate.startOf('week'))
                      .map(createDayModel);
}

export function buildMonth(monthNumber, yearNumber) {
    var momentMonth = yearNumber ? moment(`${monthNumber}-${yearNumber}`, 'M-YYYY') : moment(monthNumber, 'M') ;
    var weeks = weeksForMonth(momentMonth)
                    .map(weekStart => {
                        return buildWeek(weekStart.date(), weekStart.month()+1, weekStart.year());
                    });
    return {
        name: moment.localeData().months(momentMonth),
        weeks
    };
}

export function daysForWeek(startOfWeek) {
    return range(7).map(index => {
        return startOfWeek.clone().add(index, 'day');
    });
}

export function weeksForMonth(momentMonth) {
    var week = momentMonth.clone().startOf('month').startOf('week');
    var amountOfWeeks = ((week.diff(momentMonth.clone().endOf('month').endOf('week'), 'days') -1) * -1) / 7;
    return range(amountOfWeeks).map((index) => {
        return week.clone().add(index, 'week');
    });
}

export function monthsForYear(yearNum) {
    var year = moment(''+yearNum, 'YYYY');
    return range(12).map(index => {
        return year.clone().add(index, 'month');
    });
}

