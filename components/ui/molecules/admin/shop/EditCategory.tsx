import { makeStyles } from '@material-ui/core/styles';
import { LocaleId, ShopCategoryInfo } from 'core/models';
import { adminShopActions } from 'core/reducers/admin/shop';
import { FORM_ERROR } from 'final-form';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'server/lib/i18n';
import { ButtonsForm, Snakbars, TextField } from 'ui/atoms';
import { getShopCategory, updateShopCategory } from './operations';

const validate = (values: ShopCategoryInfo, t: (s: string) => string) => {
  const errors: ShopCategoryInfo = {} as ShopCategoryInfo;

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
  initialValues?: ShopCategoryInfo;
};

export const EditCategory: React.FC<Props> = ({ initialValues }) => {
  const classes = useStyles({});
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const submit = React.useCallback(async (data: ShopCategoryInfo) => {
    try {
      await updateShopCategory({ _id: data._id, name: data.name, shopItems: data.shopItems.map(d => d._id) });
      getShopCategory(data._id).then(d => dispatch(adminShopActions.selectCategory(d)));
    } catch (error) {
      return { [FORM_ERROR]: error.error };
    }
  }, []);

  return (
    <Form
      initialValues={initialValues}
      onSubmit={submit}
      validate={(v: ShopCategoryInfo) => validate(v, t)}
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
                  autoComplete="name"
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
                  autoComplete="name"
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
                  autoComplete="name"
                  required
                  error={Boolean(meta.touched && meta.error)}
                  helperText={meta.touched && meta.error}
                  disabled={submitting}
                />
              )}
            />

            <ButtonsForm pristine={pristine} submitting={submitting} both onCancel={form.reset} submitLabel={'сохранить'} />
          </form>
        </>
      )}
    />
  );
};

const useStyles = makeStyles(theme => ({
  form: {
    margin: '0 auto 2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: '320px',
    maxWidth: '50%',
  },
  selectForm: {
    margin: '1rem',
  },
}));
