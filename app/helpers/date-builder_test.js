import moment from 'moment';
import * as dateBuilder from './date-builder';
describe('Date Builder', () => {

    var sut;
    var format;

    beforeEach(() => {
        sut = dateBuilder;
        format = 'MM-DD-YYYY'
    });

    describe('buildMonth', () => {

        describe('with no year defined', () => {

            it('should return an object with the month name', () => {
                var result = sut.buildMonth(1);
                expect(result.name).toBe('January');
            });

        });

        describe('with year defined', () => {

            var result;

            beforeEach(() => {
                result = sut.buildMonth(2, 2014);
            });

            it('should have array of days including edges for given year', () => {
                expect(result.weeks.length).toBe(5);
            });

            it('should have the first day of the week of the month', () => {
                expect(result.weeks[0][0].date).toBe(27);
            });

            it('should have the correct month for the date whether it is that month or not', () => {
                var firstWeek = result.weeks[0];
                expect(firstWeek[0].month).toBe(1);
            });

        });

    });

    describe('daysForWeek', () => {

        var startWeekDate;

        beforeEach(() => {
            startWeekDate = '04-05-2015';
        });

        it('should return 7 days', () => {
            var result = sut.daysForWeek(moment(startWeekDate, format));
            expect(result.length).toBe(7);
        });

        it('should return the first day of the week at the beginning of array', () => {
            var week = sut.daysForWeek(moment(startWeekDate, format));
            var firstDay = week[0];
            expect(firstDay.weekday()).toBe(0);
            expect(firstDay.date()).toBe(5);
        });

        it('should give all days of week', () => {
            var week = sut.daysForWeek(moment(startWeekDate, format));
            var lastDay = week[week.length - 1];
            expect(lastDay.weekday()).toBe(6);
            expect(lastDay.date()).toBe(11);
        });

    });

    describe('weeksForMonth', () => {

        var april2015;

        beforeEach(() => {
            april2015 = moment('04-01-2015', format)
        });

        it('should return a length of 5 for the weeks', () => {
            var result = sut.weeksForMonth(april2015);
            expect(result.length).toBe(5);
        });

        it('should return march 29 as the first day of the first week for april 2015', () => {
            var firstWeek = sut.weeksForMonth(april2015)[0];
            expect(firstWeek[0].date()).toBe(29);
            expect(firstWeek[0].format('MM')).toBe('03');
        });

        it('should return may 2 as the last day of the of the last week of april 2015', () => {
            var weeks = sut.weeksForMonth(april2015);
            var lastWeek = weeks[weeks.length - 1];
            expect(lastWeek[0].endOf('week').date()).toBe(2);
            expect(lastWeek[0].endOf('week').format('MM')).toBe('05');
        });

    });

    describe('monthsForYear', () => {

        it('should return 12 months', () => {
            var result = sut.monthsForYear(2015);
            expect(result.length).toBe(12);
        });

        it('should have moments that pertain to the given year', () => {
            var result = sut.monthsForYear(2015);
            expect(result[0].year()).toBe(2015);
            expect(result[11].year()).toBe(2015);
        });

    });

});
