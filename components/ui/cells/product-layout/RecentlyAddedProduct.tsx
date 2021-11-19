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
import React from 'react';
import { useTranslation } from 'server/lib/i18n';

export const RecentlyAddedProduct = React.memo<{ data: RecentlyAddedProductData | null }>(({ data }) => {
  const classes = useStyles();
  const { t } = useTranslation('common');

  const handleClick = React.useCallback(() => {
    goToSpecific(`/product/${data?.href}`);
  }, [data?.href]);

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
        <Button size="small" color="primary" variant="contained" disabled={data.stock <= 0}>
          {t('shop.addToCart')} +
        </Button>

        {data.stock <= 0 && (
          <Box component="span" marginLeft=".25rem" color={theme.palette.error.main}>
            {t('shop.soldOut')}
          </Box>
        )}
      </CardActions>
    </Card>
  );
});

const useStyles = makeStyles(theme => ({
  productBox: {
    marginBottom: '1rem',
    width: '100%',
  },
  content: {
    padding: '.5rem .5rem 0',
  },
  media: {
    height: '200px',
  },
}));
