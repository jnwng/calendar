import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';

class Square extends Component {
  static propTypes = {
    width: React.PropTypes.number
  }

  // getDefaultProps() {
  //   return {
  //     width: 100
  //   }
  // }

  render() {
    var style = {
      backgroundColor: this.props.backgroundColor,
      display: 'flex',
      width: `14%`,
      height: `100px`
    };
    return (
      <div style={style}>
        {this.props.children}
      </div>
    )

  }
}

export class Calendar extends Component {
  render() {
    var daysInMonth = moment().daysInMonth();
    var firstDayOfMonth = moment().startOf('month');
    var lastDayOfMonth = moment().endOf('month');

    var lastMonthOffset = firstDayOfMonth.day();
    var nextMonthOffset = 7 - lastDayOfMonth.day();

    var totalDays = lastMonthOffset + daysInMonth + nextMonthOffset;

    var numberOfWeeks = Math.ceil(totalDays / 7);

    return (
      <div style={{display: 'flex', flexFlow: 'row wrap'}}>
        {_(lastMonthOffset).range().reverse().map(offset => {
          var date = moment().date(-offset);
          return (
            <Square key={date.dayOfYear()} backgroundColor='grey'>
              {date.format('D')}
            </Square>
          );
        }).value()}
        {_(daysInMonth).range().map(index => {
          var date = moment().date(index+1);
          return (
            <Square key={date.dayOfYear()} backgroundColor='red'>
              {date.format('D')}
            </Square>
          );
        }).value()}
      </div>
    );
    return <h3>Hello World.</h3>;
  }
}

export default class App extends Component {
  render() {
    return (
      <Calendar/>
    );
  }
}
