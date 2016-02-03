import request from 'superagent';
import Rx from 'rx';
import {inject} from 'di';
import Immutable from 'immutable';

import EventActions from '../actions/event-actions';
import EventRecord from '../models/event-record';

@inject(EventActions, request, EventRecord)
class CalendarEventsStore{

    calendarEvents = new Rx.BehaviorSubject(Immutable.List());

    constructor(EventActions, request, EventRecord) {
        this.request = request;
        // Get events from server and return a stream of all the events
        // as an immutable list of event records
        var serverEventsStream = Rx.Observable.fromPromise(this.getEventsFromServer())
        .map(events => {
            return Immutable.List(events.map(event => new EventRecord(event)));
        });

        var editEventStream = EventActions.editEventAction.map(saveEvent);
        var removeEventStream = EventActions.removeEventAction.map(removeEvent);
        // Merge edit event action (which also works for saving new event) with 
        // the server events stream and remove event stream.
        serverEventsStream
            .merge(editEventStream)
            .merge(removeEventStream)
            // This is where things get tricky. Scan is like Array.reduce
            // All the streams/observables coming in will have
            // a function that takes the master events list
            // and by using closures it will have retained reference to the
            // event that is to be acted upon. It will pass in the master list
            // and let the function do the operation.
            .scan((model, action)=> action(model))
            .subscribe(events => {
                this.calendarEvents.onNext(events)
            });
    }
    getEventsFromServer() {
        return new Promise((resolve) => {
            this.request.get('/events')
            .end((err, res) => {
                resolve(res.body);
            });
        });
    }
}

// Filter out the given event from the master
// list of events and push the new or edited event to
// the list.
// Returns function that will take the master events list.
function saveEvent(eventInfo) {
    return (eventsByDate) => {
        return filterEvents(eventInfo, eventsByDate)
                .push(eventInfo);
    };
}

// Simple filter out the given event out of the master events list.
// Returns function that will take the master events list.
function removeEvent(eventInfo) {
    return (eventsByDate) => filterEvents(eventInfo, eventsByDate);
}

// Get new list of events that does not include the given event.
function filterEvents(eventInfo, eventsByDate) {
    return eventsByDate.filter(event => {
        return event.id !== eventInfo.id;
    });
}

export default CalendarEventsStore;

