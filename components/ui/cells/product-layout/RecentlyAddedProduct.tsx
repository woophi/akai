import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { goToSpecific } from 'core/common';
import { numberWithCommas, theme } from 'core/lib';
import { RecentlyAddedProductData } from 'core/models';
import { shopActions } from 'core/reducers/shop';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'server/lib/i18n';
import { AddOrRemoveProduct } from './AddOrRemoveProduct';

export const RecentlyAddedProduct = React.memo<{ data: RecentlyAddedProductData | null }>(({ data }) => {
  const classes = useStyles();
  const { t } = useTranslation('common');
  const dispatch = useDispatch();

  const handleClick = React.useCallback(() => {
    goToSpecific(`/product/${data?.href}`);
  }, [data?.href]);

  const addToBasket = React.useCallback(() => {
    if (!data) return;
    dispatch(
      shopActions.addProduct({
        file: data.file,
        id: data.id,
        name: data.title,
        price: data.price,
        href: data.href,
      })
    );
  }, [data]);

  if (!data) return null;

  return (
    <Card className={classes.productBox}>
      <CardActionArea onClick={handleClick}>
        <CardMedia className={classes.media} image={data.file.url} />
        <CardContent className={classes.content}>
          <Typography gutterBottom variant="h5" component="h2" noWrap>
            {data.title}
          </Typography>
          <Typography variant="subtitle1">${numberWithCommas(data.price)}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {data.stock <= 0 ? (
          <Box component="span" display="flex" alignItems="center" color={theme.palette.error.main} height="31px">
            {t('shop.soldOut')}
          </Box>
        ) : (
          <AddOrRemoveProduct data={data} small />
        )}
      </CardActions>
    </Card>
  );
});

const useStyles = makeStyles(theme => ({
  productBox: {
    width: '100%',
  },
  content: {
    padding: '.5rem .5rem 0',
  },
  media: {
    height: '200px',
  },
}));
