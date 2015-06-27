import React, { Component } from 'react';
import {bindActionCreators, createRedux} from 'redux';
import {Connector, Provider} from 'redux/react';
import * as MonthActions from './actions/MonthActions';
import * as stores from './stores';

import Calendar from './components/Calendar';

const redux = createRedux(stores);

export default class App extends Component {

  render() {
    return (
      <Provider redux={redux}>
        {() => {
          return (
            <Connector>
              {({currentMonth, dateRanges, dispatch}) => {
                return (
                  <div>
                    <Calendar
                      month={currentMonth}
                      dateRanges={dateRanges}
                      {...bindActionCreators(MonthActions, dispatch)} />
                  </div>
                );
              }}
            </Connector>
          );
        }}
      </Provider>
    );
  }
}
