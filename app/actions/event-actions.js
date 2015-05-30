import Rx from 'rx';

class EventActions {
    constructor() {
        this.currentEventAction = new Rx.BehaviorSubject(null);
        this.createEventAction = new Rx.Subject();
        this.editEventAction = new Rx.Subject();
    }
}

export default EventActions;

