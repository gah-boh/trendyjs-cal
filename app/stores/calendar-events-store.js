import request from 'superagent';
import Rx from 'rx';
import {inject} from 'aurelia-dependency-injection';

import EventActions from '../actions/event-actions';

@inject(EventActions)
class CalendarEventsStore{
    constructor(EventActions) {
        this.calendarEvents = new Rx.BehaviorSubject([]);

        var serverEventsStream = Rx.Observable.fromPromise(this.getEventsFromServer());
        var editEventStream = EventActions.editEventAction.withLatestFrom(this.calendarEvents, saveEvent);

        serverEventsStream
            .merge(editEventStream)
            .subscribe(events => {
                this.calendarEvents.onNext(events)
            });
    }
    getEventsFromServer() {
        return new Promise((resolve) => {
            request.get('/events')
            .end((err, res) => {
                resolve(res.body);
            });
        });
    }
}

function saveEvent(eventInfo, eventsByDate) {
    if(!eventInfo) return eventsByDate;
    return eventsByDate.filter(event => {
        return event.id !== eventInfo.id;
    }).concat([eventInfo]);
}

export default CalendarEventsStore;

