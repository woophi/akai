import {
  Collapse,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  makeStyles,
  MenuItem,
  OutlinedInput,
  RadioGroup,
  Select,
  Typography,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { numberWithCommas, theme } from 'core/lib';
import { ShopOrderForm, ShopOrderState } from 'core/models';
import { adminShopActions } from 'core/reducers/admin/shop';
import { FORM_ERROR } from 'final-form';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'server/lib/i18n';
import { ButtonsForm, Snakbars } from 'ui/atoms';
import { GreenRadio } from 'ui/atoms/GreenRadio';
import { TextField } from 'ui/atoms/TextField';
import { getOrder, updateOrder, validate } from './operations';

export const EditOrder = React.memo<{ initialValues: ShopOrderForm }>(({ initialValues }) => {
  const { t } = useTranslation('common');
  const classes = useStyles();
  const dispatch = useDispatch();

  const onSubmit = React.useCallback(async (data: ShopOrderForm) => {
    try {
      await updateOrder({
        orderId: data.orderId,
        orderState: data.orderState,
        paidShipping: data.paidShipping,
        refundReason: data.refundReason,
        total: data.total,
        billAddress: data.billAddress,
        notes: data.notes,
        shipAddress: data.shipAddress,
      });
      getOrder(data.orderId)
        .then(o => dispatch(adminShopActions.selectOrder(o)))
        .catch(console.error);
    } catch (error) {
      return { [FORM_ERROR]: JSON.stringify(error) };
    }
  }, []);

  return (
    <>
      <Form
        onSubmit={onSubmit}
        validate={v => validate(v, t)}
        initialValues={initialValues}
        render={({ handleSubmit, pristine, submitting, submitError, form, values }) => (
          <>
            <Box margin="0 1rem 1rem">
              <Typography variant="h6">
                Сумма: <b>${numberWithCommas(values.total)}</b>
              </Typography>
            </Box>
            <Box
              onSubmit={async event => {
                const error = await handleSubmit(event);
                if (error) {
                  return error;
                }
                form.change;
              }}
              component="form"
            >
              <Snakbars
                variant="error"
                message={submitError}
                style={{
                  margin: '0 1rem .5rem',
                }}
              />

              <Box margin="1rem">
                <FormControl component="fieldset">
                  <FormLabel component="legend" className={classes.legend}>
                    {t('basket.shipping')}
                  </FormLabel>
                  <RadioGroup
                    aria-label="shipping"
                    value={values.paidShipping ? 't' : 'f'}
                    onChange={v => {
                      const paid = v.target.value === 't';
                      form.change('paidShipping', paid);
                      form.change('total', paid ? values.total + 200 : values.total - 200);
                    }}
                  >
                    <FormControlLabel value="f" control={<GreenRadio />} label={t('basket.freeShip')} />
                    <FormControlLabel
                      value="t"
                      control={<GreenRadio />}
                      label={t('basket.paidShip', { price: '$200.00' })}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>

              <Field
                name="orderState"
                render={({ input, meta }) => (
                  <FormControl variant="outlined" error={Boolean(meta.touched && meta.error)} className={classes.selectForm}>
                    <InputLabel htmlFor="orderState" style={{ color: theme.palette.primary.main }}>
                      {'Состояние заказа'}
                    </InputLabel>
                    <Select {...input} input={<OutlinedInput labelWidth={140} id="orderState" />} disabled={submitting}>
                      <MenuItem disabled value={ShopOrderState.Open}>
                        {'Открыт'}
                      </MenuItem>
                      <MenuItem value={ShopOrderState.Ordered}>{'В ожидании оплаты'}</MenuItem>
                      <MenuItem value={ShopOrderState.Paid}>{'Оплачен и готов к отправке'}</MenuItem>
                      <MenuItem value={ShopOrderState.Shipping}>{'В доставке'}</MenuItem>
                      <MenuItem value={ShopOrderState.Shipped}>{'Доставлен'}</MenuItem>
                      <MenuItem value={ShopOrderState.Refund}>{'Вернули'}</MenuItem>
                    </Select>
                    {meta.touched && <FormHelperText>{meta.error}</FormHelperText>}
                  </FormControl>
                )}
              />

              <Collapse in={values.orderState === ShopOrderState.Refund} unmountOnExit mountOnEnter>
                <Field
                  name="refundReason"
                  render={({ input, meta }) => (
                    <TextField
                      {...input}
                      variant="outlined"
                      label={'Причина возврата'}
                      multiline
                      rows="4"
                      error={Boolean(meta.touched && meta.error)}
                      helperText={(meta.touched && meta.error) || `${input.value.length}/256`}
                      disabled={submitting}
                      inputProps={{
                        maxLength: 256,
                      }}
                    />
                  )}
                />
              </Collapse>

              <Box margin="0 1rem 1rem">
                <Typography variant="subtitle1">{t('basket.billDetails')}</Typography>
              </Box>
              <Field
                name="billAddress.email"
                render={({ input, meta }) => (
                  <TextField
                    {...input}
                    label={t('forms.email')}
                    type="text"
                    margin="normal"
                    variant="outlined"
                    autoComplete="email"
                    required
                    error={Boolean(meta.touched && meta.error)}
                    helperText={meta.touched && meta.error}
                    disabled={submitting}
                  />
                )}
              />
              <Field
                name="billAddress.phone"
                render={({ input, meta }) => (
                  <TextField
                    {...input}
                    label={t('forms.phone')}
                    type="text"
                    margin="normal"
                    variant="outlined"
                    autoComplete="tel"
                    required
                    error={Boolean(meta.touched && meta.error)}
                    helperText={meta.touched && meta.error}
                    disabled={submitting}
                  />
                )}
              />
              <Field
                name="billAddress.name"
                render={({ input, meta }) => (
                  <TextField
                    {...input}
                    label={t('forms.name')}
                    type="text"
                    margin="normal"
                    variant="outlined"
                    autoComplete="given-name"
                    required
                    error={Boolean(meta.touched && meta.error)}
                    helperText={meta.touched && meta.error}
                    disabled={submitting}
                  />
                )}
              />
              <Field
                name="billAddress.lastName"
                render={({ input, meta }) => (
                  <TextField
                    {...input}
                    label={t('forms.lastName')}
                    type="text"
                    margin="normal"
                    variant="outlined"
                    required
                    autoComplete="family-name"
                    error={Boolean(meta.touched && meta.error)}
                    helperText={meta.touched && meta.error}
                    disabled={submitting}
                  />
                )}
              />
              <Field
                name="billAddress.companyName"
                render={({ input, meta }) => (
                  <TextField
                    {...input}
                    label={t('forms.company')}
                    type="text"
                    margin="normal"
                    variant="outlined"
                    autoComplete="organization"
                    error={Boolean(meta.touched && meta.error)}
                    helperText={meta.touched && meta.error}
                    disabled={submitting}
                  />
                )}
              />
              <Field
                name="billAddress.country"
                render={({ input, meta }) => (
                  <TextField
                    {...input}
                    label={t('forms.country')}
                    type="text"
                    margin="normal"
                    variant="outlined"
                    autoComplete="country-name"
                    error={Boolean(meta.touched && meta.error)}
                    helperText={meta.touched && meta.error}
                    disabled={submitting}
                  />
                )}
              />
              <Field
                name="billAddress.streetAddress"
                render={({ input, meta }) => (
                  <TextField
                    {...input}
                    label={t('forms.streetAddress')}
                    type="text"
                    margin="normal"
                    variant="outlined"
                    autoComplete="street-address"
                    error={Boolean(meta.touched && meta.error)}
                    helperText={meta.touched && meta.error}
                    disabled={submitting}
                  />
                )}
              />
              <Field
                name="billAddress.city"
                render={({ input, meta }) => (
                  <TextField
                    {...input}
                    label={t('forms.city')}
                    type="text"
                    margin="normal"
                    variant="outlined"
                    autoComplete="address-level2"
                    error={Boolean(meta.touched && meta.error)}
                    helperText={meta.touched && meta.error}
                    disabled={submitting}
                  />
                )}
              />
              <Field
                name="billAddress.postcode"
                render={({ input, meta }) => (
                  <TextField
                    {...input}
                    label={t('forms.postcode')}
                    type="text"
                    margin="normal"
                    variant="outlined"
                    autoComplete="postal-code"
                    error={Boolean(meta.touched && meta.error)}
                    helperText={meta.touched && meta.error}
                    disabled={submitting}
                  />
                )}
              />

              <Collapse in={!!values.shipAddress} unmountOnExit mountOnEnter>
                <Box margin="0 1rem 1rem">
                  <Typography variant="subtitle1">Shipping details</Typography>
                </Box>
                <Field
                  name="shipAddress.name"
                  render={({ input, meta }) => (
                    <TextField
                      {...input}
                      label={t('forms.name')}
                      type="text"
                      margin="normal"
                      variant="outlined"
                      autoComplete="given-name"
                      required
                      error={Boolean(meta.touched && meta.error)}
                      helperText={meta.touched && meta.error}
                      disabled={submitting}
                    />
                  )}
                />
                <Field
                  name="shipAddress.lastName"
                  render={({ input, meta }) => (
                    <TextField
                      {...input}
                      label={t('forms.lastName')}
                      type="text"
                      margin="normal"
                      variant="outlined"
                      required
                      autoComplete="family-name"
                      error={Boolean(meta.touched && meta.error)}
                      helperText={meta.touched && meta.error}
                      disabled={submitting}
                    />
                  )}
                />
                <Field
                  name="shipAddress.companyName"
                  render={({ input, meta }) => (
                    <TextField
                      {...input}
                      label={t('forms.company')}
                      type="text"
                      margin="normal"
                      variant="outlined"
                      autoComplete="organization"
                      error={Boolean(meta.touched && meta.error)}
                      helperText={meta.touched && meta.error}
                      disabled={submitting}
                    />
                  )}
                />
                <Field
                  name="shipAddress.country"
                  render={({ input, meta }) => (
                    <TextField
                      {...input}
                      label={t('forms.country')}
                      type="text"
                      margin="normal"
                      variant="outlined"
                      autoComplete="country-name"
                      error={Boolean(meta.touched && meta.error)}
                      helperText={meta.touched && meta.error}
                      disabled={submitting}
                    />
                  )}
                />
                <Field
                  name="shipAddress.streetAddress"
                  render={({ input, meta }) => (
                    <TextField
                      {...input}
                      label={t('forms.streetAddress')}
                      type="text"
                      margin="normal"
                      variant="outlined"
                      autoComplete="street-address"
                      error={Boolean(meta.touched && meta.error)}
                      helperText={meta.touched && meta.error}
                      disabled={submitting}
                    />
                  )}
                />
                <Field
                  name="shipAddress.city"
                  render={({ input, meta }) => (
                    <TextField
                      {...input}
                      label={t('forms.city')}
                      type="text"
                      margin="normal"
                      variant="outlined"
                      autoComplete="address-level2"
                      error={Boolean(meta.touched && meta.error)}
                      helperText={meta.touched && meta.error}
                      disabled={submitting}
                    />
                  )}
                />
                <Field
                  name="shipAddress.postcode"
                  render={({ input, meta }) => (
                    <TextField
                      {...input}
                      label={t('forms.postcode')}
                      type="text"
                      margin="normal"
                      variant="outlined"
                      autoComplete="postal-code"
                      error={Boolean(meta.touched && meta.error)}
                      helperText={meta.touched && meta.error}
                      disabled={submitting}
                    />
                  )}
                />
              </Collapse>

              <Field
                name="notes"
                render={({ input, meta }) => (
                  <TextField
                    {...input}
                    variant="outlined"
                    label={t('forms.notes')}
                    placeholder={t('forms.notesPlaceholder')}
                    multiline
                    rows="4"
                    error={Boolean(meta.touched && meta.error)}
                    helperText={(meta.touched && meta.error) || `${input.value.length}/256`}
                    disabled={submitting}
                    inputProps={{
                      maxLength: 256,
                    }}
                  />
                )}
              />

              <Box margin="1rem" display="flex">
                <ButtonsForm
                  pristine={pristine}
                  submitting={submitting}
                  both
                  onCancel={form.reset}
                  submitLabel={'сохранить'}
                />
              </Box>
            </Box>
          </>
        )}
      />
    </>
  );
});

const useStyles = makeStyles(theme => ({
  fieldSet: {
    margin: '0 1rem',
  },
  legend: {
    color: `${theme.palette.common.black} !important`,
  },
  selectForm: {
    margin: '1rem',
    minWidth: '200px',
  },
}));
