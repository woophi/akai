import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from 'ui/atoms';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { Form, Field } from 'react-final-form';
import { testEmail } from 'core/lib';
import { sendMessage } from 'core/operations';

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

const validate = (values: ContactForm) => {
  const errors: Partial<ContactForm> = {};

  if (!values.email) {
    errors.email = 'required';
  }
  if (values.email && !testEmail.test(values.email.toLowerCase())) {
    errors.email = 'invalid';
  }
  if (!values.name) {
    errors.name = 'required';
  }
  if (!values.message) {
    errors.message = 'required';
  }

  return errors;
};

const onSubmit = async (data: ContactForm, formProps: any) => {
  await sendMessage(data).then(formProps.reset);
}

export const ContactForm: React.FC = () => {
  const classes = useStyles({});

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      render={({ handleSubmit, pristine, invalid, submitting }) => (
        <form onSubmit={handleSubmit} className={classes.form}>
          <Field
            name="name"
            render={({ input, meta }) => (
              <TextField
                id="outlined-name-input"
                label="Name"
                type="text"
                name="name"
                margin="normal"
                variant="outlined"
                required
                {...input}
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
                disabled={submitting}
              />
            )}
          />
          <Field
            name="email"
            render={({ input, meta }) => (
              <TextField
                id="outlined-email-input"
                label="Email"
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                required
                {...input}
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
                disabled={submitting}
              />
            )}
          />
          <Field
            name="message"
            render={({ input, meta }) => (
              <TextField
                id="outlined-message-static"
                label="Message"
                multiline
                rows="4"
                margin="normal"
                variant="outlined"
                {...input}
                error={Boolean(meta.touched && meta.error)}
                helperText={meta.touched && meta.error}
                disabled={submitting}
              />
            )}
          />
          <div className={classes.button}>
            <Button
              type="submit"
              disabled={pristine || invalid || submitting}
              variant={'contained'}
              color="primary"
              className={classes.button}
            >
              Send
            </Button>
            {submitting &&
              <Icon
                className={`fas fa-circle-notch fa-spin`}
                color="primary"
              />
            }
          </div>
        </form>
      )}
    />
  );
};

const useStyles = makeStyles(theme => ({
  button: {
    margin: '0 auto 1rem',
    color: theme.palette.text.secondary
  },
  form: {
    margin: '2rem auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: '320px',
    maxWidth: '50%'
  }
}));
