import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import Immutable from 'immutable';

import EventsDetailStore from '../stores/events-detail-store';
import EventActions from '../actions/event-actions';
import TimeRange from './time/time-range';

const {PureRenderMixin} = React.addons;

EventDetailView.inject = [EventsDetailStore, EventActions, TimeRange];
function EventDetailView(EventsDetailStore, EventActions, TimeRange) {

    const localeData = moment.localeData();
    const monthOptions = _.range(1, 13).map(monthNum => {
        return <option value={monthNum} key={monthNum}>{localeData.months(moment(monthNum, 'M'))}</option>;
    });
    const yearOptions = _.range(2010, 2021).map(yearNum => {
        return <option value={yearNum} key={yearNum}>{yearNum}</option>;
    });

    function getDaysForMonth(monthNum, year) {
        const amountOfDays = moment(`${monthNum}-${year}`, 'M-yyyy').daysInMonth();
        const days = _.range(1, amountOfDays + 1).map(date => {
            return <option value={date} key={date}>{date}</option>;
        });
        return Immutable.List(days);
    }
    return React.createClass({
        getInitialState() {
            return {
                eventDetail: null,
                dateOptions: null
            };
        },
        componentDidMount() {
            EventsDetailStore.currentEvent.subscribe(eventDetail => {
                const dateOptions = eventDetail ? getDaysForMonth(eventDetail.month) : null;
                this.setState({eventDetail, dateOptions});
            });
        },
        mixins: [PureRenderMixin],
        handleClose() {
            EventActions.selectedtEventAction.onNext(null);
        },
        updateTitle(event) {
            const eventDetail = this.state.eventDetail.set('title', event.target.value);
            this.setState({eventDetail});
        },
        handleDateChange() {
            const year = parseInt(React.findDOMNode(this.refs.year).value);
            const month = parseInt(React.findDOMNode(this.refs.month).value);
            const rawDate = parseInt(React.findDOMNode(this.refs.date).value);
            const dateOptions = getDaysForMonth(month, year);

            const date = rawDate > dateOptions.size ? dateOptions.size : rawDate;
            const eventDetail = this.state.eventDetail.merge({month, date, year});
            this.setState({eventDetail, dateOptions});
        },
        handleTimeChange(start, end) {
            const eventDetail = this.state.eventDetail.merge({start, end});
            this.setState({eventDetail});
        },
        onSave() {
            EventActions.editEventAction.onNext(this.state.eventDetail);
        },
        onRemove() {
            EventActions.removeEventAction.onNext(this.state.eventDetail);
        },
        render() {
            if(!this.state.eventDetail) return null;
            const eventDetail = this.state.eventDetail;
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
                        <button onClick={this.onRemove}>Remove</button>
                    </div>
                </div>
            );
        }
    });
}

export default EventDetailView;

