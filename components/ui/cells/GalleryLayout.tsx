import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { H1, Block, BoxContent } from 'ui/atoms';
import { AlbumModel } from 'core/models';
import { useTranslation } from 'server/lib/i18n';

type Props = {
  albums: AlbumModel[]
}

export const GalleryLayout: React.FC<Props> = React.memo(({
  albums
}) => {
  const classes = useStyles({});
  const { t } = useTranslation();
  return (
    <BoxContent>
      <H1 upperCase>{t('common:gallery.title')}</H1>
      <div className={classes.wrap}>
        {albums.map((a, i) => (
          <Block
            key={i}
            title={a.title}
            imgSrc={a.coverPhoto}
            subTitle={t('common:watch')}
            href={a.id}
          />
        ))}
      </div>
    </BoxContent>
  );
});

const useStyles = makeStyles(theme => ({
  wrap: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '2rem 0'
  }
}));
