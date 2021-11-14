import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { FileItem } from 'core/models';
import { useAppSelector } from 'core/reducers/rootReducer';
import { getAdminFiles } from 'core/selectors';
import * as React from 'react';
import { styleTruncate } from 'ui/atoms';
import { DragHandler } from 'ui/molecules';

type Props = {
  onRemoveField?: () => void;
  fileId?: string;
  text?: string;
  withDrag?: boolean;
};

export const PictureField = React.memo<Props>(({ onRemoveField, fileId, text = '', withDrag = true }) => {
  const files = useAppSelector(getAdminFiles);
  const file = files.find(f => f._id == fileId) || ({} as FileItem);
  return (
    <ListItem>
      {withDrag && <DragHandler />}
      <ListItemAvatar>
        <Avatar alt={file.name} src={file.url} />
      </ListItemAvatar>
      {text && <ListItemText primary={text} primaryTypographyProps={{ noWrap: true }} style={styleTruncate} title={text} />}
      {onRemoveField && (
        <ListItemIcon>
          <IconButton onClick={onRemoveField}>
            <DeleteIcon />
          </IconButton>
        </ListItemIcon>
      )}
    </ListItem>
  );
});
