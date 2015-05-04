import React from 'react';
import range from 'lodash/utility/range';

import Day from './day';

function constructWeeks(days) {
    var amountOfWeeks = days.length / 7;
    var dayElements = days.map( (day, index) => (<Day key={index} dayNumber={day.dayNumber.toString()} />));
    return range(amountOfWeeks).map(weekNumber => {
                var weekStart = weekNumber * 7;
                return dayElements.slice(weekStart, weekStart + 7);
           })
           .map((week, index) => (<div className="week" key={index}>{week}</div>));
    
}

var Month = React.createClass({
    propTypes: {
        month: React.PropTypes.object.isRequired
    },
    render() {
        var weeks = constructWeeks(this.props.month.days);
        return (
            <div className="month-view">
                <div>{this.props.month.name}</div>
                {weeks}
            </div>
        );
    }
});

export default Month;
