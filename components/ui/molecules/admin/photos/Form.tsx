import * as React from 'react';
import { ButtonsForm, Snakbars } from 'ui/atoms';
import { Form } from 'react-final-form';
import { makeStyles } from '@material-ui/core';
import { FORM_ERROR } from 'final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { PhotoItem } from 'core/models';
import { PicturesChooser } from '../blog/PicturesChooser';
import { updatePhotos, getAllPhotos } from './operations';
import { SortableFactory } from 'ui/molecules/sortable';
import { SortEndHandler } from 'react-sortable-hoc';

type Props = {
  initialValues?: {
    photos: PhotoItem[];
  };
};

type PhotosForm = {
  photos: PhotoItem[];
};

const onSubmit = async (data: PhotosForm) => {
  if (!data.photos || !data.photos.length) {
    return { [FORM_ERROR]: 'Необходимо добавить хотя бы одино фото' };
  }
  try {
    await updatePhotos(data.photos);
    await getAllPhotos();
  } catch (error) {
    return { [FORM_ERROR]: error.error };
  }
};

export const PhotosForm = React.memo<Props>(({ initialValues }) => {
  const classes = useStyles({});

  return (
    <Form
      onSubmit={(d: PhotosForm) => onSubmit(d)}
      mutators={{
        ...arrayMutators,
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
          <Snakbars variant="error" message={submitError} className={classes.field} />
          <FieldArray name="photos">
            {({ fields }) => {
              const onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
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
                    label={'Добавить фотографии'}
                  />
                  <SortableFactory
                    items={fields}
                    onSortEnd={onSortEnd}
                    lockAxis="y"
                    removeCb={removeCb}
                    lockToContainerEdges
                    useDragHandle
                    transitionDuration={200}
                    textItem={'фото'}
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
    maxWidth: '50vw',
    width: '100%',
    margin: '1rem auto',
  },
  field: {
    margin: '0 1rem 1rem',
  },
}));
