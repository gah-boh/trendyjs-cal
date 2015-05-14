import React from 'react';
import moment from 'moment';

var hourOptions = _.range(1, 13).map(hourNum => {
    return <option value={hourNum} key={hourNum}>{hourNum}</option>
});

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
                <select value={hourDisplay} onChange={this.onHourChange} ref="hour">{hourOptions}</select>
                <select value={dayHalf} onChange={this.onHourChange} ref="half">
                    <option value="am">am</option>
                    <option value="pm">pm</option>
                </select>
            </span>
        );
    }
});

export default TimeSelect;

