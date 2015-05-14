import React from 'react';
import moment from 'moment';
import _ from 'lodash';

import eventsDetailStore from '../stores/events-detail-store';
import {currentEventAction} from '../actions/event-actions';

var localeData = moment.localeData();
var monthOptions = _.range(1, 13).map(monthNum => {
    return <option value={monthNum} key={monthNum}>{localeData.months(moment(monthNum, 'M'))}</option>;
});
var yearOptions = _.range(2010, 2021).map(yearNum => {
    return <option value={yearNum} key={yearNum}>{yearNum}</option>;
});
var hourOptions = _.range(1, 13).map(hourNum => {
    return <option value={hourNum} key={hourNum}>{hourNum}</option>
});

function getDaysForMonth(monthNum, year) {
    var amountOfDays = moment(`${monthNum}-${year}`, 'M-yyyy').daysInMonth();
    return _.range(1, amountOfDays + 1).map(date => {
        return <option value={date} key={date}>{date}</option>
    });
}

function convertHours(military) {
    return moment(military, 'H').format('h');
}

function convertDayHalf(military) {
    return military > 11 ? 'pm' : 'am';
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
        var year = React.findDOMNode(this.refs.year).value;
        var month = React.findDOMNode(this.refs.month).value;
        var date = React.findDOMNode(this.refs.date).value;
        var dateOptions = getDaysForMonth(month, year);

        date = date > dateOptions.length ? dateOptions.length : date;
        var eventDetail = Object.assign({}, this.state.eventDetail, {month, date, year});
        this.setState({eventDetail, dateOptions});
    },
    handleTimeChange() {
        var startValue = React.findDOMNode(this.refs.start).value;
        var startModifier = React.findDOMNode(this.refs.startModifier).value;
        var start = getTime(startValue, startModifier);
        var endValue = React.findDOMNode(this.refs.end).value;
        var endModifier = React.findDOMNode(this.refs.endModifier).value;
        var end = getTime(endValue, endModifier);
        var eventDetail = Object.assign({}, this.state.eventDetail, {start, end});
        this.setState({eventDetail});
        function getTime(time, modifier) {
            return moment(`${time}-${modifier}`, 'h-a').hours();
        }
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
                    <select value={convertHours(eventDetail.start)} ref="start" onChange={this.handleTimeChange}>
                        {hourOptions}
                    </select>
                    <select value={convertDayHalf(eventDetail.start)} ref="startModifier" onChange={this.handleTimeChange}>
                        <option value="am">am</option>
                        <option value="pm">pm</option>
                    </select>
                    <span> - </span>
                    <select value={convertHours(eventDetail.end)} ref="end" onChange={this.handleTimeChange}>
                        {hourOptions}
                    </select>
                    <select value={convertDayHalf(eventDetail.end)} ref="endModifier" onChange={this.handleTimeChange}>
                        <option value="am">am</option>
                        <option value="pm">pm</option>
                    </select>
                </div>
            </div>
        );
    }
});

export default EventDetailView;

