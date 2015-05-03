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
                expect(result.days.length).toBe(35);
            });

            it('should have the first day of the week of the month', () => {
                expect(result.days[0].dayNumber).toBe(26);
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
            april2015 = moment('04-01-2015', format);
        });

        it('should return a length of 5 for the weeks', () => {
            var result = sut.weeksForMonth(april2015);
            expect(result.length).toBe(5);
        });

        it('should return march 29 as the first day of the first week', () => {
            var result = sut.weeksForMonth(april2015)[0];
            expect(result.date()).toBe(29);
            expect(result.format('MM')).toBe('03');
        });

        it('should return may 2 as the last day of the of the last week', () => {
            var weeks = sut.weeksForMonth(april2015);
            var lastWeek = weeks[weeks.length - 1];
            expect(lastWeek.endOf('week').date()).toBe(2);
            expect(lastWeek.endOf('week').format('MM')).toBe('05');
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
