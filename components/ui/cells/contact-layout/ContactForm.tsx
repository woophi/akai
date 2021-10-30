import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, ButtonsForm, Snakbars } from 'ui/atoms';
import { Form, Field } from 'react-final-form';
import { delay, testEmail } from 'core/lib';
import { sendMessage } from 'core/operations';
import { useTranslation } from 'server/lib/i18n';
import { FORM_ERROR } from 'final-form';

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

const validate = (values: ContactForm, t: (s: string) => string) => {
  const errors: Partial<ContactForm> = {};

  if (!values.email) {
    errors.email = t('common:forms.field.required');
  }
  if (values.email && !testEmail.test(values.email.toLowerCase())) {
    errors.email = t('common:forms.field.invalid');
  }
  if (!values.name) {
    errors.name = t('common:forms.field.required');
  }
  if (!values.message) {
    errors.message = t('common:forms.field.required');
  }

  return errors;
};

const onSubmit = async (data: ContactForm) => {
  try {
    await sendMessage(data);
  } catch (error) {
    return { [FORM_ERROR]: JSON.stringify(error.error) };
  }
};

export const ContactForm: React.FC = () => {
  const classes = useStyles({});
  const { t } = useTranslation();
  return (
    <Form
      onSubmit={onSubmit}
      validate={(v: ContactForm) => validate(v, t)}
      render={({ handleSubmit, pristine, submitting, form, submitError, submitSucceeded }) => (
        <form
          onSubmit={async event =>
            await handleSubmit(event)!
              .then(() => delay(2000))
              .then(() => form.reset())
          }
          className={classes.form}
        >
          <Snakbars variant="error" message={submitError} className={classes.field} />
          <Snakbars
            variant="success"
            message={submitSucceeded && !submitError ? t('common:contact.thx') : null}
            className={classes.field}
            timerValue={1000}
          />
          <Field
            name="name"
            render={({ input, meta }) => (
              <TextField
                id="outlined-name-input"
                label={t('common:forms.name')}
                type="text"
                {...input}
                name="name"
                margin="normal"
                variant="outlined"
                required
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
                label={t('common:forms.email')}
                type="email"
                {...input}
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                required
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
                label={t('common:forms.message')}
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
          <ButtonsForm pristine={pristine} submitting={submitting} />
        </form>
      )}
    />
  );
};

const useStyles = makeStyles(theme => ({
  form: {
    margin: '2rem auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: '320px',
    maxWidth: '50%',
  },
  field: {
    margin: '0 1rem 1rem',
  },
}));
