import React from 'react';
import moment from 'moment';
import range from 'lodash/utility/range';

import Day from './day';

function constructWeeks(weeks) {
    return weeks.map((week, weekIndex) => {
        var days = week.map((day, dayIndex) => (<Day key={dayIndex} dayNumber={day.date} />));
        return (<div className="week" key={weekIndex}>{days}</div>);
    });
}

function getDayNames() {
    return moment.weekdays().map(dayName => {
        return <li className="day-name">{dayName}</li>;
    });
}

var Month = React.createClass({
    propTypes: {
        month: React.PropTypes.object.isRequired
    },
    render() {
        var weeks = constructWeeks(this.props.month.weeks);
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
