import range from 'lodash/utility/range';
import moment from 'moment';

function createDayModel(momentDay) {
    return {
        date: momentDay.date(),
        month: momentDay.month()+1,
        year: momentDay.year()
    };
}

export function buildWeek(yearNumber, weekNumber) {
    var momentDate = moment(`${yearNumber}`, 'YYYY').week(weekNumber);
    return daysForWeek(momentDate.startOf('week'))
                      .map(createDayModel);
}

export function buildMonth(month, year) {
    var momentMonth = year ? moment(`${month}-${year}`, 'M-YYYY') : moment(month, 'M') ;
    var weeks = weeksForMonth(momentMonth)
                    .map(weekStart => {
                        return buildWeek(weekStart.year(), weekStart.week());
                    });
    return {
        name: moment.localeData().months(momentMonth),
        year,
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

