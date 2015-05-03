import React from 'react';

import Day from './day';

function constructDays(days) {
    return days.map( (day, index) => (<Day key={index} dayNumber={day.dayNumber.toString()} />));
}

var Month = React.createClass({
    propTypes: {
        month: React.PropTypes.object.isRequired
    },
    render() {
        var days = constructDays(this.props.month.days);
        return (
            <div className="month-view">
                <div>{this.props.month.name}</div>
                {days}
            </div>
        );
    }
});

export default Month;
