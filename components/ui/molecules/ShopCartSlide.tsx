import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { goToSpecific } from 'core/common';
import { getShopBasketValuesLength } from 'core/selectors/shop';
import React from 'react';
import { useSelector } from 'react-redux';

const goToCart = () => goToSpecific('/shop/cart');

export const ShopCartSlide = React.memo(() => {
  const length = useSelector(getShopBasketValuesLength);

  return (
    <Slide direction="left" in={!!length} mountOnEnter unmountOnExit>
      <Box
        zIndex={1}
        position="fixed"
        top={150}
        right={20}
        width="60px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius=".25rem"
        bgcolor="#fff"
        boxShadow="0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"
      >
        <IconButton color="primary" onClick={goToCart}>
          <Badge badgeContent={length} color="error">
            <ShoppingBasketIcon />
          </Badge>
        </IconButton>
      </Box>
    </Slide>
  );
});
