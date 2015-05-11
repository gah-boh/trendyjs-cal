import React from 'react';
import moment from 'moment';
import range from 'lodash/utility/range';

import CalendarEventsStore from '../stores/calendar-events-store';
import Day from './day';

function constructWeeks(weeks, calendarEvents) {
    return weeks.map((week, weekIndex) => {
        var days = week.map((day, dayIndex) =>{
            var dayEvents = calendarEvents[day.year] &&
                            calendarEvents[day.year][day.month] && 
                            calendarEvents[day.year][day.month][day.date] ?
                            calendarEvents[day.year][day.month][day.date] : [];
            return (<Day key={dayIndex} dayNumber={day.date} dayEvents={dayEvents} />)
        });
        return (<div className="week" key={weekIndex}>{days}</div>);
    });
}

function getDayNames() {
    return moment.weekdays().map((dayName, index) => {
        return <li key={index} className="day-name">{dayName}</li>;
    });
}

var Month = React.createClass({
    propTypes: {
        month: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            calendarEvents: {}
        }
    },
    componentDidMount() {
        CalendarEventsStore.eventsByDate.subscribe(eventsByDate => {
            this.setState({calendarEvents: eventsByDate});
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

export default Month;
