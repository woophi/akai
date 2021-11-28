import {
  Button,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormHelperText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { Alert } from '@material-ui/lab';
import { AddressFormModel } from 'core/models';
import { createShopOrder } from 'core/operations';
import { shopActions } from 'core/reducers/shop';
import { createShopOrderValues, getAddressValues, getOrderId, isWithShipAddress } from 'core/selectors';
import { FORM_ERROR } from 'final-form';
import Link from 'next/link';
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'server/lib/i18n';
import { Snakbars } from 'ui/atoms';
import { TextField } from 'ui/atoms/TextField';
import { steps } from './constants';
import { validate } from './operations';

export const AddressForm = React.memo<{ setActiveStep: React.Dispatch<React.SetStateAction<number>> }>(
  ({ setActiveStep }) => {
    const intialValues = useSelector(getAddressValues);
    const orderValues = useSelector(createShopOrderValues);
    const orderId = useSelector(getOrderId);
    const checkedWithShipAdd = useSelector(isWithShipAddress);

    const { t } = useTranslation('common');
    const classes = useStyles();
    const dispatch = useDispatch();

    const handleChangeWithShipAdd = (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(shopActions.changeWithShipAddress(event.target.checked));
    };

    const handleNext = () => {
      setActiveStep(prevActiveStep => {
        const nextStep = prevActiveStep + 1;
        dispatch(shopActions.changeSessionState(steps[nextStep].state));
        return nextStep;
      });
    };

    const handleBack = () => {
      setActiveStep(prevActiveStep => {
        const prevStep = prevActiveStep - 1;
        dispatch(shopActions.changeSessionState(steps[prevStep].state));
        return prevStep;
      });
    };

    const onSubmit = React.useCallback(
      async (data: AddressFormModel) => {
        try {
          if (!orderId) {
            const res = await createShopOrder({
              ...orderValues,
              shipAddress: data.shipAddress ?? null,
              billAddress: data.billAddress,
              notes: data.notes,
            });
            dispatch(shopActions.setAddress({ ...data, orderId: res.orderId }));
          } else {
            dispatch(shopActions.setAddress({ ...data, orderId }));
          }

          handleNext();
        } catch (error) {
          return { [FORM_ERROR]: JSON.stringify(error) };
        }
      },
      [orderValues, orderId]
    );

    return (
      <>
        <Box margin="0 1rem 1rem">
          <Typography variant="subtitle1">{t('basket.billDetails')}</Typography>
        </Box>
        <Form
          onSubmit={onSubmit}
          validate={v => validate(v, t, checkedWithShipAdd)}
          initialValues={intialValues}
          render={({ handleSubmit, submitting, submitError }) => (
            <>
              <Box
                onSubmit={async event => {
                  const error = await handleSubmit(event);
                  if (error) {
                    return error;
                  }
                }}
                component="form"
              >
                <Snakbars variant="error" message={submitError} />
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

                <FormControlLabel
                  control={<Checkbox checked={checkedWithShipAdd} onChange={handleChangeWithShipAdd} color="primary" />}
                  label={t('basket.shipTo')}
                  className={classes.m1X}
                />
                <Collapse in={checkedWithShipAdd} unmountOnExit mountOnEnter>
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
                      placeholder={t('form.notesPlaceholder')}
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
                <Box marginX="1rem">
                  <Alert severity="warning">
                    {t('basket.ppWarn')}{' '}
                    <Link href="/privacy-policy">
                      <a>{t('basket.ppWarnPolicy')}</a>
                    </Link>
                  </Alert>
                </Box>

                <Field
                  name="tandcConfirm"
                  render={({ input, meta }) => (
                    <FormControl
                      required
                      error={Boolean(meta.touched && meta.error)}
                      component="fieldset"
                      className={classes.fieldSet}
                    >
                      <FormControlLabel
                        control={<Checkbox {...input} checked={!!input.value} color="primary" />}
                        label={
                          <>
                            {t('basket.readTandC')}{' '}
                            <Link href="/terms-and-conditions">
                              <a> {t('basket.TandC')}</a>
                            </Link>
                          </>
                        }
                      />
                      {meta.touched && meta.error && <FormHelperText>{meta.error}</FormHelperText>}
                    </FormControl>
                  )}
                />

                <div>
                  <Button onClick={handleBack}>{t('buttons.back')}</Button>
                  <Button type="submit" variant="contained" color="primary">
                    {t('buttons.next')}
                  </Button>
                </div>
              </Box>
            </>
          )}
        />
      </>
    );
  }
);

const useStyles = makeStyles(theme => ({
  m1X: {
    margin: '0 .5rem 1rem',
    display: 'flex',
    width: 'fit-content',
  },
  fieldSet: {
    margin: '0 1rem',
  },
}));
