import * as React from 'react';
import { H1, BoxContent, Spinner, ActionButton } from 'ui/atoms';
import { useTranslation } from 'server/lib/i18n';
import { getUnsubLinkState, guestUnsub } from 'core/operations';
import { UnsubState } from 'core/models';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

type Props = {
  uniqId: string;
};

export const UnsubLayout = React.memo<Props>(({ uniqId }) => {
  const { t } = useTranslation();
  const [unsubState, setUnsubState] = React.useState(UnsubState.FETCHING);
  const [thx, setThx] = React.useState(false);

  React.useEffect(() => {
    setUnsubState(UnsubState.FETCHING);
    getUnsubLinkState(uniqId)
      .then(setUnsubState)
      .catch(setUnsubState);
  }, [uniqId]);

  const unsub = React.useCallback(
    () =>
      guestUnsub(uniqId).finally(() => {
        setThx(true);
      }),
    [uniqId]
  );

  return (
    <BoxContent>
      <H1 upperCase>{t('common:unsub.title')}</H1>
      <Box display="flex" flexDirection="column" margin="1rem auto">
        {unsubState === UnsubState.INVALID && !thx && (
          <Typography variant="h6" gutterBottom>
            {t('common:unsub.invalid')}
          </Typography>
        )}
        {unsubState === UnsubState.VALID && !thx && (
          <>
            <Typography variant="h6" gutterBottom>
              {t('common:unsub.content')}
            </Typography>
            <ActionButton label={t('common:buttons.unsub')} action={unsub} />
          </>
        )}
        {thx && (
          <Typography variant="h6" gutterBottom>
            {t('common:unsub.verySorry')}
          </Typography>
        )}
      </Box>
      <Spinner isShow={unsubState === UnsubState.FETCHING} />
    </BoxContent>
  );
});
