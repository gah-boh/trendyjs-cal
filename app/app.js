import React from 'react';

import Month from './components/month'
import {buildMonth} from './helpers/date-builder';

var monthData = buildMonth(5);

React.render(<Month month={monthData}/>, document.querySelector('.app'));

