import React from 'react';
import moment from 'moment';
import Router from 'react-router';

import Month from './month';
import DateBuilder from '../helpers/date-builder';

MonthView.inject = [Month, DateBuilder];
function MonthView(Month, DateBuilder){
    return React.createClass({
        mixins: [Router.State],
        getMonthData() {
            var {month, year} = this.getQuery();
            if(!month || !year) {
                const date = moment();
                month = date.month() + 1;
                year = date.year();
            }
            return DateBuilder.buildMonth(month, year);
        },
        render() {
            const monthData = this.getMonthData();
            // TODO: Add buttons/links to go to next or previous month
            return (
                <div className="month-view">
                    <Month month={monthData} />
                </div>
            );
        }
    });
}

export default MonthView;

