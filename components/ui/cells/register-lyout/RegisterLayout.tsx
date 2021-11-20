import * as React from 'react';
import { useTranslation } from 'server/lib/i18n';
import { BoxContent, H1 } from 'ui/atoms';
import { RegisterForm } from './RegisterForm';

export const RegisterLayout = React.memo(() => {
  const { t } = useTranslation('common');
  return (
    <BoxContent>
      <H1 upperCase>{t('register.title')}</H1>
      <RegisterForm />
    </BoxContent>
  );
});
