import * as React from 'react';
import { H1, BoxContent } from 'ui/atoms';
import { ResetForm } from './ResetFom';

export const PassResetLayout = React.memo(() => {
  return (
    <BoxContent>
      <H1 upperCase>{'Восстановить пароль'}</H1>
      <ResetForm />
    </BoxContent>
  );
});
