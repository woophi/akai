export const enum ROLES {
	GODLIKE = 'Godlike',
	ADMIN = 'Admin'
};

export type Claims = {
  id?: string;
  roles?: Array<ROLES>
}

export const oneDay = 86400;
export const tenDays = '10d';
