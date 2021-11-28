import { Box, Card, makeStyles, Typography, useMediaQuery } from '@material-ui/core';
import { numberWithCommas } from 'core/lib';
import { getSOrder } from 'core/selectors';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { EditOrder } from './EditOrder';

export const AdminOrder = React.memo(() => {
  const classes = useStyles();
  const initialValues = useSelector(getSOrder);
  const isSmallEnough = useMediaQuery('(max-width:800px)');

  if (!initialValues) {
    return null;
  }

  return (
    <Box flexDirection="column" flex={1}>
      <Box margin="0 1rem 1rem">
        <Typography variant="h6">Картины</Typography>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns={isSmallEnough ? '1fr' : '1fr 1fr 1fr 1fr'}
        gridTemplateRows={isSmallEnough ? '1fr 1fr 1fr' : undefined}
        style={{ gap: '1rem' }}
        margin="1rem"
        maxWidth="1200px"
      >
        {initialValues.items.map(cI => (
          <Card key={cI.id} className={classes.card}>
            <Box className={classes.cardAction}>
              <Box width="75px" minWidth="75px" height="75px">
                <img src={cI.url} className={classes.img} />
              </Box>
              <Box paddingY=".25rem" paddingX="1rem" width="250px">
                <Typography variant="body1" noWrap gutterBottom>
                  {cI.title} ({cI.stock})
                </Typography>
                <b>${numberWithCommas(cI.price)}</b>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
      <EditOrder initialValues={initialValues} />
    </Box>
  );
});

const useStyles = makeStyles(theme => ({
  cardAction: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  card: {
    marginBottom: '.25rem',
    width: '280px',
    position: 'relative',
  },
  remove: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: theme.palette.error.main,
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  legend: {
    color: `${theme.palette.common.black} !important`,
  },
}));
