import { callApi } from 'core/common';

export const register = <T>(data: T) => callApi('post', 'api/app/user/register', data);
