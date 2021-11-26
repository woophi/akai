import { CustomerSessionState } from 'core/models';

export const steps = [
  { state: CustomerSessionState.Open, label: 'Корзина', id: 0 },
  { state: CustomerSessionState.CheckOut, label: 'Заполнение данных', id: 1 },
  { state: CustomerSessionState.Paid, label: 'Оплата', id: 2 },
  { state: CustomerSessionState.Ordered, label: 'Заказ отправлен', id: 4 },
];
