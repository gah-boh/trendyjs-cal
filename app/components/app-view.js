import React from 'react';
import {RouteHandler} from 'react-router';

import EventDetailView from './event-detail-view';

var AppView = function(EventDetailView) {
    return React.createClass({
        render() {
            return (
                <div>
                    <RouteHandler />
                    <EventDetailView />
                </div>
            );
        }
    });
}
AppView.inject = [EventDetailView]

export default AppView;

