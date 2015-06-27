
import React, {Component} from 'react';
import moment from 'moment';
import _ from 'lodash';

import Square from './Square';
import Day from './Day';

export default class Calendar extends Component {

  static propTypes = {
    month: React.PropTypes.number,
    dateRanges: React.PropTypes.array
  }

  renderDay(date) {
    const dateRangesForDay = this.props.dateRanges.filter(({start, end}) => {
      return date.isBetween(start, end);
    });
    return <Day date={date} isCurrentMonth={false} dateRanges={dateRangesForDay} />;
  }

  render() {
    var month = moment().month(this.props.month);
    var daysInMonth = month.daysInMonth();
    var firstDayOfMonth = month.clone().startOf('month');
    var lastDayOfMonth = month.clone().endOf('month');

    var lastMonthOffset = firstDayOfMonth.day();
    var nextMonthOffset = lastDayOfMonth.day() + 1;

    var totalDays = lastMonthOffset + daysInMonth + nextMonthOffset;

    var numberOfWeeks = Math.ceil(totalDays / 7);

    var {goToNextMonth, goToLastMonth} = this.props;

    return (
      <div>
        <button onClick={goToNextMonth}>Go to Next Month</button>
        <button onClick={goToLastMonth}>Go to Last Month</button>
        <div style={{display: 'flex', flexFlow: 'row wrap'}}>
          {_(moment.weekdays()).map((day, index) => {
            return (
              <Square key={index} backgroundColor='green'>
                {day}
              </Square>
            );
          }).value()}
          {_(lastMonthOffset).range().reverse().map(offset => {
            var date = month.clone().date(-offset);
            return this.renderDay(date);
          }).value()}
          {_(daysInMonth).range().map(index => {
            var date = month.clone().date(index+1);
            return <Day date={date} />;
          }).value()}
          {_(7 - nextMonthOffset).range().map(offset => {
            var date = month.clone().date(daysInMonth + offset + 1);
            return <Day date={date} isCurrentMonth={false} />;
          }).value()}
        </div>
      </div>
    );
  }
}
