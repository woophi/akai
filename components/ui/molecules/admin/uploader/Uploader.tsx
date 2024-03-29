import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import RootRef from '@material-ui/core/RootRef';
import { allowedFormats } from 'core/common';
import { theme } from 'core/lib';
import { useAppSelector } from 'core/reducers/rootReducer';
import { getAdminState, getSelectedFile, isFileUploading } from 'core/selectors';
import * as React from 'react';
import { useDropzone } from 'react-dropzone';
import { Spinner } from 'ui/atoms';
import { uploadFile } from './operations';

export const PaperDropzone = React.memo(() => {
  const file = useAppSelector(getSelectedFile);
  const uploading = useAppSelector(isFileUploading);
  const onDrop = React.useCallback(acceptedFiles => {
    if (acceptedFiles && acceptedFiles.length) {
      uploadFile(acceptedFiles);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: allowedFormats,
    multiple: false,
  });
  const { ref, ...rootProps } = getRootProps();
  return (
    <>
      <RootRef rootRef={ref}>
        <Paper
          {...rootProps}
          style={{
            marginLeft: '1rem',
            width: 230,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {isDragActive && (
            <Box
              position="absolute"
              display="flex"
              height="100%"
              width="100%"
              zIndex={1}
              style={{
                backgroundColor: 'rgba(169, 164, 164, 0.29)',
              }}
            >
              <Paper
                style={{
                  backgroundColor: theme.palette.primary.light,
                  margin: 'auto',
                  height: 'min-content',
                  padding: '0 1rem',
                }}
              >
                <p>{'Отпустите файл'}</p>
              </Paper>
            </Box>
          )}
          {isDragReject && (
            <Box
              position="absolute"
              display="flex"
              height="100%"
              width="100%"
              zIndex={1}
              style={{
                backgroundColor: 'rgba(169, 164, 164, 0.29)',
              }}
            >
              <Paper
                style={{
                  backgroundColor: theme.palette.error.main,
                  margin: 'auto',
                  height: 'min-content',
                  padding: '0 1rem',
                }}
              >
                <p>{'Недопустимый формат'}</p>
              </Paper>
            </Box>
          )}
          <input {...getInputProps({ disabled: uploading })} />
          <Button onClick={e => e.preventDefault()} variant="contained">
            {'Згрузить файл'}
          </Button>
          {uploading && <p>Uploading...</p>}
          <img src={file.url} style={{ maxWidth: '100%', maxHeight: '100%', margin: 'auto' }} />
        </Paper>
      </RootRef>
      <Spinner isShow={uploading} />
    </>
  );
});
