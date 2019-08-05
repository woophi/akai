import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { connect as redux } from 'react-redux';
import { AppState, FileItem } from 'core/models';
import { getAdminFiles } from 'core/selectors';
import { styleTruncate } from 'ui/atoms';

type OwnProps = {
  onRemoveField?: () => void;
  fileId?: string;
  text?: string;
};

type Props = {
  files: FileItem[];
} & OwnProps;

const PictureFieldComponent = React.memo<Props>(
  ({ onRemoveField, fileId, files, text = '' }) => {
    const file = files.find(f => f._id == fileId) || ({} as FileItem);
    return (
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={file.name} src={file.url} />
        </ListItemAvatar>
        {text && (
          <ListItemText
            primary={text}
            primaryTypographyProps={{ noWrap: true }}
            style={styleTruncate}
            title={text}
          />
        )}
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
