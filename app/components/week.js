import React from 'react';

import Day from './day';

var Week = React.createClass({
    propTypes: {
        week: React.PropTypes.array.isRequired,
        monthName: React.PropTypes.string.isRequired
    },
    render() {
        var days = this.props.week.map((day, index) => (<Day key={index} dayNumber={day.date} />));
        return (
            <div className="week">
                <div>{this.props.monthName}</div>
                <div className="week">
                    {days}
                </div>
            </div>
        );
    }
});

export default Week;

