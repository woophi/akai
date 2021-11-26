import { Box, FormControlLabel, makeStyles, Paper, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { objKeys } from 'core/lib';
import { getAddressValues, isWithShipAddress } from 'core/selectors';
import React from 'react';
import { useSelector } from 'react-redux';
import { GreenRadio } from 'ui/atoms/GreenRadio';
import { BankDetailsTable } from './BankDetailsTable';
import { ShopBasketPreview } from './ShopBasketPreview';

export const PaymentInfo = React.memo(() => {
  const classes = useStyles();
  const { billAddress = {}, shipAddress = {} } = useSelector(getAddressValues);
  const withShipAddress = useSelector(isWithShipAddress);
  return (
    <Box margin="1rem">
      <Typography variant="h6">Our bank details</Typography>
      <BankDetailsTable />
      <FormControlLabel control={<GreenRadio checked />} label="Direct bank transfer" />
      <Alert severity="warning">
        Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will
        not be shipped until the funds have cleared in our account
      </Alert>
      <br />

      <Typography variant="h6">Order details</Typography>
      <ShopBasketPreview withoutRemove />
      <Box display="flex" flexWrap="wrap">
        <Box marginRight="1rem" marginBottom="1rem">
          <Typography variant="h6">Billing address</Typography>
          <Paper elevation={4} className={classes.paper}>
            {objKeys(billAddress).map(bKey => (
              <Box key={bKey}>
                <b>{billAddress[bKey]}</b>
              </Box>
            ))}
          </Paper>
        </Box>
        {withShipAddress && (
          <Box>
            <Typography variant="h6">Shipping address</Typography>
            <Paper elevation={4} className={classes.paper}>
              {objKeys(shipAddress).map(sKey => (
                <Box key={sKey}>
                  <b>{shipAddress[sKey]}</b>
                </Box>
              ))}
            </Paper>
          </Box>
        )}
      </Box>
    </Box>
  );
});

const useStyles = makeStyles(theme => ({
  paper: {
    padding: '1rem',
  },
}));
