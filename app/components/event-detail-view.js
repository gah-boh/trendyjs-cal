import React from 'react';

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
        return (
            <div className="event-detail-view">
                <div onClick={this.handleClose}>X</div>
                <h3>{eventDetail.title}</h3>
            </div>
        );
    }
});

export default EventDetailView;

