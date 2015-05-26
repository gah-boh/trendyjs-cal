import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import {Link} from 'react-router';

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
        var firstDay = week[0];
        var weekStartDate = moment(`${firstDay.date}-${firstDay.month}-${firstDay.year}`, 'D-M-YYYY');
        return (
            <div key={weekIndex} className="week-wrapper">
                <div className="week-select">
                    <a href="javascript:void(0)">
                        <Link to="week" params={{year: weekStartDate.year(), week: weekStartDate.week()+1}}>SELECT</Link>
                    </a>
                </div>
                <Week week={week} calendarEvents={calendarEvents}></Week>
            </div>
        );
    });
}

function getDayNames() {
    return moment.weekdays().map((dayName, index) => {
        return <li key={index} className="day-name">{dayName}</li>;
    });
}

export default Month;
