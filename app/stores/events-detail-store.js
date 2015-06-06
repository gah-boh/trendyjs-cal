import Rx from 'rx';
import shortid from 'shortid';
import assign from 'lodash/object/assign';
import moment from 'moment';
import {inject} from 'di';

import EventRecord from '../models/event-record';
import EventActions from '../actions/event-actions';

@inject(EventActions, EventRecord)
class EventsDetailStore {
    constructor(EventActions, EventRecord) {
        var createEvent = EventActions.createEventAction.map(dayInfo => {
            var start = moment().hour();
            return new EventRecord({
                id: shortid.generate(),
                title: "New Event",
                start,
                end: start + 1
            }).merge(dayInfo);
        });
        var removeEvent = EventActions.removeEventAction.map(() => null);
        this.currentEvent = EventActions.currentEventAction
                                        .merge(createEvent)
                                        .merge(removeEvent);
    }
}

export default EventsDetailStore;

