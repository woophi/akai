import * as React from 'react';
import Button from '@material-ui/core/Button';
import { ModalDialog } from 'ui/atoms';
import InputLabel from '@material-ui/core/InputLabel';
import Box from '@material-ui/core/Box';
import { FilesList } from './FilesList';
import { PaperDropzone } from '../uploader';
import { deselectFile } from '../uploader/operations';
import { connect as redux } from 'react-redux';
import { AppState, FileItem } from 'core/models';
import { getSelectedFile } from 'core/selectors';

type Props = {
  label?: string;
  error?: any;
  disabled?: boolean;
  onConfirm?: (blogId: string) => void;
  className?: string;
};

type ReduxProps = {
  file: FileItem;
} & Props;

const PicturesChooserComponent = React.memo<ReduxProps>(
  ({
    label = 'Добавить картины',
    error,
    disabled = false,
    onConfirm,
    className = '',
    file
  }) => {
    const [open, setOpen] = React.useState(false);
    const [chosenFiles, chooseFile] = React.useState<string[]>([]);

    React.useEffect(() => {
      if (!!file._id && !chosenFiles.some(f => f == file._id)) {
        chooseFile([...chosenFiles.filter(f => !!f), file._id]);
      }
    }, [file._id]);

    const handleClickOpen = () => setOpen(true);
    const handleClickClose = () => {
      setOpen(false);
      deselectFile();
    };

    const handleConfirm = () => {
      setOpen(false);
      if (onConfirm) {
        chosenFiles.forEach(b => onConfirm(b));
        chooseFile([]);
      }
    };

    return (
      <div className={className}>
        <InputLabel style={{ color: '#000', marginBottom: '.5rem' }}>
          {'Выбрать картины'}
        </InputLabel>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          disabled={disabled}
        >
          {label}
        </Button>
        <ModalDialog
          open={open}
          onClose={handleClickClose}
          onConfirm={handleConfirm}
          title={'Выберете картины'}
        >
          <Box flex={1} height={500} display="flex" flexWrap="wrap">
            <Box minWidth={250} minHeight={250}>
              <FilesList onClickCb={chooseFile} selectedFiles={chosenFiles} />
            </Box>
            <PaperDropzone />
          </Box>
        </ModalDialog>
      </div>
    );
  }
);

export const PicturesChooser = redux((state: AppState, _: Props) => ({
  file: getSelectedFile(state)
}))(PicturesChooserComponent);
