import * as React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { ModalDialog, ArrowTooltip } from 'ui/atoms';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import { ProductsList } from './ProductsList';

type Props = {
  label?: string;
  error?: any;
  disabled?: boolean;
  onConfirm?: (blogId: string) => void;
};

export const ProductsChooser = React.memo<Props>(({ label = 'Добавить продукт', error, disabled = false, onConfirm }) => {
  const [open, setOpen] = React.useState(false);
  const [chosenProducts, chooseProduct] = React.useState<string[]>([]);
  const handleClickOpen = () => setOpen(true);
  const handleClickClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    if (onConfirm) {
      chosenProducts.forEach(b => onConfirm(b));
    }
  };

  return (
    <Box margin="0 1rem 1rem">
      <InputLabel style={{ color: '#000', marginBottom: '.5rem' }}>{'Продукты в категории'}</InputLabel>
      <Button variant="contained" color="primary" onClick={handleClickOpen} disabled={disabled}>
        {label}
        {error && (
          <ArrowTooltip placement="top" title={error}>
            <Icon className={'fas fa-exclamation-triangle'} color="error" style={{ width: 'auto' }} />
          </ArrowTooltip>
        )}
      </Button>
      <ModalDialog open={open} onClose={handleClickClose} onConfirm={handleConfirm} title={'Выберите продукты'}>
        <ProductsList onClickCb={chooseProduct} selectedProducts={chosenProducts} />
      </ModalDialog>
    </Box>
  );
});
