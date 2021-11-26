import { Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React from 'react';
import { useTranslation } from 'server/lib/i18n';
import { LinkButton } from 'ui/atoms';

export const FinishedOrder = React.memo(() => {
  const { t } = useTranslation('common');
  return (
    <Box margin="1rem">
      <Alert severity="success">Thanks for your order. We will send you an email with order details.</Alert>
      <LinkButton
        variant={'contained'}
        color="primary"
        fullWidth
        href="/"
        label={t('buttons.home')}
        style={{ margin: '.5rem 0 0' }}
      />
    </Box>
  );
});
