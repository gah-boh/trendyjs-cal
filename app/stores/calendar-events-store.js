import request from 'superagent';
import Rx from 'rx';

import {editEventAction} from '../actions/event-actions';

var serverCalendarEvents = new Promise((resolve) => {
    request.get('/events')
    .end((err, res) => {
        resolve(res.body);
    });
});
var serverEventsStream = Rx.Observable.fromPromise(serverCalendarEvents);
var calendarEvents = editEventAction.combineLatest(serverEventsStream, saveEvent);

function saveEvent(eventInfo, eventsByDate) {
    if(!eventInfo) return eventsByDate;
    return eventsByDate.filter(event => {
        return event.id !== eventInfo.id;
    }).concat([eventInfo]);
}

export default {calendarEvents};

