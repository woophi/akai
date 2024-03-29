import { Badge, ButtonBase, makeStyles, Typography } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';
import { goToSpecific } from 'core/common';
import { CategoryRelated } from 'core/models';
import React from 'react';

export const CategoryButtons: React.FC<{ categories: CategoryRelated[] }> = ({ categories }) => {
  const classes = useStyles({ column: false });

  const openCategory = React.useCallback((name: string) => {
    goToSpecific(`/category/${name}`);
  }, []);

  return (
    <div className={classes.root}>
      {categories.map(category => (
        <ButtonBase
          focusRipple
          key={category.id}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          onClick={() => openCategory(category.name)}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${category.coverPhoto})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography component="span" variant="subtitle1" color="inherit" className={classes.imageTitle}>
              <Badge badgeContent={category.productsCount > 99 ? '99+' : category.productsCount} color="error">
                {category.name}
              </Badge>
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </div>
  );
};
export const CategoryButtonsColumn: React.FC<{ categories: CategoryRelated[] }> = ({ categories }) => {
  const classes = useStyles({ column: true });

  const openCategory = React.useCallback((name: string) => {
    goToSpecific(`/category/${name}`);
  }, []);

  return (
    <div className={classes.root}>
      {categories.map(category => (
        <ButtonBase
          focusRipple
          key={category.id}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          onClick={() => openCategory(category.name)}
        >
          <span
            className={classes.imageSrc}
            style={{
              backgroundImage: `url(${category.coverPhoto})`,
            }}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography component="span" variant="subtitle1" color="inherit" className={classes.imageTitle}>
              <Badge badgeContent={category.productsCount > 99 ? '99+' : category.productsCount} color="error">
                {category.name}
              </Badge>
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
      ))}
    </div>
  );
};

const useStyles = makeStyles(theme =>
  createStyles({
    root: ({ column }: { column: boolean }) => ({
      display: 'flex',
      flexWrap: column ? undefined : 'wrap',
      minWidth: 300,
      width: '100%',
      justifyContent: 'center',
      maxWidth: '1200px',
      flexDirection: column ? 'column' : undefined,
    }),
    image: ({ column }: { column: boolean }) => ({
      position: 'relative',
      height: 200,
      width: column ? '100%' : '23%',
      margin: column ? undefined : '.5rem',
      borderRadius: column ? '4px' : undefined,
      overflow: column ? 'hidden' : undefined,
      marginBottom: column ? '.25rem' : undefined,
      marginTop: column ? '.25rem' : undefined,
      [theme.breakpoints.down('xs')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
      },
      '&:hover, &$focusVisible': {
        zIndex: 1,
        '& $imageBackdrop': {
          opacity: 0.15,
        },
        '& $imageMarked': {
          opacity: 0,
        },
        '& $imageTitle': {
          border: '4px solid currentColor',
        },
      },
    }),
    focusVisible: {},
    imageButton: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.palette.common.white,
    },
    imageSrc: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundSize: 'cover',
      backgroundPosition: 'center 40%',
    },
    imageBackdrop: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: theme.palette.common.black,
      opacity: 0.4,
      transition: theme.transitions.create('opacity'),
    },
    imageTitle: {
      position: 'relative',
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    imageMarked: {
      height: 3,
      width: 18,
      backgroundColor: theme.palette.common.white,
      position: 'absolute',
      bottom: -2,
      left: 'calc(50% - 9px)',
      transition: theme.transitions.create('opacity'),
    },
  })
);
