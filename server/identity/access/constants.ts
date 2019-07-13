export enum ROLES {
	GODLIKE = 'Godlike',
	ADMIN = 'Admin'
};

export type Claims = {
  id?: string;
  roles?: Array<ROLES>
}

export const oneDay = 86400;
export const tenDays = '10d';

export const tenDaysInMS = 10 * 24 * 60 * 60 * 1000;
