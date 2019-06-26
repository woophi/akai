import * as React from 'react';
import { TextField, ButtonsForm, Snakbars } from 'ui/atoms';
import { useTranslation } from 'server/lib/i18n';
import { safeTrim } from 'core/lib';
import { newComment } from './operations';
import { Form, Field } from 'react-final-form';
import { makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { FORM_ERROR } from 'final-form';
import { getVisitorName } from 'core/operations';

type Props = {
  blogId: string;
};

type CommentForm = {
  name: string;
  message: string;
};

const validate = (values: CommentForm, t: (s: string) => string) => {
  const errors: Partial<CommentForm> = {};

  if (!values.name || !safeTrim(values.name)) {
    errors.name = t('common:forms.field.required');
  }
  if (!values.message || !safeTrim(values.message)) {
    errors.message = t('common:forms.field.required');
  }

  return errors;
};

const onSubmit = async (data: CommentForm, formProps: any, blogId: string) => {
  try {
    await newComment(data, blogId).then(() => formProps.reset());
  } catch (error) {
    return { [FORM_ERROR]: 'Cannot add comment' };
  }
};

export const AddComment = React.memo<Props>(({ blogId }) => {
  const { t } = useTranslation();
  const classes = useStyles({});
  const [visitorName, setName] = React.useState('');

  React.useEffect(() => {
    getVisitorName().then(setName);
  }, []);

  return (
    <Paper elevation={4} className={classes.paper}>
      <Typography gutterBottom variant="body1">
        {t('gallery.addComments')}
      </Typography>
      <Form
        onSubmit={(d: CommentForm, fP) => onSubmit(d, fP, blogId)}
        validate={(v: CommentForm) => validate(v, t)}
        initialValues={{
          name: visitorName
        }}
        render={({
          handleSubmit,
          pristine,
          invalid,
          submitting,
          submitError,
          form
        }) => (
          <>
            <Snakbars variant="error" message={submitError} onClose={form.reset} />
            <form onSubmit={handleSubmit} className={classes.form}>
              <Field
                name="name"
                render={({ input, meta }) => (
                  <TextField
                    id="outlined-name-input"
                    label={t('common:forms.name')}
                    type="text"
                    name="name"
                    fullWidth
                    required
                    className={classes.field}
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
                    label={t('common:typeHere')}
                    multiline
                    rows="4"
                    fullWidth
                    className={classes.field}
                    {...input}
                    error={Boolean(meta.touched && meta.error)}
                    helperText={meta.touched && meta.error}
                    disabled={submitting}
                  />
                )}
              />
              <ButtonsForm
                invalid={invalid}
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
    </Paper>
  );
});

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '1rem'
  },
  paper: {
    margin: '0 auto .5rem',
    padding: '1rem',
    maxWidth: '600px',
    width: '100%'
  },
  field: {
    margin: 0
  }
}));