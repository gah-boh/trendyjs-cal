import range from 'lodash/utility/range';
import moment from 'moment';

export function buildWeek(dayNumber, monthNumber, yearNumber) {
    var momentDate = yearNumber ? moment(`${dayNumber}-${monthNumber}`, 'DD-MM') : moment(`${dayNumber}-${monthNumber}-${yearNumber}`, 'DD-MM-YYYY');
    return daysForWeek(momentDate.startOf('week'))
                      .map(day => {
                          return {
                              date: day.date()+1,
                              month: day.month()+1
                          }
                      });
}

export function buildMonth(monthNumber, yearNumber) {
    var momentMonth = yearNumber ? moment(`${monthNumber}-${yearNumber}`, 'MM-YYYY') : moment(monthNumber, 'MM') ;
    var weeks = weeksForMonth(momentMonth)
                    .map(week => {
                        return week.map(day => {
                            return {
                                date: day.date()+1,
                                month: day.month()+1
                            }
                        })
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
    return firstDaysOfWeeksForMonth(momentMonth)
                    .map(firstDayOfWeek => {
                        return daysForWeek(firstDayOfWeek);
                    });

    function firstDaysOfWeeksForMonth(momentDate) {
        var week = momentDate.clone().startOf('month').startOf('week');
        var amountOfWeeks = ((week.diff(momentDate.clone().endOf('month').endOf('week'), 'days') -1) * -1) / 7;
        return range(amountOfWeeks).map((index) => {
            return week.clone().add(index, 'week');
        });
    }
}

export function monthsForYear(yearNum) {
    var year = moment(''+yearNum, 'YYYY');
    return range(12).map(index => {
        return year.clone().add(index, 'month');
    });
}

