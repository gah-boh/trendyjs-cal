import range from 'lodash/utility/range';
import moment from 'moment';

function createDayModel(momentDay) {
    return {
        date: momentDay.date(),
        month: momentDay.month()+1,
        year: momentDay.year()
    };
}

export default class DateBuilder {
    buildWeek(yearNumber, weekNumber) {
        var momentDate = moment(`${yearNumber}`, 'YYYY').week(weekNumber);
        return this.daysForWeek(momentDate.startOf('week'))
                          .map(createDayModel);
    }
    buildMonth(month, year) {
        var momentMonth = year ? moment(`${month}-${year}`, 'M-YYYY') : moment(month, 'M') ;
        var weeks = this.weeksForMonth(momentMonth)
                        .map(weekStart => {
                            return this.buildWeek(weekStart.year(), weekStart.week());
                        });
        return {
            name: moment.localeData().months(momentMonth),
            year,
            weeks
        };
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


