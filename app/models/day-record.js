import Immutable from 'immutable';

var dayDefaults = {
    date: 0,
    month: 0,
    year: 0
};

function DayRecordFactory() {
    return class DayRecord extends Immutable.Record(dayDefaults) {};
}

export default DayRecordFactory;

