import { Radio, RadioProps } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import withStyles from 'react-jss';

export const GreenRadio = withStyles({
  root: {
    color: `${green[400]} !important`,
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);
