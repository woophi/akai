import * as React from 'react';
import { ButtonsForm, Snakbars } from 'ui/atoms';
import { Form } from 'react-final-form';
import { makeStyles } from '@material-ui/core';
import { FORM_ERROR } from 'final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { SlideItem } from 'core/models';
import { PicturesChooser } from '../blog/PicturesChooser';
import { updateSlides, getAllSlides } from './operations';
import { SortableFactory } from 'ui/molecules/sortable';

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
            {({ fields }) => {
              const onSortEnd = ({ oldIndex, newIndex }) => {
                fields.move(oldIndex, newIndex);
              };
              const removeCb = (index: number) => {
                fields.remove(index);
              };
              return (
                <>
                  <PicturesChooser
                    onConfirm={id => fields.push({ file: { _id: id } })}
                    className={classes.field}
                    label={'Добавить слайды'}
                  />
                  <SortableFactory
                    items={fields}
                    onSortEnd={onSortEnd}
                    lockAxis="y"
                    removeCb={removeCb}
                    lockToContainerEdges
                    useDragHandle
                    transitionDuration={200}
                    typeOfField="photo"
                  />
                </>
              );
            }}
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
