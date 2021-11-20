import { createSelector } from 'reselect';
import { selectState } from './common';
import { AuthData, ROLES } from 'core/models';

export const getUser = createSelector(selectState, ui => ui.user || ({} as AuthData));
export const getUserToken = createSelector(getUser, user => user.token);
export const getUserRoles = createSelector(getUser, user => user.roles);
export const getUserId = createSelector(getUser, user => user.userId);
export const getUserName = createSelector(getUser, user => user.name);
export const isUserCustomer = createSelector(getUserRoles, roles => roles.indexOf(ROLES.CUSTOMER) !== -1);
export const hasRoleAdmin = createSelector(getUserRoles, roles => roles.indexOf(ROLES.ADMIN) !== -1);
export const hasRoleSuperAdmin = createSelector(getUserRoles, roles => roles.indexOf(ROLES.GODLIKE) !== -1);
export const isAdmin = createSelector(hasRoleAdmin, hasRoleSuperAdmin, (admin, superAdmin) => admin || superAdmin);
export const getUserFetching = createSelector(getUser, user => !!user.fetching);
