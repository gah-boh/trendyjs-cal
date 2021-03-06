import React from 'react';
import {RouteHandler} from 'react-router';

import EventDetailView from './event-detail-view';

AppView.inject = [EventDetailView];
function AppView(EventDetailView) {
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

export default AppView;

