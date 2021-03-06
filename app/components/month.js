import React from 'react';
import moment from 'moment';
import Immutable from 'immutable';

import {Link} from 'react-router';

import Week from './week';
import WeekdayNamesHeader from './weekday-names-header';
import CalendarEventsStore from '../stores/calendar-events-store';

Month.inject = [Week, WeekdayNamesHeader, CalendarEventsStore];
function Month(Week, WeekdayNamesHeader, CalendarEventsStore) {
    return React.createClass({
        propTypes: {
            month: React.PropTypes.object.isRequired
        },
        getInitialState() {
            return {
                calendarEvents: Immutable.List()
            };
        },
        componentDidMount() {
            this.disposableCalendarEvents = CalendarEventsStore.calendarEvents.subscribe(calendarEvents => {
                this.setState({calendarEvents});
            });
        },
        componentWillUnmount() {
            this.disposableCalendarEvents.dispose();
        },
        render() {
            const weeks = constructWeeks(this.props.month.weeks, this.state.calendarEvents);
            return (
                <div className="month">
                    <h3>{this.props.month.name} {this.props.month.year}</h3>
                    <WeekdayNamesHeader />
                    {weeks}
                </div>
            );
        }
    });

    function constructWeeks(weeks, calendarEvents) {
        return weeks.map((week, weekIndex) => {
            const firstDay = week.first();
            const weekStartDate = moment(`${firstDay.date}-${firstDay.month}-${firstDay.year}`, 'D-M-YYYY');
            return (
                <div key={weekIndex} className="week-wrapper">
                    <div className="week-select">
                        <a href="#">
                            <Link to="week" params={{year: weekStartDate.year(), week: weekStartDate.week() + 1}}>SELECT</Link>
                        </a>
                    </div>
                    <Week week={week} calendarEvents={calendarEvents}></Week>
                </div>
            );
        });
    }
}

export default Month;
