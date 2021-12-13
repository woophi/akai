export enum ROLES {
  GODLIKE = 'Godlike',
  ADMIN = 'Admin',
  CUSTOMER = 'Customer',
}

export type Claims = {
  id?: string;
  roles?: Array<ROLES>;
};

export const oneDay = 86400;
export const tenDays = '10d';

export const dayInMS = 24 * 60 * 60 * 1000;
