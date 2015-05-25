import React from 'react';
import moment from 'moment';
import _ from 'lodash';

import Week from './week';
import CalendarEventsStore from '../stores/calendar-events-store';

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
                <ul>{getDayNames()}</ul>
                {weeks}
            </div>
        );
    }
});

function constructWeeks(weeks, calendarEvents) {
    return weeks.map((week, weekIndex) => {
        return (<Week week={week} calendarEvents={calendarEvents} key={weekIndex}></Week>);
    });
}

function getDayNames() {
    return moment.weekdays().map((dayName, index) => {
        return <li key={index} className="day-name">{dayName}</li>;
    });
}

export default Month;
