import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Spinner, Snakbars, InputSearch, styleTruncate } from 'ui/atoms';
import { connect as redux } from 'react-redux';
import { AppState, FileItem } from 'core/models';
import { fetchFiles } from '../operations';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Box from '@material-ui/core/Box';
import { selectFile } from '../uploader/operations';

type OwnProps = {
  selectedFiles: string[];
  onClickCb: (fileIds: string[]) => void;
};

type Props = {
  files: FileItem[];
} & OwnProps;

const Row = (props: ListChildComponentProps) => {
  const { index, style, data } = props;
  const { files, selectedFiles, onClickCb } = data as Props;

  const checked = selectedFiles.indexOf(files[index]._id) !== -1;
  const handleClick = () => {
    const data = checked
      ? selectedFiles.filter(id => id != files[index]._id)
      : [...selectedFiles, files[index]._id];
    onClickCb(data);
    selectFile(files[index]);
  };

  return (
    <ListItem button style={style} key={index} onClick={handleClick}>
      <ListItemAvatar>
        <Avatar alt={files[index].name} src={files[index].url} />
      </ListItemAvatar>
      <ListItemText
        primary={files[index].name}
        primaryTypographyProps={{ noWrap: true }}
        style={styleTruncate}
        title={files[index].name}
      />
      <ListItemIcon>
        <Checkbox
          checked={checked}
          tabIndex={-1}
          color="primary"
          inputProps={{ 'aria-labelledby': files[index]._id }}
          style={{ marginLeft: '.5rem' }}
        />
      </ListItemIcon>
    </ListItem>
  );
};

const FilesComponent: React.FC<Props> = ({ files, onClickCb, selectedFiles }) => {
  const [fetching, fetch] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [query, search] = React.useState('');

  React.useEffect(() => {
    fetchFiles()
      .then(() => fetch(false))
      .catch(e => {
        fetch(false);
        setError(e);
      });
  }, []);

  const getList = () =>
    files.filter(f => f.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);

  return (
    <>
      <Snakbars message={error} variant="error" />
      <InputSearch onChangeCb={search} value={query} />
      <Box marginTop={1} />
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            itemData={{
              files: getList(),
              onClickCb,
              selectedFiles
            }}
            height={height - 74}
            width={width}
            itemSize={46}
            itemCount={getList().length}
            style={{
              overflowX: 'hidden'
            }}
          >
            {Row}
          </FixedSizeList>
        )}
      </AutoSizer>
      <Spinner isShow={fetching} />
    </>
  );
};

export const FilesList = redux((state: AppState, _: OwnProps) => ({
  files: state.ui.admin.files
}))(FilesComponent);
