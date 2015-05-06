import React from 'react';
import moment from 'moment';

import Week from './components/week';
import {buildWeek} from './helpers/date-builder';

var weekMoment = moment();
var weekData = buildWeek(weekMoment.date(), weekMoment.month()+1, weekMoment.year());

React.render(<Week week={weekData} monthName={moment.localeData().months(weekMoment)}/>, document.querySelector('.app'));

