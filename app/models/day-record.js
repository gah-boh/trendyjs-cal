import Immutable from 'immutable';

var daySchema = {
    date: 0,
    month: 0,
    year: 0
};

function DayRecordFactory() {
    return class DayRecord extends Immutable.Record(daySchema) {}
}

export default DayRecordFactory;

