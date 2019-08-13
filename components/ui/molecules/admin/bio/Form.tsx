import * as React from 'react';
import { TextField, ButtonsForm, Snakbars } from 'ui/atoms';
import { safeTrim } from 'core/lib';
import { Form, Field } from 'react-final-form';
import { makeStyles } from '@material-ui/core';
import { FORM_ERROR } from 'final-form';
import { ModalUpload } from '../uploader';
import { BioData } from 'core/models';
import { updateBio } from './operations';
import { InputBaseComponentProps } from '@material-ui/core/InputBase';

type Props = {
  initialValues: BioData;
};

type BioForm = BioData;

const validate = (values: BioForm) => {
  const errors: Partial<BioForm> = {};

  if (!safeTrim(values.bioCs)) {
    errors.bioCs = 'Обязательно к заполнению';
  }
  if (!safeTrim(values.bioEn)) {
    errors.bioEn = 'Обязательно к заполнению';
  }
  if (!safeTrim(values.bioRu)) {
    errors.bioRu = 'Обязательно к заполнению';
  }
  if (!values.photoId) {
    errors.photoId = 'Обязательно к заполнению';
  }

  return errors;
};

const onSubmit = async (data: BioForm) => {
  try {
    await updateBio(data);
  } catch (error) {
    return { [FORM_ERROR]: error.error };
  }
};

export const BioForm = React.memo<Props>(({ initialValues }) => {
  const classes = useStyles({});

  const inputProps: InputBaseComponentProps = {
    maxLength: 2000,
    style: {
      resize: 'vertical'
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ handleSubmit, pristine, submitting, submitError, form }) => (
        <form
          onSubmit={async event => {
            const error = await handleSubmit(event);
            if (error) {
              return error;
            }
            form.setConfig('initialValues', form.getState().values);
          }}
          className={classes.form}
        >
          <Snakbars
            variant="error"
            message={submitError}
            className={classes.field}
          />
          <Field
            name="bioCs"
            render={({ input, meta }) => (
              <TextField
                variant="outlined"
                label={'Описание биографии на чешском'}
                multiline
                rows="8"
                className={classes.field}
                {...input}
                error={Boolean(meta.touched && meta.error)}
                helperText={
                  (meta.touched && meta.error) || `${input.value.length}/2000`
                }
                disabled={submitting}
                inputProps={inputProps}
              />
            )}
          />
          <Field
            name="bioEn"
            render={({ input, meta }) => (
              <TextField
                variant="outlined"
                label={'Описание биографии на английском'}
                multiline
                rows="8"
                className={classes.field}
                {...input}
                error={Boolean(meta.touched && meta.error)}
                helperText={
                  (meta.touched && meta.error) || `${input.value.length}/2000`
                }
                disabled={submitting}
                inputProps={inputProps}
              />
            )}
          />
          <Field
            name="bioRu"
            render={({ input, meta }) => (
              <TextField
                variant="outlined"
                label={'Описание биографии на русском'}
                multiline
                rows="8"
                className={classes.field}
                {...input}
                error={Boolean(meta.touched && meta.error)}
                helperText={
                  (meta.touched && meta.error) || `${input.value.length}/2000`
                }
                disabled={submitting}
                inputProps={inputProps}
              />
            )}
          />
          <Field
            name="photoId"
            render={({ input, meta }) => (
              <ModalUpload
                error={meta.touched && meta.error}
                disabled={submitting}
                input={input}
                className={classes.field}
                inputLabel={'Фото для биографии'}
              />
            )}
          />
          <ButtonsForm
            pristine={pristine}
            submitting={submitting}
            both
            onCancel={form.reset}
            submitLabel={'common:buttons.save'}
          />
        </form>
      )}
    />
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
    margin: '1rem auto'
  },
  field: {
    margin: '0 1rem 1rem'
  }
}));
