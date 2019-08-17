import * as React from 'react';
import { H1, BoxContent, LinkButton } from 'ui/atoms';
import { LoginForm } from './LoginForm';
import { useTranslation } from 'server/lib/i18n';
import Box from '@material-ui/core/Box';

export const LoginLayout = React.memo(() => {
  const { t } = useTranslation();
  return (
    <BoxContent>
      <H1 upperCase>{t('common:login.title')}</H1>
      <Box margin="0 auto">
        <LinkButton href="/password/reset" label="Восстановить пароль" />
      </Box>
      <LoginForm />
    </BoxContent>
  );
});
