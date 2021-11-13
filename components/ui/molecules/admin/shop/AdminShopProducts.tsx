import { Box, Typography } from '@material-ui/core';
import { LocaleId } from 'core/models';
import { adminShopActions } from 'core/reducers/admin/shop';
import { getSProducts } from 'core/selectors';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Block, BoxWrap } from 'ui/atoms';
import { getShopProducts } from './operations';

export const AdminShopProducts = memo(() => {
  const dispatch = useDispatch();
  const products = useSelector(getSProducts);

  useEffect(() => {
    getShopProducts().then(d => dispatch(adminShopActions.fetchProducts(d)));
  }, []);

  return (
    <Box margin="1rem">
      <Typography variant="h6" gutterBottom>
        Продукты
      </Typography>
      <Box mt={2}>
        <BoxWrap>
          {products.map((p, i) => (
            <Block
              key={i}
              title={p.title[LocaleId.Ru]}
              imgSrc={p.files[0]?.url}
              subTitle={'изменить'}
              href={`item/edit/${p._id}`}
            />
          ))}
        </BoxWrap>
      </Box>
    </Box>
  );
});
