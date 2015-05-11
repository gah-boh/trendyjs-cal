import React from 'react';
import moment from 'moment';

import eventsDetailStore from '../stores/events-detail-store';
import {currentEventAction} from '../actions/event-actions';

var EventDetailView = React.createClass({
    getInitialState() {
        return {
            eventDetail: null
        }
    },
    componentDidMount() {
        eventsDetailStore.currentEvent.subscribe(eventDetail => {
            this.setState({eventDetail})
        });
    },
    handleClose() {
        currentEventAction.onNext(null);
    },
    render() {
        if(!this.state.eventDetail) return null;
        var eventDetail = this.state.eventDetail;
        var eventStart = moment().hour(eventDetail.start).format('h a');
        var eventEnd = moment().hour(eventDetail.end).format('h a');
        return (
            <div className="event-detail-view">
                <div onClick={this.handleClose}>X</div>
                <h3>{eventDetail.title}</h3>
                <div>
                    <b>Event Date: </b>
                    {eventDetail.month} / {eventDetail.date} / {eventDetail.year}
                </div>
                <div>
                    <b>Event Time: </b>
                    {eventStart} - {eventEnd}
                </div>
            </div>
        );
    }
});

export default EventDetailView;

