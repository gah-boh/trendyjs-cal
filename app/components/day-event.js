import React from 'react';

import EventActions from '../actions/event-actions';
import EventRecord from '../models/event-record';

const {PureRenderMixin} = React.addons;

DayEvent.inject = [EventActions, EventRecord];
function DayEvent(EventActions, EventRecord){
    return React.createClass({
        propTypes: {
            eventData: React.PropTypes.instanceOf(EventRecord).isRequired
        },
        mixins: [PureRenderMixin],
        handleClick(event) {
            event.stopPropagation();
            EventActions.selectedtEventAction.onNext(this.props.eventData);
        },
        render() {
            const dayEvent = this.props.eventData;
            return (
                <div onClick={this.handleClick} className="day-event">{dayEvent.title}</div>
            );
        }
    });
}

export default DayEvent;

