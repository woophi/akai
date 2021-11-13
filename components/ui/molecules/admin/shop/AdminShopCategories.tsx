import { Box, Chip, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { goToDeep } from 'core/common';
import { LocaleId } from 'core/models';
import { adminShopActions } from 'core/reducers/admin/shop';
import { getSCategories } from 'core/selectors';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShopCategories } from './operations';

export const AdminShopCategories = memo(() => {
  const dispatch = useDispatch();
  const categories = useSelector(getSCategories);

  useEffect(() => {
    getShopCategories().then(d => dispatch(adminShopActions.fetchCategories(d)));
  }, []);

  return (
    <Box margin="1rem">
      <Typography variant="h6" gutterBottom>
        Категории
      </Typography>
      <Box display="flex">
        {categories.map(c => (
          <Box key={c._id} margin=".25rem">
            <Chip
              label={c.name[LocaleId.Ru]}
              onClick={() => goToDeep(`/category/edit/${c._id}`)}
              onDelete={() => goToDeep(`/category/edit/${c._id}`)}
              deleteIcon={<EditIcon />}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
});
