import React from 'react';

var Day = React.createClass({
    propTypes: {
        dayNumber: React.PropTypes.number.isRequired
    },
    render() {
        return (
            <div className="day">
                <div className="number">{this.props.dayNumber}</div>
            </div>
        );
    }
});


export default Day;

