import { LocaleId, ShopItemParameterTypeOf } from 'core/models';

export const defaultValues = {
  title: {},
  description: {},
  files: [],
  categories: [],
  parameters: [
    {
      localeId: LocaleId.Ru,
      name: 'Размер',
      value: '',
      typeOf: ShopItemParameterTypeOf.Size,
    },
    {
      localeId: LocaleId.En,
      name: 'Size',
      value: '',
      typeOf: ShopItemParameterTypeOf.Size,
    },
    {
      localeId: LocaleId.Cs,
      name: 'Velikost',
      value: '',
      typeOf: ShopItemParameterTypeOf.Size,
    },
    {
      localeId: LocaleId.Ru,
      name: 'Доставка',
      value: '',
      typeOf: ShopItemParameterTypeOf.Delivery,
    },
    {
      localeId: LocaleId.En,
      name: 'Delivery',
      value: '',
      typeOf: ShopItemParameterTypeOf.Delivery,
    },
    {
      localeId: LocaleId.Cs,
      name: 'Doručení',
      value: '',
      typeOf: ShopItemParameterTypeOf.Delivery,
    },
  ],
};
