import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { connect as redux } from 'react-redux';
import { AppState, FileItem } from 'core/models';
import { getAdminFiles } from 'core/selectors';

type OwnProps = {
  onRemoveField?: () => void;
  fileId?: string;
};

type Props = {
  files: FileItem[];
} & OwnProps;

const PictureFieldComponent = React.memo<Props>(
  ({ onRemoveField, fileId, files }) => {
    const file = files.find(f => f._id == fileId) || ({} as FileItem);
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={file.name} src={file.url} />
        </ListItemAvatar>
        {onRemoveField && (
          <ListItemIcon>
            <IconButton onClick={onRemoveField}>
              <DeleteIcon />
            </IconButton>
          </ListItemIcon>
        )}
      </ListItem>
    );
  }
);

export const PictureField = redux((state: AppState) => ({
  files: getAdminFiles(state)
}))(PictureFieldComponent);
