import * as React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { ModalDialog, ArrowTooltip } from 'ui/atoms';
import { FieldInputProps } from 'react-final-form';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import { BlogsList } from './BlogsList';

type Props = {
  label?: string;
  error?: any;
  disabled?: boolean;
  input?: FieldInputProps<any, HTMLButtonElement>;
};

export const BlogsChooser = React.memo<Props>(
  ({ label = 'Добавить блог', error, disabled = false, input }) => {
    const [open, setOpen] = React.useState(false);
    const [chosenBlogs, chooseBlog] = React.useState<string[]>([]);
    const handleClickOpen = () => setOpen(true);
    const handleClickClose = () => {
      setOpen(false);
    };

    const handleConfirm = () => {
      setOpen(false);
      if (input) {
        input.onChange(null);
      }
    };

    return (
      <>
        <InputLabel style={{ color: '#000' }}>{'Блоги в альбоме'}</InputLabel>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          disabled={disabled}
          onFocus={input && input.onFocus}
          onBlur={input && input.onBlur}
        >
          {label}
          {error && (
            <ArrowTooltip placement="top" title={error}>
              <Icon
                className={'fas fa-exclamation-triangle'}
                color="error"
                style={{ width: 'auto' }}
              />
            </ArrowTooltip>
          )}
        </Button>
        <ModalDialog
          open={open}
          onClose={handleClickClose}
          onConfirm={handleConfirm}
          title={'Выберете блог'}
        >
          <Box flex={1} height={500} display="flex">
            <BlogsList onClickCb={chooseBlog} selectedBlogs={chosenBlogs} />
          </Box>
        </ModalDialog>
      </>
    );
  }
);
