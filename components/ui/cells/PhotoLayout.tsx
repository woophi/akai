import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { H1 } from 'ui/atoms';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { PhotoData } from 'core/models/photos';

type Props = {
  photos: PhotoData[]
}

export const PhotoLayout: React.FC<Props> = React.memo(({
  photos
}) => {
  const classes = useStyles({});

  return (
    <div className={classes.content}>
      <H1 upperCase>PHOTO GALLERY</H1>
      <div className={classes.wrap}>
        <GridList
          cellHeight={200}
          spacing={12}
          className={classes.gridList}
          cols={3}
        >
          {photos.map((photo, i) => (
            <GridListTile key={i} cols={photo.wild ? 2 : 1}>
              <img src={photo.file.thumbnail} alt={photo.file.name} />
              <GridListTileBar
                titlePosition="top"
                // actionIcon={
                //   <IconButton
                //     className={`fas fa-download`}
                //   />
                // }
                // actionPosition="left"
                className={classes.titleBar}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
});

const useStyles = makeStyles(theme => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  wrap: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '2rem 0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  gridList: {
    maxWidth: '40%',
    minWidth: 320
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
}));
