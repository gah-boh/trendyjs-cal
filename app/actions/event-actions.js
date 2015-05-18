import Rx from 'rx';

var currentEventAction = new Rx.BehaviorSubject(null);
var createEventAction = new Rx.Subject();
var editEventAction = new Rx.BehaviorSubject(null);

export default {currentEventAction, createEventAction, editEventAction};

