import request from 'superagent';
import Rx from 'rx';

var serverCalendarEvents = new Promise((resolve) => {
    request.get('/events')
    .end((err, res) => {
        resolve(res.body);
    });
});
var responseStream = Rx.Observable.fromPromise(serverCalendarEvents).flatMap(calEvent => calEvent);

var eventsByDate = responseStream.scan({}, (eventModel, currentEvent) => {
    eventModel[currentEvent.year] = eventModel[currentEvent.year] || {};
    eventModel[currentEvent.year][currentEvent.month] = eventModel[currentEvent.year][currentEvent.month] || {};
    eventModel[currentEvent.year][currentEvent.month][currentEvent.day] = eventModel[currentEvent.year][currentEvent.month][currentEvent.day] || [];
    eventModel[currentEvent.year][currentEvent.month][currentEvent.day].push(currentEvent);
    return eventModel;
});

export default {eventsByDate}

