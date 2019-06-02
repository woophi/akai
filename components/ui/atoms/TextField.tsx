import * as React from 'react';
import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

export const TextField: React.FC<TextFieldProps> = React.memo(({className, ...props}) => {
  const classes = useStyles();
  return <MuiTextField className={`${className} ${classes.input}`} {...props} />
})

const useStyles = makeStyles(theme => ({
  input: {
    marginLeft: '1rem',
    marginRight: '1rem',
    '&>label': {
      color: theme.palette.primary.main
    }
  }
}));
