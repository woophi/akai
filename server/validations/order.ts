import Joi from 'joi';

const shipAddressJoi = Joi.object({
  name: Joi.string().required(),
  lastName: Joi.string().required(),
  country: Joi.string().required(),
  streetAddress: Joi.string().required(),
  city: Joi.string().required(),
  postcode: Joi.string().required(),
  companyName: Joi.string().empty(''),
});
const billAddressJoi = shipAddressJoi.append({
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
});

export const validateShopOrderBase = Joi.object({
  paidShipping: Joi.boolean().required(),
  notes: Joi.string().empty(''),
  total: Joi.number().required(),
  shipAddress: shipAddressJoi.allow(null),
  billAddress: billAddressJoi.required(),
});

export const updateShopOrderValidate = validateShopOrderBase.append({
  orderId: Joi.number().required(),
});
