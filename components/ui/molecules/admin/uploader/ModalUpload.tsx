import * as React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { ModalDialog, ArrowTooltip } from 'ui/atoms';
import { PaperDropzone } from './Uploader';
import { FieldInputProps } from 'react-final-form';
import Box from '@material-ui/core/Box';
import { FilesList } from './FileList';
import { deselectFile } from './operations';

type Props = {
  label?: string;
  error?: any;
  disabled?: boolean;
  input?: FieldInputProps<any, HTMLButtonElement>;
};

export const ModalUpload = React.memo<Props>(
  ({ label = 'Выбрать файл', error, disabled = false, input }) => {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClickClose = () => {
      setOpen(false);
      deselectFile();
    };

    return (
      <>
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
          onOpen={handleClickOpen}
          title={'Выберете файл или загрузите новый'}
        >
          <Box flex={1} height={500} display="flex" flexWrap="wrap">
            <Box minWidth={250}>
              <FilesList />
            </Box>
            <PaperDropzone />
          </Box>
        </ModalDialog>
      </>
    );
  }
);
