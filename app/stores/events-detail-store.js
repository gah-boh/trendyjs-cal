import Rx from 'rx';
import shortid from 'shortid';
import assign from 'lodash/object/assign';
import moment from 'moment';
import {inject} from 'aurelia-dependency-injection';

import EventActions from '../actions/event-actions';

@inject(EventActions)
class EventsDetailStore {
    constructor(EventActions) {
        var createEvent = EventActions.createEventAction.map(dayInfo => {
            var start = moment().hour();
            return assign({
                id: shortid.generate(),
                title: "New Event",
                start,
                end: start + 1
            }, dayInfo);
        });
        var removeEvent = EventActions.removeEventAction.map(()=> null);
        this.currentEvent = EventActions.currentEventAction
                                        .merge(createEvent)
                                        .merge(removeEvent);
    }
}

export default EventsDetailStore;

