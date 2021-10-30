import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { FileItem } from 'core/models';
import { useAppSelector } from 'core/reducers/rootReducer';
import { getSelectedFile } from 'core/selectors';
import * as React from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { InputSearch, Snakbars, Spinner, styleTruncate } from 'ui/atoms';
import { fetchFiles } from '../operations';
import { selectFile } from './operations';

type Props = {
  files: FileItem[];
  selectedFile: FileItem;
};

const Row = (props: ListChildComponentProps) => {
  const { index, style, data } = props;
  const { files, selectedFile } = data as Props;
  const handleSelect = () => selectFile(files[index]);

  return (
    <ListItem
      button
      style={style as React.CSSProperties}
      key={index}
      onClick={handleSelect}
      selected={selectedFile._id === files[index]._id}
    >
      <ListItemText
        primary={files[index].name}
        primaryTypographyProps={{ noWrap: true }}
        style={styleTruncate}
        title={files[index].name}
      />
    </ListItem>
  );
};

export const FilesList: React.FC = () => {
  const classes = useStyles({});
  const [fetching, fetch] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [query, search] = React.useState('');

  const files = useAppSelector(state => state.ui.admin.files);
  const selectedFile = useAppSelector(getSelectedFile);

  React.useEffect(() => {
    fetchFiles()
      .then(() => fetch(false))
      .catch(e => {
        fetch(false);
        setError(e);
      });
  }, []);

  const getList = () => files.filter(f => f.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);

  return (
    <div className={classes.root}>
      <Snakbars message={error} variant="error" />
      <InputSearch onChangeCb={search} value={query} />
      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            itemData={{
              files: getList(),
              selectedFile,
            }}
            height={height}
            width={width}
            itemSize={46}
            itemCount={getList().length}
            style={{
              overflowX: 'hidden',
            }}
          >
            {Row}
          </FixedSizeList>
        )}
      </AutoSizer>
      <Spinner isShow={fetching} />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: 'calc(100% - 74px)',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  })
);
