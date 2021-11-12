import { IconButton, InputAdornment } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import * as React from 'react';

export const TextField = React.memo<TextFieldProps>(({ className, ...props }) => {
  const classes = useStyles({ textArea: !!props.multiline });
  const [showPass, setShowPass] = React.useState(false);
  const handleClickShowPassword = React.useCallback(() => {
    setShowPass(!showPass);
  }, [showPass]);
  return (
    <MuiTextField
      className={`${className} ${classes.input}`}
      InputProps={
        props.name === 'password'
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" aria-label="Toggle password visibility" onClick={handleClickShowPassword}>
                    {!showPass ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : {}
      }
      {...props}
      type={props.name === 'password' && showPass ? 'text' : props.type}
    />
  );
});

const useStyles = makeStyles(theme => ({
  input: (props: { textArea: boolean }) => ({
    margin: '0 1rem 1rem',
    minHeight: props.textArea ? '8rem' : '4rem',
    '&>label': {
      color: theme.palette.primary.main,
    },
    '&>.MuiFormHelperText-filled': {
      color: theme.palette.primary.main,
    },
  }),
}));
