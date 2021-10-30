import * as React from 'react';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { safeTrim } from 'core/lib';
import { getAllYoutubes, createYoutube } from './operations';
import { FORM_ERROR } from 'final-form';
import { Form, Field } from 'react-final-form';
import { TextField, ButtonsForm, Snakbars } from 'ui/atoms';

type NewYoutubeForm = {
  youtube: string;
  title: string;
};

const validate = (values: NewYoutubeForm) => {
  const errors: Partial<NewYoutubeForm> = {};
  if (!safeTrim(values.youtube)) {
    errors.youtube = 'Обязательно к заполнению';
  }
  if (!safeTrim(values.title)) {
    errors.youtube = 'Обязательно к заполнению';
  }

  return errors;
};

const onSubmit = async (data: NewYoutubeForm) => {
  try {
    await createYoutube(data.youtube, data.title);
    await getAllYoutubes();
  } catch (error) {
    return { [FORM_ERROR]: error.error };
  }
};

export const NewYoutube = React.memo(() => {
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => setOpen(!open);

  return (
    <Box display="flex" justifyContent="center" flexWrap="wrap">
      <FormControlLabel
        control={<Switch checked={open} onChange={handleToggle} value="checkedB" color="primary" />}
        label={'Добавить видео'}
      />
      <Fade in={open}>
        <div>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            render={({ handleSubmit, pristine, submitting, form, submitError }) => (
              <Box
                onSubmit={async (event: any) => {
                  const error = await handleSubmit(event);
                  if (error) {
                    return error;
                  }
                  form.reset();
                }}
                component="form"
                display="flex"
                alignItems="center"
                flexWrap="wrap"
                justifyContent="center"
              >
                <Snakbars variant="error" message={submitError} />
                <Field
                  name="youtube"
                  render={({ input, meta }) => (
                    <TextField
                      label={'Youtube ссылка'}
                      type="text"
                      {...input}
                      name="youtube"
                      required
                      variant="standard"
                      error={Boolean(meta.touched && meta.error)}
                      disabled={submitting}
                    />
                  )}
                />
                <Field
                  name="title"
                  render={({ input, meta }) => (
                    <TextField
                      label={'Youtube заголовок'}
                      type="text"
                      {...input}
                      name="title"
                      required
                      variant="standard"
                      error={Boolean(meta.touched && meta.error)}
                      disabled={submitting}
                    />
                  )}
                />
                <ButtonsForm
                  pristine={pristine}
                  submitting={submitting}
                  both
                  onCancel={form.reset}
                  submitLabel={'common:buttons.add'}
                  noMargin
                />
              </Box>
            )}
          />
        </div>
      </Fade>
    </Box>
  );
});
