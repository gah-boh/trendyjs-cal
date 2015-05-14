import React from 'react';
import _ from 'lodash';
import moment from 'moment';

function hourOptions(hour) {
    var commonRange = _.range(1, 12);
    var twelfHour = [12];
    var composedHours = hour > 11 ? twelfHour.concat(commonRange) : commonRange.concat(twelfHour);
    return composedHours.map(hourNum => {
        return <option value={hourNum} key={hourNum}>{hourNum}</option>
    });
}

var TimeSelect = React.createClass({
    propTypes: {
        hour: React.PropTypes.number.isRequired,
        timeChanged: React.PropTypes.func.isRequired
    },
    onHourChange() {
        var hour = React.findDOMNode(this.refs.hour).value;
        var half = React.findDOMNode(this.refs.half).value;
        var calculatedHour = moment(`${hour} ${half}`, 'H a').hour();
        this.props.timeChanged(calculatedHour);
    },
    render() {
        var momentTime = moment(this.props.hour, 'H');
        var hourDisplay = momentTime.format('h');
        var dayHalf = momentTime.format('a');
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

export default TimeSelect;

