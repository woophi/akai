import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from 'core/models';

type Props = {
  light: boolean;
  lastUpdate: number;
}

class ClockComponent extends React.PureComponent<Props> {
  render() {
    const { lastUpdate, light } = this.props;
    return (
      <div className={light ? 'light' : ''}>
        {format(new Date(lastUpdate))}
        <style jsx>{`
          div {
            padding: 15px;
            display: inline-block;
            color: #82FA58;
            font: 50px menlo, monaco, monospace;
            background-color: #000;
          }
          .light {
            background-color: #999;
          }
        `}</style>
      </div>
    )
  }
}

export const Clock = connect((state: AppState) => ({
  light: state.ui.light,
  lastUpdate: state.ui.lastUpdate
}))(ClockComponent);

const format = (t: Date) => `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(t.getUTCSeconds())}`

const pad = (n: number) => n < 10 ? `0${n}` : n
