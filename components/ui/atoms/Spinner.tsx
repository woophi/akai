import * as React from 'react';
require('./spinner.css');

type Props = {
  isShow?: boolean;
};

export const Spinner: React.FC<Props> = React.memo(({ isShow = true }) => {
  return (
    isShow && (
      <div style={container}>
        <div className="spinner">
          <div className="cube1" />
          <div className="cube2" />
        </div>
      </div>
    )
  );
});

const container: React.CSSProperties = {
  zIndex: 2,
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, .5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};
