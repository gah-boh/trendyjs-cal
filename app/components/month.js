import React from 'react';
import range from 'lodash/utility/range';

import Day from './day';

function constructWeeks(weeks) {
    return weeks.map((week, weekIndex) => {
        var days = week.map((day, dayIndex) => (<Day key={dayIndex} dayNumber={day.date} />));
        return (<div className="week" key={weekIndex}>{days}</div>);
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
                <div>{this.props.month.name}</div>
                {weeks}
            </div>
        );
    }
});

export default Month;
