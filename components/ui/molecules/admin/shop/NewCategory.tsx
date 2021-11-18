import { makeStyles } from '@material-ui/core/styles';
import { goToSpecific } from 'core/common';
import { LocaleId, ShopCategorySave } from 'core/models';
import { FORM_ERROR } from 'final-form';
import arrayMutators from 'final-form-arrays';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { FieldArray } from 'react-final-form-arrays';
import { useTranslation } from 'server/lib/i18n';
import { ButtonsForm, Snakbars, TextField } from 'ui/atoms';
import { createShopCategory } from './operations';
import { ProductItemField } from './ProductItemField';
import { ProductsChooser } from './ProductsChooser';

const validate = (values: ShopCategorySave, t: (s: string) => string) => {
  const errors: ShopCategorySave = { name: {} } as ShopCategorySave;

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

export const NewCategory: React.FC = () => {
  const classes = useStyles({});
  const { t } = useTranslation();

  const submit = React.useCallback(async (data: ShopCategorySave) => {
    try {
      await createShopCategory({ ...data, shopItems: [...new Set(data.shopItems)] });
      goToSpecific('/admin/shop');
    } catch (error) {
      return { [FORM_ERROR]: error };
    }
  }, []);

  return (
    <Form
      onSubmit={submit}
      initialValues={{ name: {}, shopItems: [] }}
      mutators={{
        ...arrayMutators,
      }}
      validate={(v: ShopCategorySave) => validate(v, t)}
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

            <ButtonsForm pristine={pristine} submitting={submitting} both onCancel={form.reset} submitLabel={'сохранить'} />
          </form>
        </>
      )}
    />
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
}));
