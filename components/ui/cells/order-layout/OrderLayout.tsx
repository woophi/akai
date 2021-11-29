import { Box, Card, CardActionArea, makeStyles, Paper, Typography, useMediaQuery } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { goToSpecific } from 'core/common';
import { numberWithCommas, objKeys } from 'core/lib/utils';
import { ShopOrderModel } from 'core/models';
import React from 'react';
import { useTranslation } from 'server/lib/i18n';
import { BankDetailsTable } from 'ui/molecules/shop-basket/BankDetailsTable';
import { OrderState } from './OrderState';

const openProduct = (href: string) => {
  goToSpecific(`/product/${href}`);
};

export const OrderLayout = React.memo<{ data: ShopOrderModel }>(({ data }) => {
  const { t } = useTranslation('common');
  const isSmallEnough = useMediaQuery('(max-width:800px)');
  const classes = useStyles();

  return (
    <Box padding="1rem" minWidth="320px">
      <Box
        display="grid"
        gridTemplateColumns={isSmallEnough ? '1fr' : '1fr 1fr 1fr 1fr'}
        gridTemplateRows={isSmallEnough ? '1fr 1fr 1fr' : undefined}
        style={{ gap: '1rem' }}
        marginBottom="1rem"
      >
        {data.items.map(cI => (
          <Card key={cI.id} className={classes.card}>
            <CardActionArea className={classes.cardAction} onClick={() => openProduct(cI.href)}>
              <Box width="75px" minWidth="75px" height="75px">
                <img src={cI.url} className={classes.img} />
              </Box>
              <Box paddingY=".25rem" paddingX="1rem" width="250px">
                <Typography variant="body1" noWrap gutterBottom>
                  {cI.title}
                </Typography>
                <b>${numberWithCommas(cI.price)}</b>
              </Box>
            </CardActionArea>
          </Card>
        ))}
      </Box>
      <Typography variant="h6" gutterBottom>
        {t('basket.total')} <b>${numberWithCommas(data.total)}</b>
      </Typography>
      <Typography variant="h6">{t('basket.bankDetail')}</Typography>
      <Alert severity="warning">{t('basket.warnDirectTransfer', { orderId: data.orderId })}</Alert>
      <Box marginY="1rem">
        <BankDetailsTable />
      </Box>
      <Box display="flex" flexWrap="wrap">
        <Box marginRight="1rem" marginBottom="1rem">
          <Typography variant="h6">{t('basket.billAddress')}</Typography>
          <Paper elevation={4} className={classes.paper}>
            {objKeys(data.billAddress!).map(bKey => (
              <Box key={bKey}>
                <b>{data.billAddress![bKey]}</b>
              </Box>
            ))}
          </Paper>
        </Box>
        {data.shipAddress && (
          <Box>
            <Typography variant="h6">{t('basket.shipAddress')}</Typography>
            <Paper elevation={4} className={classes.paper}>
              {objKeys(data.shipAddress).map(sKey => (
                <Box key={sKey}>
                  <b>{data.shipAddress![sKey]}</b>
                </Box>
              ))}
            </Paper>
          </Box>
        )}
      </Box>
      <OrderState orderState={data.orderState} />
    </Box>
  );
});

const useStyles = makeStyles(theme => ({
  cardAction: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  card: {
    marginBottom: '.25rem',
    width: '280px',
    position: 'relative',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  paper: {
    padding: '1rem',
  },
  legend: {
    color: `${theme.palette.common.black} !important`,
  },
}));
