import * as React from 'react';
import { TextField, ButtonsForm, Snakbars, ActionButton } from 'ui/atoms';
import { safeTrim, theme } from 'core/lib';
import { Form, Field } from 'react-final-form';
import { makeStyles } from '@material-ui/core';
import { FORM_ERROR } from 'final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { BlogData, AlbumModel } from 'core/models';
import { goToSpecific } from 'core/common';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import moment from 'moment';
import { PictureField } from './PictureField';
import { PicturesChooser } from './PicturesChooser';
import { editBlog, createNewBlog, deleteBlog } from './operations';
import { SortableFactory } from 'ui/molecules/sortable';
import { AlbumField } from './AlbumField';

type Props = {
  blogId?: string;
  initialValues?: BlogData;
  albums: AlbumModel[];
};

type BlogForm = BlogData;

const validate = (values: BlogForm) => {
  const errors: Partial<any> = {};
  if (!safeTrim(values.creationPictureDate)) {
    errors.creationPictureDate = 'Обязательно к заполнению';
  }
  if (!safeTrim(values.titleCs)) {
    errors.titleCs = 'Обязательно к заполнению';
  }
  if (!safeTrim(values.titleEn)) {
    errors.titleEn = 'Обязательно к заполнению';
  }
  if (!safeTrim(values.titleRu)) {
    errors.titleRu = 'Обязательно к заполнению';
  }
  if (!safeTrim(values.topicCs)) {
    errors.topicCs = 'Обязательно к заполнению';
  }
  if (!safeTrim(values.topicEn)) {
    errors.topicEn = 'Обязательно к заполнению';
  }
  if (!safeTrim(values.topicRu)) {
    errors.topicRu = 'Обязательно к заполнению';
  }

  return errors;
};

const onSubmit = async (data: BlogForm, blogId?: string) => {
  if (!data.photos || !data.photos.length) {
    return { [FORM_ERROR]: 'Необходимо выбрать хотя бы одну картину' };
  }
  try {
    if (blogId) {
      await editBlog(blogId, data);
    } else {
      const id = await createNewBlog(data);
      goToSpecific(`/admin/blogs/edit/${id}`);
    }
  } catch (error) {
    return { [FORM_ERROR]: error.error };
  }
};

const getPhotoValues = (v: BlogForm) => {
  if (!v.photos) return [];
  return v.photos.map(p => (
    <MenuItem key={p} value={p}>
      <PictureField fileId={p} />
    </MenuItem>
  ));
};
const getAlbums = (albums: AlbumModel[]) => {
  if (!albums || !albums.length) return [];
  return albums.map(a => (
    <MenuItem key={a.id} value={a.id}>
      <AlbumField album={a} />
    </MenuItem>
  ));
};

export const BlogForm = React.memo<Props>(
  ({ blogId, initialValues = {}, albums }) => {
    const classes = useStyles({});
    const inputLabelSLID = React.useRef<HTMLLabelElement>(null);
    const inputLabelSP = React.useRef<HTMLLabelElement>(null);
    const inputLabelAlbum = React.useRef<HTMLLabelElement>(null);
    const [labelWidthSLID, setLabelWidthSLID] = React.useState(0);
    const [labelWidthSP, setLabelWidthSP] = React.useState(0);
    const [labelWidthAlbum, setLabelWidthAlbum] = React.useState(0);
    React.useEffect(() => {
      if (!blogId) {
        setLabelWidthSLID(inputLabelSLID.current!.offsetWidth);
        setLabelWidthSP(inputLabelSP.current!.offsetWidth);
        setLabelWidthAlbum(inputLabelAlbum.current!.offsetWidth);
      }
    }, []);

    const hundleDeletBlog = () => deleteBlog(blogId);

    return (
      <>
        {blogId && (
          <ActionButton
            action={hundleDeletBlog}
            label={'Удалить блог'}
            backToUrl={'/admin/blogs'}
            className={classes.delete}
          />
        )}
        <Form
          onSubmit={(d: BlogForm) => onSubmit(d, blogId)}
          validate={validate}
          mutators={{
            ...arrayMutators
          }}
          initialValues={
            blogId
              ? {
                  ...initialValues,
                  creationPictureDate: moment(
                    (initialValues as BlogData).creationPictureDate
                  ).format('YYYY-MM-DD')
                }
              : {
                  creationPictureDate: moment().format('YYYY-MM-DD'),
                  parameters: [
                    {
                      localeId: 'ru',
                      name: 'Материал',
                      value: ''
                    },
                    {
                      localeId: 'ru',
                      name: 'Размер',
                      value: ''
                    }
                  ],
                  notifySubscribers: false
                }
          }
          render={({ handleSubmit, pristine, submitting, submitError, form }) => (
            <form
              onSubmit={async event => {
                const error = await handleSubmit(event);
                if (error) {
                  return error;
                }
                if (!blogId) {
                  form.reset();
                } else {
                  form.setConfig('initialValues', form.getState().values);
                }
              }}
              className={classes.form}
            >
              <Snakbars
                variant="error"
                message={submitError}
                className={classes.field}
              />
              <Field
                name="titleCs"
                render={({ input, meta }) => (
                  <TextField
                    id="outlined-name-input"
                    label={'Название блога на чешском'}
                    type="text"
                    name="titleCs"
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
                name="titleEn"
                render={({ input, meta }) => (
                  <TextField
                    id="outlined-name-input"
                    label={'Название блога на английском'}
                    type="text"
                    name="titleEn"
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
                name="titleRu"
                render={({ input, meta }) => (
                  <TextField
                    id="outlined-name-input"
                    label={'Название альбома на русском'}
                    type="text"
                    name="titleRu"
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
                name="topicRu"
                render={({ input, meta }) => (
                  <TextField
                    id="outlined-name-input"
                    label={'Тема блога на русском'}
                    type="text"
                    name="topicRu"
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
                name="topicEn"
                render={({ input, meta }) => (
                  <TextField
                    id="outlined-name-input"
                    label={'Тема блога на английском'}
                    type="text"
                    name="topicEn"
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
                name="topicCs"
                render={({ input, meta }) => (
                  <TextField
                    id="outlined-name-input"
                    label={'Тема блога на чешском'}
                    type="text"
                    name="topicCs"
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
                name="creationPictureDate"
                render={({ input, meta }) => (
                  <TextField
                    id="outlined-name-input"
                    label={'Дата создания картины'}
                    name="creationPictureDate"
                    required
                    variant="outlined"
                    className={classes.field}
                    {...input}
                    type="date"
                    error={Boolean(meta.touched && meta.error)}
                    disabled={submitting}
                  />
                )}
              />
              <FieldArray name="photos">
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
                        onConfirm={fields.push}
                        className={classes.field}
                      />
                      <SortableFactory
                        items={fields}
                        onSortEnd={onSortEnd}
                        lockAxis="y"
                        removeCb={removeCb}
                        lockToContainerEdges
                        useDragHandle
                        transitionDuration={200}
                        textItem={'картина'}
                        typeOfField="photo"
                      />
                    </>
                  );
                }}
              </FieldArray>
              <Field
                name="bodyRu"
                render={({ input, meta }) => (
                  <TextField
                    variant="outlined"
                    label={'Описание картины на русском'}
                    multiline
                    rows="4"
                    className={classes.field}
                    {...input}
                    error={Boolean(meta.touched && meta.error)}
                    helperText={
                      (meta.touched && meta.error) || `${input.value.length}/2000`
                    }
                    disabled={submitting}
                    inputProps={{
                      maxLength: 2000
                    }}
                  />
                )}
              />
              <Field
                name="bodyEn"
                render={({ input, meta }) => (
                  <TextField
                    variant="outlined"
                    label={'Описание картины на английском'}
                    multiline
                    rows="4"
                    className={classes.field}
                    {...input}
                    error={Boolean(meta.touched && meta.error)}
                    helperText={
                      (meta.touched && meta.error) || `${input.value.length}/2000`
                    }
                    disabled={submitting}
                    inputProps={{
                      maxLength: 2000
                    }}
                  />
                )}
              />
              <Field
                name="bodyCs"
                render={({ input, meta }) => (
                  <TextField
                    variant="outlined"
                    label={'Описание картины на чешском'}
                    multiline
                    rows="4"
                    className={classes.field}
                    {...input}
                    error={Boolean(meta.touched && meta.error)}
                    helperText={
                      (meta.touched && meta.error) || `${input.value.length}/2000`
                    }
                    disabled={submitting}
                    inputProps={{
                      maxLength: 2000
                    }}
                  />
                )}
              />
              {!blogId && (
                <>
                  <Field
                    name="notifySubscribers"
                    render={({ input }) => (
                      <FormControlLabel
                        control={
                          <Switch
                            checked={input.value}
                            onChange={input.onChange}
                            value="checkedB"
                            color="primary"
                          />
                        }
                        label={'Уведомить подписчиков о новом блоге'}
                        className={classes.field}
                      />
                    )}
                  />
                  <Field
                    name="socialShare.localeId"
                    render={({ input, meta }) => (
                      <FormControl variant="outlined" className={classes.field}>
                        <InputLabel
                          htmlFor="localeId"
                          ref={inputLabelSLID}
                          style={{ color: theme.palette.primary.main }}
                        >
                          {'Язык для публикации на facebook и instagram'}
                        </InputLabel>
                        <Select
                          {...input}
                          input={
                            <OutlinedInput
                              labelWidth={labelWidthSLID}
                              id="localeId"
                            />
                          }
                          error={Boolean(meta.touched && meta.error)}
                          disabled={submitting}
                        >
                          <MenuItem value={'en'}>{'Английский'}</MenuItem>
                          <MenuItem value={'cs'}>{'Чешский'}</MenuItem>
                          <MenuItem value={'ru'}>{'Русский'}</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                  <Field
                    name="socialShare.photo"
                    render={({ input, meta }) => (
                      <FormControl variant="outlined" className={classes.field}>
                        <InputLabel
                          htmlFor="photo"
                          ref={inputLabelSP}
                          style={{ color: theme.palette.primary.main }}
                        >
                          {'Выбрать картину для публикации на facebook и instagram'}
                        </InputLabel>
                        <Select
                          {...input}
                          input={
                            <OutlinedInput labelWidth={labelWidthSP} id="photo" />
                          }
                          error={Boolean(meta.touched && meta.error)}
                          disabled={
                            submitting ||
                            !getPhotoValues(form.getState().values as BlogData)
                              .length
                          }
                        >
                          {getPhotoValues(form.getState().values as BlogData)}
                        </Select>
                      </FormControl>
                    )}
                  />
                  <Field
                    name="albumId"
                    render={({ input, meta }) => (
                      <FormControl variant="outlined" className={classes.field}>
                        <InputLabel
                          htmlFor="albumId"
                          ref={inputLabelAlbum}
                          style={{ color: theme.palette.primary.main }}
                        >
                          {'Назначить в альбом'}
                        </InputLabel>
                        <Select
                          {...input}
                          input={
                            <OutlinedInput
                              labelWidth={labelWidthAlbum}
                              id="albumId"
                            />
                          }
                          error={Boolean(meta.touched && meta.error)}
                          disabled={submitting || !getAlbums(albums).length}
                        >
                          {getAlbums(albums)}
                        </Select>
                      </FormControl>
                    )}
                  />
                </>
              )}

              <FieldArray name="parameters">
                {({ fields }) => (
                  <div className={classes.field}>
                    <InputLabel style={{ color: '#000', marginBottom: '.5rem' }}>
                      {'Параметры картины'}
                    </InputLabel>
                    {fields.map((name, index) => (
                      <div key={index}>
                        <Field
                          name={`${name}.name`}
                          render={({ input }) => (
                            <TextField
                              label={'Название параметра'}
                              required
                              variant="outlined"
                              {...input}
                              disabled={submitting}
                              className={classes.fieldInArray}
                            />
                          )}
                        />
                        <Field
                          name={`${name}.value`}
                          render={({ input }) => (
                            <TextField
                              label={'Величина параметра'}
                              required
                              variant="outlined"
                              {...input}
                              disabled={submitting}
                              className={classes.fieldInArray}
                            />
                          )}
                        />
                        <Field
                          name={`${name}.localeId`}
                          render={({ input }) => (
                            <FormControl
                              variant="outlined"
                              className={classes.fieldInArray}
                            >
                              <InputLabel
                                htmlFor={`${name}.localeId`}
                                style={{ color: theme.palette.primary.main }}
                              >
                                {'Язык'}
                              </InputLabel>
                              <Select
                                {...input}
                                input={
                                  <OutlinedInput
                                    labelWidth={50}
                                    id={`${name}.localeId`}
                                  />
                                }
                                disabled={submitting}
                              >
                                <MenuItem value={'en'}>{'Английский'}</MenuItem>
                                <MenuItem value={'cs'}>{'Чешский'}</MenuItem>
                                <MenuItem value={'ru'}>{'Русский'}</MenuItem>
                              </Select>
                            </FormControl>
                          )}
                        />
                        <IconButton
                          aria-label="delete"
                          onClick={() => fields.remove(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    ))}

                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() =>
                        fields.push({ name: '', value: '', localeId: '' })
                      }
                      disabled={submitting}
                    >
                      {'Добавить параметер'}
                    </Button>
                  </div>
                )}
              </FieldArray>
              <ButtonsForm
                pristine={pristine}
                submitting={submitting}
                both
                onCancel={form.reset}
                submitLabel={blogId ? 'common:buttons.save' : 'common:buttons.add'}
              />
            </form>
          )}
        />
      </>
    );
  }
);

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
  },
  fieldInArray: {
    margin: '0 1rem .5rem 0'
  },
  delete: {
    margin: '1.3rem auto'
  }
}));
