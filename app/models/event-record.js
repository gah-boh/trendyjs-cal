import Immutable from 'immutable';
import moment from 'moment';

var today = moment();

var eventDefaults = {
    id: 0,
    title: 'New Event',
    year: today.year(),
    month: today.month() + 1,
    date: today.date(),
    start: 9,
    end: 10
};

function EventRecordFactory() {
    return class EventRecord extends Immutable.Record(eventDefaults) {};
}

export default EventRecordFactory;

