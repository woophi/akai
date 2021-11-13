import { Box, Chip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { LocaleId } from 'core/models';
import { useAppSelector } from 'core/reducers/rootReducer';
import { getSCategories } from 'core/selectors';
import * as React from 'react';
import { FieldInputProps } from 'react-final-form';

type Props = {
  onRemoveField?: () => void;
  input?: FieldInputProps<any, HTMLButtonElement>;
};

export const CategoryField = React.memo<Props>(({ onRemoveField, input }) => {
  const categories = useAppSelector(getSCategories);
  const inputValue = input && input.value;
  const category = categories.find(c => c._id === inputValue)?.name[LocaleId.Ru];
  return (
    <Box margin=".25rem">
      <Chip color={'primary'} label={category} onDelete={onRemoveField} deleteIcon={<DeleteIcon />} />
    </Box>
  );
});
