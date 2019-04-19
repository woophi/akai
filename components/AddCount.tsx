import * as React from 'react';
import { connect } from 'react-redux';
import * as actions from 'core/actions'
import { AppState } from 'core/models';

type Props = {
  count: number
};

class AddCountComponent extends React.PureComponent<Props> {

  render () {
    const { count } = this.props
    return (
      <div>
        <style jsx>{`
          div {
            padding: 0 0 20px 0;
          }
      `}</style>
        <h1>AddCount: <span>{count}</span></h1>
        <button onClick={actions.askCount}>Add To Count</button>
      </div>
    )
  }
}

export const AddCount = connect((state: AppState) => ({
  count: state.ui.count
}))(AddCountComponent);
