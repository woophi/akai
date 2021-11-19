import { Box, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { RelatedProductData, ShopRelatedData } from 'core/models';
import React from 'react';
import { useTranslation } from 'server/lib/i18n';
import { RecentlyAddedProduct } from './RecentlyAddedProduct';

export const ProductHomeLayout = React.memo<{ shopData: ShopRelatedData }>(({ shopData }) => {
  const classes = useStyles();
  const { t } = useTranslation('common');
  const isSmallEnough = useMediaQuery('(max-width:800px)');
  return (
    <section className={classes.content}>
      <Typography variant="h3" gutterBottom>
        {t('shop.newArts')}
      </Typography>
      <Box
        display="grid"
        gridTemplateColumns={isSmallEnough ? '1fr' : '1fr 1fr 1fr 1fr'}
        gridTemplateRows={isSmallEnough ? '1fr 1fr 1fr' : undefined}
        style={{ gap: '1rem' }}
        maxWidth="1200px"
        marginBottom="1rem"
      >
        {shopData.products.map(p => (
          <Box key={p.id} width="250px">
            <RecentlyAddedProduct data={p} />
          </Box>
        ))}
      </Box>

      <Typography variant="h3" gutterBottom>
        {t('shop.allArts')}
      </Typography>
      <Typography variant="subtitle1">{t('shop.byCategories')}</Typography>
    </section>
  );
});

const useStyles = makeStyles(theme => ({
  content: {
    padding: '3rem',
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));
