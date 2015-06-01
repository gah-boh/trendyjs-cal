import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import _ from 'lodash';

import Day from './day';

const {PureRenderMixin} = React.addons;

Week.inject = [Day];
function Week (Day) {
    return React.createClass({
        propTypes: {
            week: ImmutablePropTypes.list.isRequired,
            calendarEvents: ImmutablePropTypes.list.isRequired
        },
        mixins: [PureRenderMixin],
        render() {
            const days = this.props.week.map((day, index) => {
                const dayEvents = this.props.calendarEvents.filter(event => {
                    return isDayOnEvent(day, event);
                });
                return (<Day key={index} dayInfo={day} dayEvents={dayEvents} />);
            });
            return (
                <div className="week">{days}</div>
            );
        }
    });

    function isDayOnEvent(day, event) {
        const dayTime = getTime(day);
        const eventTime = getTime(event);
        return _.isEqual(dayTime, eventTime);
        function getTime(dateContainer) {
            return _.pick(dateContainer, ['year', 'month', 'date']);
        }
    }
}

export default Week;

