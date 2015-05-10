import React from 'react';
import moment from 'moment';

import Month from './components/month';
import {buildMonth} from './helpers/date-builder';

var date = moment();
var monthData = buildMonth(date.month()+1, date.year());

React.render(<Month month={monthData} />, document.querySelector('.app'));

