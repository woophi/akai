import * as React from 'react';
import { useTranslation } from 'server/lib/i18n';
import { H1, BoxContent } from 'ui/atoms';
import { ResetForm } from './ResetFom';

export const PassResetLayout = React.memo(() => {
  const { t } = useTranslation();
  return (
    <BoxContent>
      <H1 upperCase>{t('login.resetPass')}</H1>
      <ResetForm />
    </BoxContent>
  );
});
