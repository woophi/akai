import { Box, FormControl, FormControlLabel, FormLabel, makeStyles, RadioGroup } from '@material-ui/core';
import { useAppSelector } from 'core/reducers/rootReducer';
import { shopActions } from 'core/reducers/shop';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'server/lib/i18n';
import { GreenRadio } from 'ui/atoms/GreenRadio';

export const ShippingForm = React.memo(() => {
  const paidShipping = useAppSelector(s => s.ui.shop.paidShipping);
  const classes = useStyles();
  const { t } = useTranslation('common');

  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = event.target.value;
    dispatch(shopActions.changeShipping(v === 'p'));
  };

  return (
    <Box marginBottom=".5rem">
      <FormControl component="fieldset">
        <FormLabel component="legend" className={classes.legend}>
          {t('basket.shipping')}
        </FormLabel>
        <RadioGroup aria-label="shipping" name="shipping" value={paidShipping ? 'p' : 'f'} onChange={handleChange}>
          <FormControlLabel value="f" control={<GreenRadio />} label={t('basket.freeShip')} />
          <FormControlLabel value="p" control={<GreenRadio />} label={t('basket.paidShip', { price: '$200.00' })} />
        </RadioGroup>
      </FormControl>
    </Box>
  );
});

const useStyles = makeStyles(theme => ({
  legend: {
    color: `${theme.palette.common.black} !important`,
  },
}));
