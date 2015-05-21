import React from 'react';
import moment from 'moment';
import _ from 'lodash';

import eventsDetailStore from '../stores/events-detail-store';
import {currentEventAction, editEventAction} from '../actions/event-actions';
import TimeRange from './time/time-range';

var localeData = moment.localeData();
var monthOptions = _.range(1, 13).map(monthNum => {
    return <option value={monthNum} key={monthNum}>{localeData.months(moment(monthNum, 'M'))}</option>;
});
var yearOptions = _.range(2010, 2021).map(yearNum => {
    return <option value={yearNum} key={yearNum}>{yearNum}</option>;
});

function getDaysForMonth(monthNum, year) {
    var amountOfDays = moment(`${monthNum}-${year}`, 'M-yyyy').daysInMonth();
    return _.range(1, amountOfDays + 1).map(date => {
        return <option value={date} key={date}>{date}</option>
    });
}

var EventDetailView = React.createClass({
    getInitialState() {
        return {
            eventDetail: null,
            dateOptions: null
        }
    },
    componentDidMount() {
        eventsDetailStore.currentEvent.subscribe(eventDetail => {
            var dateOptions = eventDetail ? getDaysForMonth(eventDetail.month) : null;
            this.setState({eventDetail, dateOptions});
        });
    },
    handleClose() {
        currentEventAction.onNext(null);
    },
    updateTitle(event) {
        var eventDetail = Object.assign({}, this.state.eventDetail, {title: event.target.value});
        this.setState({eventDetail});
    },
    handleDateChange() {
        var year = parseInt(React.findDOMNode(this.refs.year).value);
        var month = parseInt(React.findDOMNode(this.refs.month).value);
        var date = parseInt(React.findDOMNode(this.refs.date).value);
        var dateOptions = getDaysForMonth(month, year);

        date = date > dateOptions.length ? dateOptions.length : date;
        var eventDetail = Object.assign({}, this.state.eventDetail, {month, date, year});
        this.setState({eventDetail, dateOptions});
    },
    handleTimeChange(start, end) {
        var eventDetail = Object.assign({}, this.state.eventDetail, {start, end});
        this.setState({eventDetail});
    },
    onSave() {
        editEventAction.onNext(this.state.eventDetail);
    },
    onReset() {
        console.log('resetting');
    },
    render() {
        if(!this.state.eventDetail) return null;
        var eventDetail = this.state.eventDetail;
        return (
            <div className="event-detail-view">
                <div onClick={this.handleClose}>X</div>
                <input type="text" className="event-title" value={eventDetail.title} onChange={this.updateTitle} />
                <div>
                    <b>Event Date: </b>
                    <select value={eventDetail.month} ref="month" onChange={this.handleDateChange}>
                        {monthOptions}
                    </select>
                    <select value={eventDetail.date} ref="date" onChange={this.handleDateChange}>
                        {this.state.dateOptions}
                    </select>
                    <select value={eventDetail.year} ref="year" onChange={this.handleDateChange}>
                        {yearOptions}
                    </select>
                </div>
                <div>
                    <b>Event Time: </b>
                    <TimeRange start={eventDetail.start} end={eventDetail.end} onTimeChange={this.handleTimeChange} />
                </div>
                <div>
                    <button onClick={this.onSave}>Save</button>
                    <button onClick={this.onReset}>Reset</button>
                </div>
            </div>
        );
    }
});

export default EventDetailView;

