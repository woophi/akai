import * as React from 'react';
import { TextField, ButtonsForm, Snakbars } from 'ui/atoms';
import { safeTrim } from 'core/lib';
import { Form, Field } from 'react-final-form';
import { makeStyles } from '@material-ui/core';
import { FORM_ERROR } from 'final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { ModalUpload } from '../uploader';
import { BlogsChooser } from './BlogsChooser';
import { BlogItemField } from './BlogItemField';
import { AlbumData } from 'core/models';
import { createNewAlbum, editAlbum } from './operations';
import { goToSpecific } from 'core/common';

type Props = {
  albumId?: string;
  initialValues?: AlbumData;
};

type AlbumForm = AlbumData;

const validate = (values: AlbumForm) => {
  const errors: Partial<any> = {};

  if (!safeTrim(values.nameEn)) {
    errors.name = 'Обязательно к заполнению';
  }
  if (!safeTrim(values.nameCs)) {
    errors.name = 'Обязательно к заполнению';
  }
  if (!safeTrim(values.nameRu)) {
    errors.name = 'Обязательно к заполнению';
  }
  if (!values.coverPhotoId) {
    errors.coverPhotoId = 'Обязательно к заполнению';
  }

  return errors;
};

const onSubmit = async (data: AlbumForm, albumId?: string) => {
  if (!data.blogs || !data.blogs.length) {
    return { [FORM_ERROR]: 'Необходимо выбрать хотя бы один блог' };
  }
  try {
    if (albumId) {
      await editAlbum(albumId, data);
    } else {
      const id = await createNewAlbum(data);
      goToSpecific(`/admin/album/${id}`);
    }
  } catch (error) {
    return { [FORM_ERROR]: error.error };
  }
};

export const AlbumForm = React.memo<Props>(({ albumId, initialValues = {} }) => {
  const classes = useStyles({});

  return (
    <Form
      onSubmit={(d: AlbumForm) => onSubmit(d, albumId)}
      validate={validate}
      mutators={{
        ...arrayMutators
      }}
      initialValues={albumId ? initialValues : {}}
      render={({ handleSubmit, pristine, submitting, submitError, form }) => (
        <>
          <Snakbars variant="error" message={submitError} />
          <form
            onSubmit={async event => {
              const error = await handleSubmit(event);
              if (error) {
                return error;
              }
              if (!albumId) {
                form.reset();
              } else {
                form.setConfig('initialValues', form.getState().values)
              }
            }}
            className={classes.form}
          >
            <Field
              name="nameRu"
              render={({ input, meta }) => (
                <TextField
                  id="outlined-name-input"
                  label={'Название альбома на русском'}
                  type="text"
                  name="nameRu"
                  required
                  variant="outlined"
                  className={classes.field}
                  {...input}
                  error={Boolean(meta.touched && meta.error)}
                  helperText={
                    (meta.touched && meta.error) || `${input.value.length}/256`
                  }
                  disabled={submitting}
                  inputProps={{
                    maxLength: 256
                  }}
                />
              )}
            />
            <Field
              name="nameEn"
              render={({ input, meta }) => (
                <TextField
                  id="outlined-name-input"
                  label={'Название альбома на английском'}
                  type="text"
                  name="nameEn"
                  required
                  variant="outlined"
                  className={classes.field}
                  {...input}
                  error={Boolean(meta.touched && meta.error)}
                  helperText={
                    (meta.touched && meta.error) || `${input.value.length}/256`
                  }
                  disabled={submitting}
                  inputProps={{
                    maxLength: 256
                  }}
                />
              )}
            />
            <Field
              name="nameCs"
              render={({ input, meta }) => (
                <TextField
                  id="outlined-name-input"
                  label={'Название альбома на чешском'}
                  type="text"
                  name="nameCs"
                  required
                  variant="outlined"
                  className={classes.field}
                  {...input}
                  error={Boolean(meta.touched && meta.error)}
                  helperText={
                    (meta.touched && meta.error) || `${input.value.length}/256`
                  }
                  disabled={submitting}
                  inputProps={{
                    maxLength: 256
                  }}
                />
              )}
            />
            <Field
              name="coverPhotoId"
              render={({ input, meta }) => (
                <ModalUpload
                  error={meta.touched && meta.error}
                  disabled={submitting}
                  input={input}
                />
              )}
            />
            <FieldArray name="blogs">
              {({ fields }) => (
                <>
                  <BlogsChooser onConfirm={fields.push} />
                  {fields.map((name, index) => (
                    <Field
                      name={`${name}`}
                      key={name}
                      render={({ input }) => (
                        <BlogItemField
                          input={input}
                          onRemoveField={() => fields.remove(index)}
                        />
                      )}
                    />
                  ))}
                </>
              )}
            </FieldArray>
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