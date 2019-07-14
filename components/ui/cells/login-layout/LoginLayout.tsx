import * as React from 'react';
import { H1, BoxContent } from 'ui/atoms';
import { LoginForm } from './LoginForm';
import { useTranslation } from 'server/lib/i18n';

export const LoginLayout = React.memo(() => {
  const { t } = useTranslation();
  return (
    <BoxContent>
      <H1 upperCase>{t('common:login.title')}</H1>
      <LoginForm />
    </BoxContent>
  );
});
