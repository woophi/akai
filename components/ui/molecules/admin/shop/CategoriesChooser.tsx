import { Box, Chip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import { LocaleId } from 'core/models';
import { adminShopActions } from 'core/reducers/admin/shop';
import { getSCategories } from 'core/selectors';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowTooltip, ModalDialog } from 'ui/atoms';
import { getShopCategories } from './operations';

type Props = {
  label?: string;
  error?: any;
  disabled?: boolean;
  onConfirm?: (categoryId: string) => void;
};

export const CategoriesChooser = React.memo<Props>(({ label = 'Выбрать категорию', error, disabled = false, onConfirm }) => {
  const [open, setOpen] = React.useState(false);
  const [chosenCategories, chooseCategory] = React.useState<string[]>([]);
  const categories = useSelector(getSCategories);
  const dispatch = useDispatch();

  React.useEffect(() => {
    getShopCategories().then(d => dispatch(adminShopActions.fetchCategories(d)));
  }, []);

  const handleClickOpen = () => setOpen(true);
  const handleClickClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    if (onConfirm) {
      chosenCategories.forEach(c => onConfirm(c));
    }
  };

  return (
    <Box margin="0 1rem 1rem">
      <InputLabel style={{ color: '#000', marginBottom: '.5rem' }}>{'Категории'}</InputLabel>
      <Button variant="contained" color="primary" onClick={handleClickOpen} disabled={disabled}>
        {label}
        {error && (
          <ArrowTooltip placement="top" title={error}>
            <Icon className={'fas fa-exclamation-triangle'} color="error" style={{ width: 'auto' }} />
          </ArrowTooltip>
        )}
      </Button>
      <ModalDialog open={open} onClose={handleClickClose} onConfirm={handleConfirm} title={'Выберите категории'}>
        <Box display="flex">
          {categories.map(c => (
            <Box key={c._id} margin=".25rem">
              <Chip
                color={chosenCategories.includes(c._id) ? 'primary' : undefined}
                label={c.name[LocaleId.Ru]}
                onClick={() =>
                  chooseCategory(cs =>
                    chosenCategories.includes(c._id) ? cs.filter(csid => csid !== c._id) : cs.concat(c._id)
                  )
                }
              />
            </Box>
          ))}
        </Box>
      </ModalDialog>
    </Box>
  );
});
