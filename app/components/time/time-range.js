import React from 'react';

import TimeSelect from './time-select';
const {PureRenderMixin} = React.addons;

TimeRange.inject = [TimeSelect];
function TimeRange(TimeSelect){
    return React.createClass({
        propTypes: {
            start: React.PropTypes.number.isRequired,
            end: React.PropTypes.number.isRequired,
            onTimeChange: React.PropTypes.func.isRequired
        },
        mixins: [PureRenderMixin],
        validateTimes(start, end) {
            end = start >= end ? start + 1 : end;
            this.props.onTimeChange(start, end);
        },
        handleStartChange(start) {
            this.validateTimes(start, this.props.end);
        },
        handleEndChange(end) {
            this.validateTimes(this.props.start, end);
        },
        render() {
            return (
                <span>
                    <TimeSelect hour={this.props.start} timeChanged={this.handleStartChange} />
                    <span> - </span>
                    <TimeSelect hour={this.props.end} timeChanged={this.handleEndChange} />
                </span>
            );
        }
    });
}

export default TimeRange;

