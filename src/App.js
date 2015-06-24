import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';

class Square extends Component {
  static propTypes = {
    width: React.PropTypes.number
  }

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

  static propTypes = {
    month: React.PropTypes.instanceOf(moment)
  }

  render() {
    var daysInMonth = this.props.month.daysInMonth();
    var firstDayOfMonth = this.props.month.clone().startOf('month');
    var lastDayOfMonth = this.props.month.clone().endOf('month');

    var lastMonthOffset = firstDayOfMonth.day();
    var nextMonthOffset = lastDayOfMonth.day() + 1;

    var totalDays = lastMonthOffset + daysInMonth + nextMonthOffset;

    var numberOfWeeks = Math.ceil(totalDays / 7);

    return (
      <div style={{display: 'flex', flexFlow: 'row wrap'}}>
        {_(moment.weekdays()).map((day, index) => {
          return (
            <Square key={index} backgroundColor='green'>
              {day}
            </Square>
          );
        }).value()}
        {_(lastMonthOffset).range().reverse().map(offset => {
          var date = this.props.month.clone().date(-offset);
          return (
            <Square key={date.dayOfYear()} backgroundColor='grey'>
              {date.format('D')}
            </Square>
          );
        }).value()}
        {_(daysInMonth).range().map(index => {
          var date = this.props.month.date(index+1);
          return (
            <Square key={date.dayOfYear()} backgroundColor='red'>
              {date.format('D')}
            </Square>
          );
        }).value()}

        {_(7 - nextMonthOffset).range().map(offset => {
          var date = this.props.month.clone().date(daysInMonth + offset + 1);
          return (
            <Square key={date.dayOfYear()} backgroundColor='grey'>
              {date.format('D')}
            </Square>
          );
        }).value()}
      </div>
    );
  }
}

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      month: moment().month()
    };
  }

  showNextMonth() {
    this.setState({
      month: this.state.month + 1
    });
  }

  showLastMonth() {
    this.setState({
      month: this.state.month - 1
    });
  }

  render() {
    var monthMoment = moment().month(this.state.month);
    return (
      <div>
        <Calendar month={monthMoment} />
        <button onClick={this.showLastMonth.bind(this)}>Decrement</button>
        <span>{monthMoment.format('MMMM')}</span>
        <button onClick={this.showNextMonth.bind(this)}>Increment</button>
      </div>
    );
  }
}
