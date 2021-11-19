import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import { useAppSelector } from 'core/reducers/rootReducer';
import { getSelectedFile } from 'core/selectors';
import * as React from 'react';
import { FieldInputProps } from 'react-final-form';
import { ArrowTooltip, ModalDialog } from 'ui/atoms';
import { FilesList } from './FileList';
import { deselectFile, getChosenFile } from './operations';
import { PaperDropzone } from './Uploader';

type Props = {
  label?: string;
  error?: any;
  disabled?: boolean;
  input?: FieldInputProps<any, HTMLButtonElement>;
  className?: string;
  inputLabel?: string;
};

export const ModalUpload = React.memo<Props>(
  ({ label = 'Выбрать файл', error, disabled = false, input, className = '', inputLabel = '' }) => {
    const file = useAppSelector(getSelectedFile);
    const chosenFile = useAppSelector(state => getChosenFile(input && input.value, state));
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => setOpen(true);
    const handleClickClose = () => {
      setOpen(false);
      deselectFile();
    };

    const handleConfirm = () => {
      setOpen(false);
      if (input) {
        input.onChange(file._id);
      }
    };

    return (
      <div className={className} style={{ margin: '0 1rem 1rem' }}>
        <InputLabel style={{ color: '#000', marginBottom: '.5rem' }}>{inputLabel || 'Обложка альбома'}</InputLabel>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          disabled={disabled}
          onFocus={input && input.onFocus}
          onBlur={input && input.onBlur}
        >
          {chosenFile._id ? 'Файл выбран' : label}
          {error && (
            <ArrowTooltip placement="top" title={error} style={{ marginLeft: '.5rem' }}>
              <Icon className={'fas fa-exclamation-triangle'} color="error" style={{ width: 'auto' }} />
            </ArrowTooltip>
          )}
        </Button>
        {chosenFile.url && (
          <Paper elevation={4} style={{ minWidth: 288, height: 320, marginTop: '.5rem', maxWidth: 320 }}>
            <img src={chosenFile.url} width="100%" height="100%" style={{ objectFit: 'cover' }} />
          </Paper>
        )}
        <ModalDialog
          open={open}
          onClose={handleClickClose}
          onConfirm={handleConfirm}
          title={'Выберите файл или загрузите новый'}
          confirmTitle={'Выбрать'}
        >
          <Box flex={1} height={500} display="flex" flexWrap="wrap">
            <Box minWidth={250} minHeight={250}>
              <FilesList />
            </Box>
            <PaperDropzone />
          </Box>
        </ModalDialog>
      </div>
    );
  }
);
