import React from 'react';
import moment from 'moment';
import _ from 'lodash';

import CalendarEventsStore from '../stores/calendar-events-store';
import Day from './day';

var Month = React.createClass({
    propTypes: {
        month: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            calendarEvents: []
        }
    },
    componentDidMount() {
        CalendarEventsStore.calendarEvents.subscribe(calendarEvents => {
            this.setState({calendarEvents});
        });
    },
    render() {
        var weeks = constructWeeks(this.props.month.weeks, this.state.calendarEvents);
        return (
            <div className="month">
                <h3>{this.props.month.name}</h3>
                <ul>
                    {getDayNames()}
                </ul>
                {weeks}
            </div>
        );
    }
});

function isDayOnEvent(day, event) {
    var dayTime = getTime(day);
    var eventTime = getTime(event);
    return _.isEqual(dayTime, eventTime);
    function getTime(dateContainer) {
        return _.pick(dateContainer, ['year', 'month', 'date']);
    };
}

function constructDays(week, calendarEvents) {
    return week.map((day, dayIndex) =>{
        var dayEvents = calendarEvents.filter(event => {
            return isDayOnEvent(day, event);
        });
        return (<Day key={dayIndex} dayInfo={day} dayEvents={dayEvents} />)
    });
}

function constructWeeks(weeks, calendarEvents) {
    return weeks.map((week, weekIndex) => {
        var days = constructDays(week, calendarEvents);
        return (<div className="week" key={weekIndex}>{days}</div>);
    });
}

function getDayNames() {
    return moment.weekdays().map((dayName, index) => {
        return <li key={index} className="day-name">{dayName}</li>;
    });
}

export default Month;
