import React from 'react';
import moment from 'moment';

var WeekdayNamesHeader = function() {
    return React.createClass({
        render() {
            return (
                <ul>{getDayNames()}</ul>
            );
        }
    });

    function getDayNames() {
        return moment.weekdays().map((dayName, index) => {
            return <li key={index} className="day-name">{dayName}</li>;
        });
    }
}

export default WeekdayNamesHeader;

