import React from 'react';
import moment from 'moment';

import Week from './week';
import WeekDayNamesHeader from './weekday-names-header';
import DateBuilder from '../helpers/date-builder';
import CalendarEventsStore from '../stores/calendar-events-store';

WeekView.inject = [Week, WeekDayNamesHeader, DateBuilder, CalendarEventsStore];
function WeekView (Week, WeekDayNamesHeader, DateBuilder, CalendarEventsStore){
    return React.createClass({
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
            return DateBuilder.buildWeek(year, week - 1);
        },
        render() {
            var weekData = this.getWeekData();
            var {month, year} = getDateTitles(weekData[0]);
            return (
                <div className="week-view">
                    <h3>{month} {year}</h3>
                    <WeekDayNamesHeader />
                    <div className="week-wrapper">
                        <Week week={weekData} calendarEvents={this.state.calendarEvents} />
                    </div>
                </div>
            );
        }
    });

    function getDateTitles(dayInfo) {
        var date = moment(`${dayInfo.month}`, 'M');
        return {
            month: moment.localeData().months(date),
            year: date.year()
        };
    }
}

export default WeekView;

