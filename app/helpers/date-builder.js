import moment from 'moment';

function range(end) {
    var indexes = Array.apply(null, Array(end));
    return indexes.map((ignore, index) => index);
}

export function buildMonth(monthNumber, yearNumber) {
    var momentMonth = yearNumber ? moment(`${monthNumber}-${yearNumber}`, 'MM-YYYY') : moment(monthNumber, 'MM') ;
    var days = weeksForMonth(momentMonth)
                            .map(firstDayOfWeek => {
                                return daysForWeek(firstDayOfWeek).map(day => {
                                    return {
                                        dayNumber: day.date()
                                    }
                                })
                            })
                            .reduce((month, weekDays) => {
                                return month.concat(weekDays);
                            }, [])
    return {
        name: moment.localeData().months(momentMonth),
        days
    };
}

export function daysForWeek(startOfWeek) {
    return range(7).map(index => {
        return startOfWeek.clone().add(index, 'day');
    });
}

export function weeksForMonth(momentDate) {
    var week = momentDate.clone().startOf('month').startOf('week');
    var amountOfWeeks = ((week.diff(momentDate.clone().endOf('month').endOf('week'), 'days') -1) * -1) / 7;
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

