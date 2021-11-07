export type NewUser = {
  email: string;
  name: string;
  password: string;
  role: CreatableRole | string;
};

export type EditUser = {
  _id: string;
  email: string;
  name: string;
  password?: string;
  role: CreatableRole | string;
};

export enum ROLES {
  GODLIKE = 'Godlike',
  ADMIN = 'Admin',
  CUSTOMER = 'Customer',
}

export enum CreatableRole {
  ADMIN = 'Admin',
  CUSTOMER = 'Customer',
}

export type UserModel = {
  createdAt: string;
  email: string;
  name: string;
  roles: ROLES[];
  _id: string;
};
