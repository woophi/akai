import { testEmail } from 'core/lib';
import { AddressFormModel } from 'core/models';

export const validate = (values: AddressFormModel, t: (s: string) => string, withShipAdd: boolean) => {
  const errors: Partial<AddressFormModel> = {
    billAddress: {} as AddressFormModel['billAddress'],
    shipAddress: {} as AddressFormModel['shipAddress'],
  };
  if (!values.tandcConfirm) {
    errors.tandcConfirm = t('forms.field.required') as any;
  }

  if (!values.billAddress || !errors.billAddress) return errors;

  if (!values.billAddress.name) {
    errors.billAddress.name = t('forms.field.required');
  }
  if (!values.billAddress.lastName) {
    errors.billAddress.lastName = t('forms.field.required');
  }
  if (!values.billAddress.country) {
    errors.billAddress.country = t('forms.field.required');
  }
  if (!values.billAddress.phone) {
    errors.billAddress.phone = t('forms.field.required');
  }
  if (!values.billAddress.email) {
    errors.billAddress.email = t('forms.field.required');
  }
  if (!values.billAddress.postcode) {
    errors.billAddress.postcode = t('forms.field.required');
  }
  if (!values.billAddress.streetAddress) {
    errors.billAddress.streetAddress = t('forms.field.required');
  }
  if (!values.billAddress.city) {
    errors.billAddress.city = t('forms.field.required');
  }
  if (values.billAddress.email && !testEmail.test(values.billAddress.email.toLowerCase())) {
    errors.billAddress.email = t('forms.field.checkFormat');
  }

  if (!withShipAdd || !values.shipAddress) return errors;
  if (!errors.shipAddress) return errors;

  if (!values.shipAddress.name) {
    errors.shipAddress.name = t('forms.field.required');
  }
  if (!values.shipAddress.lastName) {
    errors.shipAddress.lastName = t('forms.field.required');
  }
  if (!values.shipAddress.country) {
    errors.shipAddress.country = t('forms.field.required');
  }
  if (!values.shipAddress.postcode) {
    errors.shipAddress.postcode = t('forms.field.required');
  }
  if (!values.shipAddress.streetAddress) {
    errors.shipAddress.streetAddress = t('forms.field.required');
  }
  if (!values.shipAddress.city) {
    errors.shipAddress.city = t('forms.field.required');
  }

  return errors;
};
