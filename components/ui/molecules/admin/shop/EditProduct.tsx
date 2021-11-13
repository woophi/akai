import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { theme } from 'core/lib';
import { LocaleId, ShopItemInfo, ShopItemUpdate } from 'core/models';
import { adminShopActions } from 'core/reducers/admin/shop';
import { FORM_ERROR } from 'final-form';
import arrayMutators from 'final-form-arrays';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { useDispatch } from 'react-redux';
import { SortEndHandler } from 'react-sortable-hoc';
import { useTranslation } from 'server/lib/i18n';
import { ActionButton, ButtonsForm, Snakbars, TextField } from 'ui/atoms';
import { TabPanel } from 'ui/atoms/TabPanel';
import { SortableFactory } from 'ui/molecules';
import { QuillText } from 'ui/molecules/quill-editor';
import { PicturesChooser } from '../blog/PicturesChooser';
import { CategoriesChooser } from './CategoriesChooser';
import { CategoryField } from './CategoryField';
import { deleteShopItem, getShopItem, updateShopItem } from './operations';

const validate = (values: ShopItemUpdate, t: (s: string) => string) => {
  const errors: any = { title: {}, description: {} };

  if (!values.title[LocaleId.Ru]) {
    errors.title[LocaleId.Ru] = t('common:forms.field.required');
  }
  if (!values.title[LocaleId.Cs]) {
    errors.title[LocaleId.Cs] = t('common:forms.field.required');
  }
  if (!values.title[LocaleId.En]) {
    errors.title[LocaleId.En] = t('common:forms.field.required');
  }

  if (!values.description[LocaleId.Ru]) {
    errors.description[LocaleId.Ru] = t('common:forms.field.required');
  }
  if (!values.description[LocaleId.Cs]) {
    errors.description[LocaleId.Cs] = t('common:forms.field.required');
  }
  if (!values.description[LocaleId.En]) {
    errors.description[LocaleId.En] = t('common:forms.field.required');
  }

  if (!values.price) {
    errors.price = t('common:forms.field.required');
  }
  if (!values.stock) {
    errors.stock = t('common:forms.field.required');
  }
  return errors;
};

type Props = {
  initialValues: ShopItemInfo;
};

export const EditProduct: React.FC<Props> = ({ initialValues }) => {
  const classes = useStyles({});
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [tabValue, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const submit = React.useCallback(async (data: ShopItemUpdate) => {
    try {
      await updateShopItem(data);
      getShopItem(data._id).then(d => dispatch(adminShopActions.selectItem(d)));
    } catch (error) {
      return { [FORM_ERROR]: error };
    }
  }, []);

  const handleDeleteItem = React.useCallback(() => {
    return deleteShopItem(initialValues._id);
  }, [initialValues._id]);
  return (
    <>
      <ActionButton
        action={handleDeleteItem}
        label={'Удалить продукт'}
        backToUrl={'/admin/shop'}
        className={classes.delete}
      />
      <Form
        onSubmit={submit}
        initialValues={initialValues}
        mutators={{
          ...arrayMutators,
        }}
        validate={(v: ShopItemUpdate) => validate(v, t)}
        render={({ handleSubmit, pristine, submitting, submitError, form }) => (
          <form
            onSubmit={async event => {
              const error = await handleSubmit(event);
              if (error) {
                return error;
              }
            }}
            className={classes.form}
          >
            <Snakbars
              variant="error"
              message={submitError}
              style={{
                margin: '0 1rem .5rem',
              }}
            />
            <Field
              name={`title.${LocaleId.Ru}`}
              render={({ input, meta }) => (
                <TextField
                  {...input}
                  label={'Заголовок на русском'}
                  type="text"
                  margin="normal"
                  variant="outlined"
                  required
                  error={Boolean(meta.touched && meta.error)}
                  helperText={meta.touched && meta.error}
                  disabled={submitting}
                />
              )}
            />
            <Field
              name={`title.${LocaleId.En}`}
              render={({ input, meta }) => (
                <TextField
                  {...input}
                  label={'Заголовок на английском'}
                  type="text"
                  margin="normal"
                  variant="outlined"
                  required
                  error={Boolean(meta.touched && meta.error)}
                  helperText={meta.touched && meta.error}
                  disabled={submitting}
                />
              )}
            />
            <Field
              name={`title.${LocaleId.Cs}`}
              render={({ input, meta }) => (
                <TextField
                  {...input}
                  label={'Заголовок на чешском'}
                  type="text"
                  margin="normal"
                  variant="outlined"
                  required
                  error={Boolean(meta.touched && meta.error)}
                  helperText={meta.touched && meta.error}
                  disabled={submitting}
                />
              )}
            />

            <Box padding="1rem">
              <Paper elevation={4}>
                <Tabs value={tabValue} onChange={handleChange} indicatorColor="secondary" centered>
                  <Tab label="Редактор" />
                  <Tab label="Предпросмотр" />
                </Tabs>
              </Paper>
            </Box>
            <Field
              name={`description.${LocaleId.Ru}`}
              render={({ input: { onChange, value, onBlur, onFocus }, meta }) => (
                <Box margin="0 1rem 1rem">
                  <TabPanel value={tabValue} index={0}>
                    <QuillText
                      onChange={onChange}
                      value={value}
                      onBlur={onBlur}
                      onFocus={onFocus}
                      ownId={'desc-ru'}
                      placeholder={'Описание на русском'}
                      error={meta.touched && meta.error}
                    />
                  </TabPanel>
                  <TabPanel value={tabValue} index={1}>
                    <Paper>
                      <Box minWidth="50vw" padding="1rem" maxWidth="720px">
                        <Typography component="div" gutterBottom>
                          <div className="quill ">
                            <div className="ql-snow">
                              <div className="ql-editor" dangerouslySetInnerHTML={{ __html: value }} />
                            </div>
                          </div>
                        </Typography>
                      </Box>
                    </Paper>
                  </TabPanel>
                </Box>
              )}
            />
            <Field
              name={`description.${LocaleId.En}`}
              render={({ input: { onChange, value, onBlur, onFocus }, meta }) => (
                <Box margin="0 1rem 1rem">
                  <TabPanel value={tabValue} index={0}>
                    <QuillText
                      onChange={onChange}
                      value={value}
                      onBlur={onBlur}
                      onFocus={onFocus}
                      ownId={'desc-en'}
                      placeholder={'Описание на английском'}
                      error={meta.touched && meta.error}
                    />
                  </TabPanel>
                  <TabPanel value={tabValue} index={1}>
                    <Paper>
                      <Box minWidth="50vw" padding="1rem" maxWidth="720px">
                        <Typography component="div" gutterBottom>
                          <div className="quill ">
                            <div className="ql-snow">
                              <div className="ql-editor" dangerouslySetInnerHTML={{ __html: value }} />
                            </div>
                          </div>
                        </Typography>
                      </Box>
                    </Paper>
                  </TabPanel>
                </Box>
              )}
            />
            <Field
              name={`description.${LocaleId.Cs}`}
              render={({ input: { onChange, value, onBlur, onFocus }, meta }) => (
                <Box margin="0 1rem 1rem">
                  <TabPanel value={tabValue} index={0}>
                    <QuillText
                      onChange={onChange}
                      value={value}
                      onBlur={onBlur}
                      onFocus={onFocus}
                      ownId={'desc-cs'}
                      placeholder={'Описание на чешском'}
                      error={meta.touched && meta.error}
                    />
                  </TabPanel>
                  <TabPanel value={tabValue} index={1}>
                    <Paper>
                      <Box minWidth="50vw" padding="1rem" maxWidth="720px">
                        <Typography component="div" gutterBottom>
                          <div className="quill ">
                            <div className="ql-snow">
                              <div className="ql-editor" dangerouslySetInnerHTML={{ __html: value }} />
                            </div>
                          </div>
                        </Typography>
                      </Box>
                    </Paper>
                  </TabPanel>
                </Box>
              )}
            />

            <Field
              name={`price`}
              render={({ input, meta }) => (
                <TextField
                  {...input}
                  label={'Цена товара'}
                  type="number"
                  margin="normal"
                  variant="outlined"
                  required
                  error={Boolean(meta.touched && meta.error)}
                  helperText={meta.touched && meta.error}
                  disabled={submitting}
                />
              )}
            />
            <Field
              name={`stock`}
              render={({ input, meta }) => (
                <TextField
                  {...input}
                  label={'Количество товара'}
                  type="number"
                  margin="normal"
                  variant="outlined"
                  required
                  error={Boolean(meta.touched && meta.error)}
                  helperText={meta.touched && meta.error}
                  disabled={submitting}
                />
              )}
            />

            <FieldArray name="files">
              {({ fields }) => {
                const onSortEnd: SortEndHandler = ({ oldIndex, newIndex }) => {
                  fields.move(oldIndex, newIndex);
                };
                const removeCb = (index: number) => {
                  fields.remove(index);
                };
                return (
                  <>
                    <PicturesChooser onConfirm={fields.push} />
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
            <FieldArray name="categories">
              {({ fields }) => (
                <>
                  <CategoriesChooser onConfirm={fields.push} />
                  <Box display="flex" padding="0 1rem 1rem">
                    {fields.map((name, index) => (
                      <Field
                        name={`${name}`}
                        key={name}
                        render={({ input }) => <CategoryField input={input} onRemoveField={() => fields.remove(index)} />}
                      />
                    ))}
                  </Box>
                </>
              )}
            </FieldArray>
            <FieldArray name="parameters">
              {({ fields }) => (
                <Box margin="0 1rem 1rem">
                  <InputLabel style={{ color: '#000', marginBottom: '.5rem' }}>{'Параметры товара'}</InputLabel>
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
                          <FormControl variant="outlined" className={classes.fieldInArray}>
                            <InputLabel htmlFor={`${name}.localeId`} style={{ color: theme.palette.primary.main }}>
                              {'Язык'}
                            </InputLabel>
                            <Select
                              {...input}
                              input={<OutlinedInput labelWidth={50} id={`${name}.localeId`} />}
                              disabled={submitting}
                            >
                              <MenuItem value={LocaleId.En}>{'Английский'}</MenuItem>
                              <MenuItem value={LocaleId.Cs}>{'Чешский'}</MenuItem>
                              <MenuItem value={LocaleId.Ru}>{'Русский'}</MenuItem>
                            </Select>
                          </FormControl>
                        )}
                      />
                      <IconButton aria-label="delete" onClick={() => fields.remove(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ))}

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => fields.push({ name: '', value: '', localeId: '' })}
                    disabled={submitting}
                  >
                    {'Добавить параметер'}
                  </Button>
                </Box>
              )}
            </FieldArray>

            <ButtonsForm pristine={pristine} submitting={submitting} both onCancel={form.reset} submitLabel={'сохранить'} />
          </form>
        )}
      />
    </>
  );
};

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
  fieldInArray: {
    margin: '0 1rem .5rem 0',
  },
  delete: {
    display: 'flex',
    margin: '1.3rem auto',
  },
}));
