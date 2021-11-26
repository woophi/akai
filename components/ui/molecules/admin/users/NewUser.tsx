import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, ButtonsForm, Snakbars } from 'ui/atoms';
import { Form, Field } from 'react-final-form';
import { testEmail, theme } from 'core/lib';
import { useTranslation } from 'server/lib/i18n';
import { FORM_ERROR } from 'final-form';
import { createNewUser } from './operations';
import { CreatableRole, NewUser as NewUserForm } from 'core/models';
import { FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select } from '@material-ui/core';

const validate = (values: NewUserForm, t: (s: string) => string) => {
  const errors: Partial<NewUserForm> = {};

  if (!values.email) {
    errors.email = t('common:forms.field.required');
  }
  if (values.email && !testEmail.test(values.email.toLowerCase())) {
    errors.email = t('common:forms.field.invalid');
  }
  if (!values.password) {
    errors.password = t('common:forms.field.required');
  }
  if (!values.name) {
    errors.name = t('common:forms.field.required');
  }
  if (!values.lastName) {
    errors.lastName = t('common:forms.field.required');
  }
  if (!values.role) {
    errors.role = t('common:forms.field.required');
  }
  return errors;
};

const onSubmit = async (data: NewUserForm) => {
  try {
    await createNewUser(data);
  } catch (error) {
    return { [FORM_ERROR]: error.error };
  }
};

export const NewUser: React.FC = () => {
  const classes = useStyles({});
  const { t } = useTranslation();
  return (
    <Form
      onSubmit={onSubmit}
      validate={(v: NewUserForm) => validate(v, t)}
      render={({ handleSubmit, pristine, submitting, submitError, form }) => (
        <>
          <form
            onSubmit={async event => {
              const error = await handleSubmit(event);
              if (error) {
                return error;
              } else {
                form.reset();
              }
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
                  label={'Имя'}
                  type="text"
                  name="name"
                  margin="normal"
                  variant="outlined"
                  autoComplete="name"
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
                  label={'Фамилия'}
                  type="text"
                  name="lastName"
                  margin="normal"
                  variant="outlined"
                  autoComplete="lastName"
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
                  label={'E-mail'}
                  type="text"
                  name="email"
                  margin="normal"
                  autoComplete="new-email"
                  variant="outlined"
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
                  label={'Пароль'}
                  type="password"
                  name="password"
                  autoComplete="new-password"
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
              name="role"
              render={({ input, meta }) => (
                <FormControl variant="outlined" error={Boolean(meta.touched && meta.error)} className={classes.selectForm}>
                  <InputLabel htmlFor="role" style={{ color: theme.palette.primary.main }}>
                    {'Роль пользователя'}
                  </InputLabel>
                  <Select {...input} input={<OutlinedInput labelWidth={50} id="role" />} disabled={submitting}>
                    <MenuItem value={CreatableRole.ADMIN}>{'Админ'}</MenuItem>
                    <MenuItem value={CreatableRole.CUSTOMER}>{'Покупатель'}</MenuItem>
                  </Select>
                  {meta.touched && <FormHelperText>{meta.error}</FormHelperText>}
                </FormControl>
              )}
            />
            <ButtonsForm
              pristine={pristine}
              submitting={submitting}
              both
              onCancel={form.reset}
              submitLabel={'common:buttons.add'}
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
  selectForm: {
    margin: '1rem',
  },
}));
