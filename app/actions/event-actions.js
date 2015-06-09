import Rx from 'rx';

class EventActions {
    constructor() {
        this.selectedtEventAction = new Rx.BehaviorSubject(null);
        this.createEventAction = new Rx.Subject();
        this.editEventAction = new Rx.Subject();
        this.removeEventAction = new Rx.Subject();
    }
}

export default EventActions;

