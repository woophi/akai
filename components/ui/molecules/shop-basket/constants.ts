import { CustomerSessionState } from 'core/models';

export const steps = [
  { state: CustomerSessionState.Open, label: 'basket.basket', id: 0 },
  { state: CustomerSessionState.CheckOut, label: 'basket.enterInfo', id: 1 },
  { state: CustomerSessionState.Paid, label: 'basket.payment', id: 2 },
  { state: CustomerSessionState.Ordered, label: 'basket.orderSent', id: 4 },
];

export const bankDetails = {
  bankName: 'Raiffeisenbank a.s.',
  accNumber: '7958186001/5500',
  IBAN: 'CZ7355000000007958186001',
  BIC: 'RZBCCZPP',
};
