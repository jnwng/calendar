import React, {Component} from 'react';
import moment from 'moment';

import Square from './Square';

var Day = React.createClass({

  propTypes: {
    date: React.PropTypes.instanceOf(moment).isRequired,
    isCurrentMonth: React.PropTypes.bool,
    dateRanges: React.PropTypes.array
  },

  getDefaultProps() {
    return {
      isCurrentMonth: true
    };
  },

  render() {
    return (
      <Square backgroundColor={this.props.isCurrentMonth ? 'red' : 'grey'}>
        {this.props.date.format('D')}
      </Square>
    );
  }
});

export default Day;
