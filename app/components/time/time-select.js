import React from 'react';
import _ from 'lodash';
import moment from 'moment';

function hourOptions(hour) {
    const commonRange = _.range(1, 12);
    const twelfHour = [12];
    const composedHours = hour > 11 ? twelfHour.concat(commonRange) : commonRange.concat(twelfHour);
    return composedHours.map(hourNum => {
        return <option value={hourNum} key={hourNum}>{hourNum}</option>
    });
}

function TimeSelect(){
    return React.createClass({
        propTypes: {
            hour: React.PropTypes.number.isRequired,
            timeChanged: React.PropTypes.func.isRequired
        },
        onHourChange() {
            const hour = React.findDOMNode(this.refs.hour).value;
            const half = React.findDOMNode(this.refs.half).value;
            const calculatedHour = moment(`${hour} ${half}`, 'H a').hour();
            this.props.timeChanged(calculatedHour);
        },
        render() {
            const momentTime = moment(this.props.hour, 'H');
            const hourDisplay = momentTime.format('h');
            const dayHalf = momentTime.format('a');
            return (
                <span>
                    <select value={hourDisplay} onChange={this.onHourChange} ref="hour">{hourOptions(this.props.hour)}</select>
                    <select value={dayHalf} onChange={this.onHourChange} ref="half">
                        <option value="am">am</option>
                        <option value="pm">pm</option>
                    </select>
                </span>
            );
        }
    });
}

export default TimeSelect;

