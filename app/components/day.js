import React from 'react';

var Day = React.createClass({
    propTypes: {
        dayNumber: React.PropTypes.number.isRequired,
        dayEvents: React.PropTypes.array.isRequired
    },
    render() {
        var events = this.props.dayEvents.map(dayEvent => {
            return <div key={dayEvent.id} className="day-event">{dayEvent.title}</div>
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

