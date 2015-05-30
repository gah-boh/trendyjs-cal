import React from 'react';

import EventActions from '../actions/event-actions';
import DayEvent from './day-event';

Day.inject = [EventActions, DayEvent];
function Day(EventActions, DayEvent) {
    return React.createClass({
        propTypes: {
            dayInfo: React.PropTypes.object.isRequired,
            dayEvents: React.PropTypes.array.isRequired
        },
        createEvent() {
            EventActions.createEventAction.onNext(this.props.dayInfo);
        },
        render() {
            var events = this.props.dayEvents.map(dayEvent => {
                return <DayEvent key={dayEvent.id} eventData={dayEvent} />
            });
            return (
                <div onClick={this.createEvent} className="day">
                    <div className="number">{this.props.dayInfo.date}</div>
                    <div className="day-events">
                        {events}
                    </div>
                </div>
            );
        }
    });
}

export default Day;

