import { makeStyles } from '@material-ui/core/styles';
import { LocaleId, ShopCategoryInfo, ShopCategoryUpdate } from 'core/models';
import { adminShopActions } from 'core/reducers/admin/shop';
import { FORM_ERROR } from 'final-form';
import arrayMutators from 'final-form-arrays';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'server/lib/i18n';
import { ActionButton, ButtonsForm, Snakbars, TextField } from 'ui/atoms';
import { deleteShopCategory, getShopCategory, updateShopCategory } from './operations';
import { ProductItemField } from './ProductItemField';
import { ProductsChooser } from './ProductsChooser';

const validate = (values: ShopCategoryUpdate, t: (s: string) => string) => {
  const errors: ShopCategoryUpdate = {} as ShopCategoryUpdate;

  if (!values.name[LocaleId.Ru]) {
    errors.name[LocaleId.Ru] = t('common:forms.field.required');
  }
  if (!values.name[LocaleId.Cs]) {
    errors.name[LocaleId.Cs] = t('common:forms.field.required');
  }
  if (!values.name[LocaleId.En]) {
    errors.name[LocaleId.En] = t('common:forms.field.required');
  }
  return errors;
};

type Props = {
  initialValues: ShopCategoryInfo;
};

export const EditCategory: React.FC<Props> = ({ initialValues }) => {
  const classes = useStyles({});
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const submit = React.useCallback(async (data: ShopCategoryUpdate) => {
    try {
      await updateShopCategory({ _id: data._id, name: data.name, shopItems: [...new Set(data.shopItems)] });
      getShopCategory(data._id).then(d => dispatch(adminShopActions.selectCategory(d)));
    } catch (error) {
      return { [FORM_ERROR]: error };
    }
  }, []);

  const handleDeleteCategory = React.useCallback(() => {
    return deleteShopCategory(initialValues._id);
  }, [initialValues._id]);

  return (
    <>
      <ActionButton
        action={handleDeleteCategory}
        label={'Удалить категорию'}
        backToUrl={'/admin/shop'}
        className={classes.delete}
      />
      <Form
        initialValues={initialValues}
        mutators={{
          ...arrayMutators,
        }}
        onSubmit={submit}
        validate={(v: ShopCategoryUpdate) => validate(v, t)}
        render={({ handleSubmit, pristine, submitting, submitError, form }) => (
          <>
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
                name={`name.${LocaleId.Ru}`}
                render={({ input, meta }) => (
                  <TextField
                    {...input}
                    label={'Название на русском'}
                    type="text"
                    name="name"
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
                name={`name.${LocaleId.En}`}
                render={({ input, meta }) => (
                  <TextField
                    {...input}
                    label={'Название на английском'}
                    type="text"
                    name="name"
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
                name={`name.${LocaleId.Cs}`}
                render={({ input, meta }) => (
                  <TextField
                    {...input}
                    label={'Название на чешском'}
                    type="text"
                    name="name"
                    margin="normal"
                    variant="outlined"
                    required
                    error={Boolean(meta.touched && meta.error)}
                    helperText={meta.touched && meta.error}
                    disabled={submitting}
                  />
                )}
              />

              <FieldArray name="shopItems">
                {({ fields }) => (
                  <>
                    <ProductsChooser onConfirm={fields.push} />
                    {fields.map((name, index) => (
                      <Field
                        name={`${name}`}
                        key={name}
                        render={({ input }) => <ProductItemField input={input} onRemoveField={() => fields.remove(index)} />}
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
                submitLabel={'сохранить'}
              />
            </form>
          </>
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
  delete: {
    display: 'flex',
    margin: '1.3rem auto',
  },
}));
