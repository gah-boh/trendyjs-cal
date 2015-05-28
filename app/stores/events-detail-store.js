import Rx from 'rx';
import shortid from 'shortid';
import assign from 'lodash/object/assign';
import moment from 'moment';

import {currentEventAction, createEventAction} from '../actions/event-actions';

var createEvent = createEventAction.map(dayInfo => {
    var start = moment().hour();
    return assign({
        id: shortid.generate(),
        title: "New Event",
        start,
        end: start + 1
    }, dayInfo);
});
var currentEvent = currentEventAction.merge(createEvent);

export default {currentEvent};

