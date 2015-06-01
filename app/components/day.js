import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import EventActions from '../actions/event-actions';
import DayEvent from './day-event';

const {PureRenderMixin} = React.addons;

Day.inject = [EventActions, DayEvent];
function Day(EventActions, DayEvent) {
    return React.createClass({
        propTypes: {
            dayInfo: React.PropTypes.object.isRequired,
            dayEvents: ImmutablePropTypes.list.isRequired
        },
        mixins: [PureRenderMixin],
        createEvent() {
            EventActions.createEventAction.onNext(this.props.dayInfo);
        },
        render() {
            const events = this.props.dayEvents.map(dayEvent => {
                return <DayEvent key={dayEvent.id} eventData={dayEvent} />;
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

