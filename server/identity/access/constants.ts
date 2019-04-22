export const enum ROLES {
	GODLIKE = 'Godlike',
	ADMIN = 'Admin'
};

export type Claims = {
  id?: string;
  roles?: Array<ROLES>
}
