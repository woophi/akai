import { makeStyles } from '@material-ui/core/styles';
import { testEmail } from 'core/lib';
import { FORM_ERROR } from 'final-form';
import Router from 'next/router';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { useTranslation } from 'server/lib/i18n';
import { ButtonsForm, Snakbars, TextField } from 'ui/atoms';
import { register } from './operations';

type RegisterForm = {
  name: string;
  lastName: string;
  email: string;
  password: string;
};

const validate = (values: RegisterForm, t: (s: string) => string) => {
  const errors: Partial<RegisterForm> = {};

  if (!values.name) {
    errors.email = t('common:forms.field.required');
  }
  if (!values.lastName) {
    errors.lastName = t('common:forms.field.required');
  }
  if (!values.email) {
    errors.email = t('common:forms.field.required');
  }
  if (values.email && !testEmail.test(values.email.toLowerCase())) {
    errors.email = t('common:forms.field.invalid');
  }
  if (!values.password) {
    errors.password = t('common:forms.field.required');
  }
  return errors;
};

const onSubmit = async (data: RegisterForm) => {
  try {
    await register(data);
    Router.replace('/login');
  } catch (error) {
    return { [FORM_ERROR]: error.error ?? error };
  }
};

export const RegisterForm: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation('common');
  return (
    <Form
      onSubmit={onSubmit}
      validate={(v: RegisterForm) => validate(v, t)}
      render={({ handleSubmit, pristine, submitting, submitError, form }) => (
        <>
          <form
            onSubmit={async event => {
              const error = await handleSubmit(event);
              if (error) {
                return error;
              }
              form.reset();
            }}
            className={classes.form}
          >
            <Snakbars
              variant="error"
              message={submitError}
              style={{
                margin: '0 1rem .5rem',
              }}
            />
            <Field
              name="name"
              render={({ input, meta }) => (
                <TextField
                  {...input}
                  id="outlined-name-input"
                  label={t('common:forms.name')}
                  type="text"
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
              name="lastName"
              render={({ input, meta }) => (
                <TextField
                  {...input}
                  id="outlined-name-input"
                  label={t('common:forms.lastName')}
                  type="text"
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
                  {...input}
                  id="outlined-email-input"
                  label={t('common:forms.email')}
                  type="text"
                  name="email"
                  margin="normal"
                  variant="outlined"
                  autoComplete="email"
                  required
                  error={Boolean(meta.touched && meta.error)}
                  helperText={meta.touched && meta.error}
                  disabled={submitting}
                />
              )}
            />
            <Field
              name="password"
              render={({ input, meta }) => (
                <TextField
                  {...input}
                  id="outlined-password-input"
                  label={t('common:forms.password')}
                  type="password"
                  name="password"
                  autoComplete="password"
                  margin="normal"
                  variant="outlined"
                  required
                  error={Boolean(meta.touched && meta.error)}
                  helperText={meta.touched && meta.error}
                  disabled={submitting}
                />
              )}
            />
            <ButtonsForm
              pristine={pristine}
              submitting={submitting}
              both
              onCancel={form.reset}
              submitLabel={'common:buttons.register'}
            />
          </form>
        </>
      )}
    />
  );
};

const useStyles = makeStyles(theme => ({
  form: {
    margin: '0 auto 2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: '320px',
    maxWidth: '50%',
  },
}));
