import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { H1, BoxContent } from 'ui/atoms';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { PhotoData } from 'core/models/photos';
import { useTranslation } from 'next-i18next';

type Props = {
  photos: PhotoData[]
}

export const PhotoLayout: React.FC<Props> = React.memo(({
  photos
}) => {
  const classes = useStyles({});
  const { t } = useTranslation();
  return (
    <BoxContent>
      <H1 upperCase>{t('common:photo.title')}</H1>
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
                className={classes.titleBar}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </BoxContent>
  );
});

const useStyles = makeStyles(theme => ({
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
