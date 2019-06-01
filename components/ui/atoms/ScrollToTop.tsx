import * as React from 'react';
import Fab from '@material-ui/core/Fab';
import { makeStyles, Theme } from '@material-ui/core/styles';
import NavigationIcon from '@material-ui/icons/Navigation';

type LocalState = {
  show: boolean;
};

export class ScrollButton extends React.PureComponent<unknown, LocalState> {
  timeInterval: any = null;

  state: LocalState = {
    show: false
  };

  get checkWindow() {
    if (typeof window !== 'undefined') return true;
    return false;
  };

  componentDidMount() {
    if (this.checkWindow) {
      this.handleShow()
      window.addEventListener('scroll', this.handleShow);
      window.addEventListener('wheel', this.stopScrolling);
      window.addEventListener('touchstart', this.stopScrolling);
    }
  }

  componentWillMount() {
    if (this.checkWindow) {
      window.removeEventListener('scroll', this.handleShow);
      window.removeEventListener('wheel', this.stopScrolling);
      window.removeEventListener('touchstart', this.stopScrolling);
      clearInterval(this.timeInterval);
    }
  }

  handleShow = () => {
    this.setState({ show: window.pageYOffset > 100 });
  };

  stopScrolling = () => {
    clearInterval(this.timeInterval);
  };

  scrollStep = () => {
    if (window.pageYOffset === 0) {
      clearInterval(this.timeInterval);
    }
    window.scroll(0, window.pageYOffset - 50);
  };

  scrollToTop = () => {
    let intervalId = setInterval(this.scrollStep, 16.66);
    this.timeInterval = intervalId;
  };

  render() {
    return <ActionButton onClick={this.scrollToTop} visible={this.state.show} />;
  }
}

type Props = {
  onClick: () => void;
  visible: boolean;
};

const ActionButton: React.FC<Props> = React.memo(({ onClick, visible }) => {
  const classes = useStyles({ visible });
  return (
    <Fab color="secondary" className={classes.scrollTotop} onClick={onClick}>
      <NavigationIcon />
    </Fab>
  );
});

type StyleProps = {
  visible: boolean;
};

const useStyles = makeStyles<Theme, StyleProps>(theme => ({
  scrollTotop: props => ({
    position: 'fixed',
    left: 15,
    bottom: 20,
    opacity: props.visible ? 0.3 : 0,
    visibility: props.visible ? 'visible' : 'hidden',
    transition: '.2s ease-in-out',
    '&:hover': {
      opacity: props.visible ? 0.9 : 0,
      transform: props.visible ? 'scale(1.1)' : 'scale(1)',
    }
  })
}));
