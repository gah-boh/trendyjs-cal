import React from 'react';
import moment from 'moment';

import Month from './month';
import DateBuilder from '../helpers/date-builder';

MonthView.inject = [Month, DateBuilder];
function MonthView(Month, DateBuilder){
    return React.createClass({
        contextTypes: {
            router: React.PropTypes.func
        },
        getMonthData() {
            var {router} = this.context;
            var {month, year} = router.getCurrentQuery();
            if(!month || !year) {
                let date = moment();
                month = date.month()+1
                year = date.year();
            }
            return DateBuilder.buildMonth(month, year);
        },
        render() {
            var monthData = this.getMonthData();
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

