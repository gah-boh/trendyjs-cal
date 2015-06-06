import * as babelPolyfill from 'babel/polyfill'; // eslint-disable-line
import React from 'react';
import Router from 'react-router';
import {Container} from 'di';

import diRegister from './helpers/di-register';

import AppView from './components/app-view';
import MonthView from './components/month-view';
import WeekView from './components/week-view';

var {Route, DefaultRoute} = Router;

var container = new Container();
diRegister(container);

var routes = (
    <Route name="app" path="/" handler={container.get(AppView)}>
        <DefaultRoute name="month" handler={container.get(MonthView)} />
        <Route name="week" path="/week/:year/:week" handler={container.get(WeekView)} />
    </Route>
);

Router.run(routes, Handler => {
    React.render(<Handler />, document.querySelector('.app'));
});

