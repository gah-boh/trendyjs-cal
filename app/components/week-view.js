import React from 'react';
import moment from 'moment';

import Week from './week';
import {buildWeek} from '../helpers/date-builder';
import CalendarEventsStore from '../stores/calendar-events-store';

var WeekView = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    getInitialState() {
        return {
            calendarEvents: []
        };
    },
    componentWillMount() {
        CalendarEventsStore.calendarEvents.subscribe(calendarEvents => {
            this.setState({calendarEvents});
        });
    },
    getWeekData() {
        var {router} = this.context;
        var {year, week} = router.getCurrentParams();
        return buildWeek(year, week - 1);
    },
    render() {
        var weekData = this.getWeekData();
        return (
            <div className="week-view">
                <Week week={weekData} calendarEvents={this.state.calendarEvents} />
            </div>
        );
    }
});

export default WeekView;

