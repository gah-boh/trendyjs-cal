import React from 'react';
import {RouteHandler} from 'react-router';

import EventDetailView from './event-detail-view';

var AppView = React.createClass({
    render() {
        return (
            <div>
                <RouteHandler />
                <EventDetailView />
            </div>
        );
    }
});

export default AppView;

