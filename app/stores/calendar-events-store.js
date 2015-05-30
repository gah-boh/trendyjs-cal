import request from 'superagent';
import Rx from 'rx';
import {inject} from 'aurelia-dependency-injection';

import EventActions from '../actions/event-actions';

@inject(EventActions)
class CalendarEventsStore{
    constructor(EventActions) {
        var serverEventsStream = Rx.Observable.fromPromise(this.getEventsFromServer());
        var editEventStream = EventActions.editEventAction.map(saveEvent);

        this.calendarEvents = serverEventsStream
            .merge(editEventStream)
            .scan((model, action)=> {
                return action(model)
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

function saveEvent(eventInfo) {
    return (eventsByDate) => {
        return eventsByDate.filter(event => {
            return event.id !== eventInfo.id;
        }).concat([eventInfo]);
    };
}

export default CalendarEventsStore;

