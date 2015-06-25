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

/**
 * Smart component for days.
 */
export class Day extends Component {

  static propTypes = {
    date: React.PropTypes.instanceOf(moment)
  }

  render() {
    return (
      <Square backgroundColor='red'>
        {this.props.date.format('D')}
      </Square>
    );
  }
}

export class Calendar extends Component {

  static propTypes = {
    month: React.PropTypes.number
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
            return <Day date={date}/>;
          }).value()}
          {_(daysInMonth).range().map(index => {
            var date = month.clone().date(index+1);
            return <Day date={date}/>;
          }).value()}
          {_(7 - nextMonthOffset).range().map(offset => {
            var date = month.clone().date(daysInMonth + offset + 1);
            return <Day date={date}/>;
          }).value()}
        </div>
      </div>
    );
  }
}

import {bindActionCreators, createRedux} from 'redux';
import {Connector, Provider} from 'redux/react';
import * as MonthActions from './actions/MonthActions';
// import * as stores from './stores';
import * as currentMonth from './stores/CurrentMonthStore';

const redux = createRedux(currentMonth);

export default class App extends Component {

  render() {
    return (
      <Provider redux={redux}>
        {() => {
          return <Connector>
            {({currentMonth, dispatch}) => {
              return (
                <div>
                  <Calendar month={currentMonth} {...bindActionCreators(MonthActions, dispatch)} />
                </div>
              );
            }}
          </Connector>
        }}
      </Provider>
    );
  }
}
