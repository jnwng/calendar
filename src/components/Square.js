import React, {Component} from 'react';

export default class Square extends Component {

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
