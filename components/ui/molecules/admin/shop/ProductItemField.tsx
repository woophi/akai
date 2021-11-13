import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { LocaleId } from 'core/models';
import { adminShopActions } from 'core/reducers/admin/shop';
import { getSProducts } from 'core/selectors';
import * as React from 'react';
import { FieldInputProps } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { getShopProducts } from './operations';

type Props = {
  onRemoveField?: () => void;
  input?: FieldInputProps<any, HTMLButtonElement>;
};

export const ProductItemField = React.memo<Props>(({ onRemoveField, input }) => {
  const dispatch = useDispatch();
  const products = useSelector(getSProducts);

  React.useEffect(() => {
    getShopProducts().then(d => dispatch(adminShopActions.fetchProducts(d)));
  }, []);

  const inputValue = input && input.value;
  const product = products.find(p => p._id == inputValue);
  if (!product) return null;
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt={product.title[LocaleId.Ru]} src={product.files[0]?.url} />
      </ListItemAvatar>
      <ListItemText primary={product.title[LocaleId.Ru]} primaryTypographyProps={{ noWrap: true }} />
      <ListItemIcon>
        <IconButton onClick={onRemoveField}>
          <DeleteIcon />
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
});
