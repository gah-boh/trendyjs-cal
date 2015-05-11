import React from 'react';

import DayEvent from './day-event';

var Day = React.createClass({
    propTypes: {
        dayNumber: React.PropTypes.number.isRequired,
        dayEvents: React.PropTypes.array.isRequired
    },
    render() {
        var events = this.props.dayEvents.map(dayEvent => {
            return <DayEvent key={dayEvent.id} eventData={dayEvent} />
        });
        return (
            <div className="day">
                <div className="number">{this.props.dayNumber}</div>
                <div className="day-events">
                    {events}
                </div>
            </div>
        );
    }
});


export default Day;

