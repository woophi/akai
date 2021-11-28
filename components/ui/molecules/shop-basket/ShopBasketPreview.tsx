import { Box, Card, IconButton, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { Alert } from '@material-ui/lab';
import { numberWithCommas } from 'core/lib';
import { useAppSelector } from 'core/reducers/rootReducer';
import { shopActions } from 'core/reducers/shop';
import { isRemoveItemsDisabled, getShopBasketValues } from 'core/selectors';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'server/lib/i18n';
import { ShippingForm } from './ShippingForm';

export const ShopBasketPreview = React.memo<{ withoutRemove?: boolean }>(({ withoutRemove = false }) => {
  const allItems = useAppSelector(getShopBasketValues);
  const removeDisabled = useAppSelector(isRemoveItemsDisabled);
  const totalPrice = useAppSelector(s => s.ui.shop.total);
  const classes = useStyles();
  const isSmallEnough = useMediaQuery('(max-width:800px)');
  const { t } = useTranslation('common');

  const dispatch = useDispatch();

  const removeItem = React.useCallback((id: string) => {
    dispatch(shopActions.removeProduct(id));
  }, []);

  if (!allItems.length) {
    return (
      <Box margin="1rem">
        <Alert severity="info">{t('basket.empty')}</Alert>
      </Box>
    );
  }

  return (
    <Box margin={withoutRemove ? '' : '1rem'}>
      <Box
        display="grid"
        gridTemplateColumns={isSmallEnough ? '1fr' : '1fr 1fr 1fr 1fr'}
        gridTemplateRows={isSmallEnough ? '1fr 1fr 1fr' : undefined}
        style={{ gap: '1rem' }}
        marginBottom="1rem"
      >
        {allItems.map(cI => (
          <Card key={cI.id} className={classes.card}>
            <Box className={classes.cardAction}>
              <Box width="75px" minWidth="75px" height="75px">
                <img src={cI.file.url} className={classes.img} />
              </Box>
              <Box paddingY=".25rem" paddingX="1rem" width="250px">
                <Typography variant="body1" noWrap gutterBottom>
                  {cI.name}
                </Typography>
                <b>${numberWithCommas(cI.price)}</b>
                {!withoutRemove && (
                  <IconButton disabled={removeDisabled} className={classes.remove} onClick={() => removeItem(cI.id)}>
                    <ClearIcon />
                  </IconButton>
                )}
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
      <ShippingForm />
      <Typography variant="h6" gutterBottom>
        {t('basket.total')} <b>${numberWithCommas(totalPrice)}</b>
      </Typography>
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
  remove: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: theme.palette.error.main,
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  legend: {
    color: `${theme.palette.common.black} !important`,
  },
}));
