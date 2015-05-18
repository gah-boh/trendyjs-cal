import request from 'superagent';
import Rx from 'rx';

import {editEventAction} from '../actions/event-actions';

var serverCalendarEvents = new Promise((resolve) => {
    request.get('/events')
    .end((err, res) => {
        resolve(res.body);
    });
});
var responseStream = Rx.Observable.fromPromise(serverCalendarEvents).flatMap(calEvent => calEvent);

var eventDateModelStream = responseStream.scan({}, addEventToModel).publish().refCount();

var eventsByDate = editEventAction.combineLatest(eventDateModelStream, saveEvent);

function addEventToModel(model, event) {
    model[event.year] = model[event.year] || {};
    model[event.year][event.month] = model[event.year][event.month] || {};
    model[event.year][event.month][event.date] = model[event.year][event.month][event.date] || [];
    model[event.year][event.month][event.date].push(event);
    return model;
}

function removeEventFromModel(model, currentEvent) {
    if(!isEventDateInModel(model, currentEvent)) return model;
    model[currentEvent.year][currentEvent.month][currentEvent.date] = model[currentEvent.year][currentEvent.month][currentEvent.date].filter(event => {
        return currentEvent.id !== event.id;
    });
    return model;
}

function isEventDateInModel(model, event) {
    return model[event.year] && model[event.year][event.month] && model[event.year][event.month][event.date];
}

function saveEvent(eventInfo, eventsByDate) {
    // TODO: Clean up all the if statements, streams also are a mess.
    if(!eventInfo) return eventsByDate;
    removeEventFromModel(eventsByDate, eventInfo.original);
    addEventToModel(eventsByDate, eventInfo.updated);
    return eventsByDate;
}

export default {eventsByDate}

