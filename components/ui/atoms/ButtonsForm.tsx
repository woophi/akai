import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useTranslation } from 'server/lib/i18n';

type Props = {
  pristine: boolean;
  submitting: boolean;
  both?: boolean;
  onCancel?: () => void
  submitLabel?: string;
}

export const ButtonsForm = React.memo<Props>(({
  pristine, submitting, both = false, onCancel, submitLabel
}) => {
  const classes = useStyles({});
  const { t } = useTranslation();
  return (
    <div className={classes.button}>
      {both &&
        <Button
          disabled={pristine || submitting}
          variant={'contained'}
          color="default"
          className={classes.cncl}
          onClick={onCancel}
        >
          {t('common:buttons.cancel')}
        </Button>
      }

      <Button
        type="submit"
        disabled={pristine || submitting}
        variant={'contained'}
        color="primary"
        className={classes.sbm}
      >
        {t(submitLabel || 'common:buttons.send')}
      </Button>
      {submitting &&
        <Icon
          className={`fas fa-circle-notch fa-spin`}
          color="primary"
        />
      }
    </div>
  );
});

const useStyles = makeStyles(theme => ({
  button: {
    margin: '0 auto 1rem',
    color: theme.palette.text.secondary
  },
  sbm: {
    color: theme.palette.text.secondary
  },
  cncl: {
    marginRight: '1rem'
  }
}));
