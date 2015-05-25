import * as babelPolyfill from 'babel/polyfill';
import React from 'react';
import moment from 'moment';
import Router from 'react-router';

import AppView from './components/app-view';
import MonthView from './components/month-view';

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var routes = (
    <Route name="app" path="/" handler={AppView}>
        <DefaultRoute name="month" handler={MonthView} />
    </Route>
);

Router.run(routes, Handler => {
    React.render(<Handler />, document.querySelector('.app'));
});

