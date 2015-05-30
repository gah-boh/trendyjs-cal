import React from 'react';
import moment from 'moment';

function WeekdayNamesHeader () {
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

