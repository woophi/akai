import * as React from 'react';
import { TextField, ButtonsForm, Snakbars } from 'ui/atoms';
import { safeTrim } from 'core/lib';
import { Form, Field } from 'react-final-form';
import { makeStyles } from '@material-ui/core';
import { FORM_ERROR } from 'final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { PaperDropzone, ModalUpload } from '../uploader';
import { BlogsChooser } from './BlogsChooser';

type Props = {
  albumId?: string;
};

type AlbumForm = {
  name: string;
  coverPhotoId: string;
  blogs: [
    {
      id: string;
      name: string;
    }
  ];
};

const validate = (values: AlbumForm) => {
  const errors: Partial<any> = {};

  if (!values.name || !safeTrim(values.name)) {
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
  } catch (error) {
    return { [FORM_ERROR]: error.error };
  }
};

export const AlbumForm = React.memo<Props>(({ albumId }) => {
  const classes = useStyles({});

  return (
    <Form
      onSubmit={(d: AlbumForm) => onSubmit(d, albumId)}
      validate={validate}
      mutators={{
        ...arrayMutators
      }}
      // initialValues={{
      //   name: visitorName
      // }}
      render={({ handleSubmit, pristine, submitting, submitError, form }) => (
        <>
          <Snakbars variant="error" message={submitError} />
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
            <Field
              name="name"
              render={({ input, meta }) => (
                <TextField
                  id="outlined-name-input"
                  label={'Название альбома'}
                  type="text"
                  name="name"
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
                <div>
                  <BlogsChooser />
                  {fields.map((name, index) => (
                    <div key={name}>
                      <div>
                        <label>Name</label>
                        <Field name={`${name}.name`} component="input" />
                      </div>
                      <button type="button" onClick={() => fields.remove(index)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => fields.push({ name: '', id: '123' })}
                  >
                    Add
                  </button>
                </div>
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
