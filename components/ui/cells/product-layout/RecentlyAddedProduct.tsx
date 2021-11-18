import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { goToSpecific } from 'core/common';
import { numberWithCommas } from 'core/lib';
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
    <Paper elevation={2} className={classes.productBox} onClick={handleClick}>
      <Box padding=".5rem">
        <Typography variant="subtitle1">{t('shop.latestP')}</Typography>
      </Box>
      <Box>
        <img src={data.file.url} width="100%" />
      </Box>
      <Box textAlign="center" paddingBottom=".5rem">
        <Typography variant="caption" gutterBottom>
          {data.categories[0]}
        </Typography>
        <Typography variant="h6">{data.title}</Typography>
        <Typography variant="body1">${numberWithCommas(data.price)}</Typography>
      </Box>
    </Paper>
  );
});

const useStyles = makeStyles(theme => ({
  productBox: {
    marginBottom: '1rem',
    cursor: 'pointer',
  },
  price: {
    color: theme.palette.success.main,
  },
  capitalLetter: {
    textTransform: 'capitalize',
  },
}));
