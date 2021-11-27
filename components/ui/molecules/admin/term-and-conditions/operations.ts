import { callUserApi } from 'core/common';
import { TermsConditionsData } from 'core/models';

export const getTermsAndConditions = () => callUserApi<TermsConditionsData>('get', 'api/admin/t-and-c');

export const updateTermsAndConditions = (data: TermsConditionsData) => callUserApi('post', 'api/admin/t-and-c', data);
