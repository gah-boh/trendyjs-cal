import request from 'superagent';
import Rx from 'rx';
import {inject} from 'aurelia-dependency-injection';
import Immutable from 'immutable';

import EventActions from '../actions/event-actions';
import EventRecord from '../models/event-record';

@inject(EventActions, request, EventRecord)
class CalendarEventsStore{
    constructor(EventActions, request, EventRecord) {
        var serverEventsStream = Rx.Observable.fromPromise(this.getEventsFromServer())
        .map(events => {
            return Immutable.List(events.map(event => new EventRecord(event)));
        });
        var editEventStream = EventActions.editEventAction.map(saveEvent);
        var removeEventStream = EventActions.removeEventAction.map(removeEvent);

        this.calendarEvents = serverEventsStream
            .merge(editEventStream)
            .merge(removeEventStream)
            .scan((model, action)=> action(model));
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

function saveEvent(eventInfo) {
    return (eventsByDate) => {
        return filterEvents(eventInfo, eventsByDate)
                .push(eventInfo);
    };
}

function removeEvent(eventInfo) {
    return (eventsByDate) => filterEvents(eventInfo, eventsByDate);
}

function filterEvents(eventInfo, eventsByDate) {
    return eventsByDate.filter(event => {
        return event.id !== eventInfo.id;
    });
}

export default CalendarEventsStore;

