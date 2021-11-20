import { callUserApi } from 'core/common';
import { ProfileFormModel } from 'core/models';

export const updateUserProfile = (data: Omit<ProfileFormModel, 'userId'>) => callUserApi('put', 'api/app/user/me', data);
