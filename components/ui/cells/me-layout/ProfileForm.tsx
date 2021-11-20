import { makeStyles, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { safeTrim, testEmail } from 'core/lib';
import { ProfileFormModel } from 'core/models';
import { getUser } from 'core/selectors';
import { FORM_ERROR } from 'final-form';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { useSelector } from 'react-redux';
import { useTranslation } from 'server/lib/i18n';
import { ButtonsForm } from 'ui/atoms/ButtonsForm';
import { Snakbars } from 'ui/atoms/Snakbars';
import { TextField } from 'ui/atoms/TextField';
import { updateUserProfile } from './operations';

const validate = (values: ProfileFormModel, t: (s: string) => string) => {
  const errors: Partial<ProfileFormModel> = {};
  if (!safeTrim(values.name)) {
    errors.name = t('forms.field.required');
  }
  if (!safeTrim(values.email)) {
    errors.email = t('forms.field.required');
  }
  if (values.email && !testEmail.test(values.email.toLowerCase())) {
    errors.email = t('forms.field.checkFormat');
  }
  return errors;
};

const onSubmit = async (data: ProfileFormModel) => {
  try {
    await updateUserProfile({
      email: data.email,
      name: data.name,
    });
  } catch (error) {
    return { [FORM_ERROR]: JSON.stringify(error.error) };
  }
};

export const ProfileForm = React.memo(() => {
  const user = useSelector(getUser);
  const { t } = useTranslation('common');
  const classes = useStyles();

  return (
    <>
      <Form
        onSubmit={onSubmit}
        validate={(v: ProfileFormModel) => validate(v, t)}
        initialValues={user}
        render={({ handleSubmit, pristine, submitting, submitError, form, invalid, submitSucceeded }) => (
          <>
            <Box
              onSubmit={async event => {
                const error = await handleSubmit(event);
                if (error) {
                  return error;
                }
                form.setConfig('initialValues', form.getState().values);
              }}
              component="form"
              className={classes.form}
            >
              <Snakbars variant="error" message={submitError} />
              <Snakbars
                variant="success"
                message={submitSucceeded && !submitError ? t('forms.updated') : null}
                timerValue={1000}
              />
              <Field
                name="email"
                render={({ input, meta }) => (
                  <TextField
                    {...input}
                    id="outlined-email-input"
                    label={t('forms.email')}
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
                name="name"
                render={({ input, meta }) => (
                  <TextField
                    {...input}
                    id="outlined-name-input"
                    label={t('forms.name')}
                    type="text"
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

              <Box margin="1rem">
                <Typography variant="button" display="block" gutterBottom>
                  {t('forms.updatePass')}
                </Typography>
              </Box>
              <Field
                name="password"
                render={({ input, meta }) => (
                  <TextField
                    {...input}
                    label={t('forms.password')}
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    margin="normal"
                    variant="outlined"
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
                submitLabel={'common:buttons.save'}
                invalid={invalid}
              />
            </Box>
          </>
        )}
      />
    </>
  );
});

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: 320,
    maxWidth: '50vw',
    width: '100%',
    margin: '1rem auto',
  },
}));
