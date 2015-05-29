import React from 'react';

import EventActions from '../actions/event-actions';

var DayEvent = function(EventActions){
    return React.createClass({
        propTypes: {
            eventData: React.PropTypes.object.isRequired
        },
        handleClick(event) {
            event.stopPropagation();
            EventActions.currentEventAction.onNext(this.props.eventData);
        },
        render() {
            var dayEvent = this.props.eventData;
            return (
                <div onClick={this.handleClick} className="day-event">{dayEvent.title}</div>
            );
        }
    });
}
DayEvent.inject = [EventActions];

export default DayEvent;

