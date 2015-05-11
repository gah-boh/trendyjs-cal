import * as babelPolyfill from 'babel/polyfill';
import React from 'react';
import moment from 'moment';

import MonthView from './components/month-view';

React.render(<MonthView />, document.querySelector('.app'));

