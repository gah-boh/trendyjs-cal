import React from 'react';
import moment from 'moment';

import EventDetailView from './event-detail-view';
import Month from './month';
import {buildMonth} from '../helpers/date-builder';

var date = moment();
var monthData = buildMonth(date.month()+1, date.year());

var MonthView = React.createClass({
    render() {
        return (
            <div>
                <Month month={monthData} />
                <EventDetailView />
            </div>
        );
    }
});

export default MonthView;

