import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { H1, Block, BoxContent } from 'ui/atoms';
import { BlogPreviewItem } from 'core/models';
import { useTranslation } from 'server/lib/i18n';

type Props = {
  blogs: BlogPreviewItem[]
  albumTitle: string;
}

export const AlbumLayout: React.FC<Props> = React.memo(({
  blogs,
  albumTitle
}) => {
  const classes = useStyles({});
  const { t } = useTranslation();
  return (
    <BoxContent>
      <H1 upperCase>{albumTitle}</H1>
      <div className={classes.wrap}>
        {blogs.map((b, i) => (
          <Block
            key={i}
            title={b.title}
            imgSrc={b.coverPhoto}
            subTitle={t('common:watch')}
            href={b.id}
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
