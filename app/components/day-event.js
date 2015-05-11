import React from 'react';
import {currentEventAction} from '../actions/event-actions';

var DayEvent = React.createClass({
    propTypes: {
        eventData: React.PropTypes.object.isRequired
    },
    handleClick() {
        currentEventAction.onNext(this.props.eventData);
    },
    render() {
        var dayEvent = this.props.eventData;
        return (
            <div onClick={this.handleClick} className="day-event">{dayEvent.title}</div>
        );
    }
});

export default DayEvent;

