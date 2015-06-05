import React from 'react';
import moment from 'moment';
import Immutable from 'immutable';
import Router from 'react-router';

import Week from './week';
import WeekDayNamesHeader from './weekday-names-header';
import DateBuilder from '../helpers/date-builder';
import CalendarEventsStore from '../stores/calendar-events-store';

const {PureRenderMixin} = React.addons;

WeekView.inject = [Week, WeekDayNamesHeader, DateBuilder, CalendarEventsStore];
function WeekView (Week, WeekDayNamesHeader, DateBuilder, CalendarEventsStore){
    return React.createClass({
        getInitialState() {
            return {
                calendarEvents: Immutable.List()
            };
        },
        mixins: [PureRenderMixin, Router.State],
        componentWillMount() {
            this.disposableCalendarEvents = CalendarEventsStore.calendarEvents.subscribe(calendarEvents => {
                this.setState({calendarEvents});
            });
        },
        componentWillUnmount() {
            this.disposableCalendarEvents.dispose();
        },
        getWeekData() {
            const {year, week} = this.getParams();
            return DateBuilder.buildWeek(year, week - 1);
        },
        render() {
            const weekData = this.getWeekData();
            const {month, year} = getDateTitles(weekData.first());
            return (
                <div className="week-view">
                    <h3>{month} {year}</h3>
                    <WeekDayNamesHeader />
                    <div className="week-wrapper">
                        <Week week={weekData} calendarEvents={this.state.calendarEvents} />
                    </div>
                </div>
            );
        }
    });

    function getDateTitles(dayInfo) {
        const date = moment(`${dayInfo.month}`, 'M');
        return {
            month: moment.localeData().months(date),
            year: date.year()
        };
    }
}

export default WeekView;

