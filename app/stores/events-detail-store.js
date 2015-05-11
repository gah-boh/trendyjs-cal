import Rx from 'rx';

import {currentEventAction} from '../actions/event-actions';

var currentEvent = currentEventAction.map(current => {
    if(!current) return null;
    return current;
});

export default {currentEvent};

