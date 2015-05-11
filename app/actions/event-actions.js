import Rx from 'rx';

var currentEventAction = new Rx.BehaviorSubject(null);
var createEventAction = new Rx.Subject();

export default {currentEventAction, createEventAction};

