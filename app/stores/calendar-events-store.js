import request from 'superagent';
import Rx from 'rx';
import {inject} from 'aurelia-dependency-injection';

import EventActions from '../actions/event-actions';

@inject(EventActions)
class CalendarEventsStore{
    constructor(EventActions) {
        var serverCalendarEvents = new Promise((resolve) => {
            request.get('/events')
            .end((err, res) => {
                resolve(res.body);
            });
        });
        var serverEventsStream = Rx.Observable.fromPromise(serverCalendarEvents);
        this.calendarEvents = EventActions.editEventAction.combineLatest(serverEventsStream, saveEvent);
    }
}

function saveEvent(eventInfo, eventsByDate) {
    if(!eventInfo) return eventsByDate;
    return eventsByDate.filter(event => {
        return event.id !== eventInfo.id;
    }).concat([eventInfo]);
}

export default CalendarEventsStore;

