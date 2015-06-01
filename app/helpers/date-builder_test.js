import moment from 'moment';
import DateBuilder from './date-builder';
import {Container} from 'aurelia-dependency-injection';

describe('Date Builder', () => {

    var sut;
    var format;

    beforeEach(() => {
        var container = new Container();
        sut = container.get(DateBuilder);
        format = 'MM-DD-YYYY';
    });

    describe('buildWeek', () => {

        it('should return an array with 7 days', () => {
            var week = sut.buildWeek(2015, 5);
            expect(week.size).toBe(7);
        });

        it('should return the first day of the week for the given date', () => {
            var week = sut.buildWeek(2015, 14);
            expect(week.first().date).toBe(29);
            expect(week.first().month).toBe(3);
        });

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
                expect(result.weeks.size).toBe(5);
            });

            it('should have the first day of the week of the month', () => {
                expect(result.weeks.first().first().date).toBe(26);
            });

            it('should have the correct month for the date whether it is in the given month or not', () => {
                var firstWeek = result.weeks.first();
                expect(firstWeek.first().month).toBe(1);
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

        it('should return march 29 as the first day of the first week for april 2015', () => {
            var firstDayOfFirstWeek = sut.weeksForMonth(april2015)[0];
            expect(firstDayOfFirstWeek.date()).toBe(29);
            expect(firstDayOfFirstWeek.format('MM')).toBe('03');
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
