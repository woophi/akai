import * as React from 'react';
import { ButtonsForm, Snakbars } from 'ui/atoms';
import { Form, Field } from 'react-final-form';
import { makeStyles } from '@material-ui/core';
import { FORM_ERROR } from 'final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { SlideItem } from 'core/models';
import { PicturesChooser } from '../blog/PicturesChooser';
import { PictureField } from '../blog/PictureField';
import { updateSlides, getAllSlides } from './operations';

type Props = {
  initialValues?: {
    slides: SlideItem[];
  };
};

type SliderForm = {
  slides: SlideItem[];
};

const onSubmit = async (data: SliderForm) => {
  if (!data.slides || !data.slides.length) {
    return { [FORM_ERROR]: 'Необходимо добавить хотя бы один слайд' };
  }
  try {
    await updateSlides(data.slides);
    await getAllSlides();
  } catch (error) {
    return { [FORM_ERROR]: error.error };
  }
};

export const SliderForm = React.memo<Props>(({ initialValues }) => {
  const classes = useStyles({});

  return (
    <Form
      onSubmit={(d: SliderForm) => onSubmit(d)}
      mutators={{
        ...arrayMutators
      }}
      initialValues={initialValues}
      render={({ handleSubmit, pristine, submitting, submitError, form }) => (
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
            className={classes.field}
          />
          <FieldArray name="slides">
            {({ fields }) => (
              <>
                <PicturesChooser
                  onConfirm={id => fields.push({ file: { _id: id } })}
                  className={classes.field}
                  label={'Добавить слайды'}
                />
                {fields.map((name, index) => (
                  <Field
                    name={`${name}`}
                    key={name}
                    render={({ input }) => (
                      <PictureField
                        fileId={input.value.file._id}
                        onRemoveField={() => fields.remove(index)}
                        text={`${index + 1} слайд`}
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
    maxWidth: '50%',
    margin: '1rem auto'
  },
  field: {
    margin: '0 1rem 1rem'
  }
}));
