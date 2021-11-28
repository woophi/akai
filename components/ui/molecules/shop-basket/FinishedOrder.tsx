import { Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { CustomerSessionState } from 'core/models';
import { shopActions } from 'core/reducers/shop';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'server/lib/i18n';
import { LinkButton } from 'ui/atoms';

export const FinishedOrder = React.memo(() => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();

  const resetSteps = React.useCallback(() => {
    dispatch(shopActions.changeSessionState(CustomerSessionState.Open));
  }, []);

  React.useEffect(() => {
    return () => {
      resetSteps();
    };
  }, []);

  return (
    <Box margin="1rem">
      <Alert severity="success">{t('basket.finished')}</Alert>
      <LinkButton
        variant="contained"
        color="primary"
        fullWidth
        href="/"
        label={t('buttons.home')}
        style={{ margin: '.5rem 0 0' }}
        onClick={resetSteps}
      />
    </Box>
  );
});
