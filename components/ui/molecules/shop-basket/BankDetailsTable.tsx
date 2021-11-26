import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const BankDetailsTable = React.memo(() => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Bank</TableCell>
            <TableCell>Account Number</TableCell>
            <TableCell>IBAN</TableCell>
            <TableCell>BIC</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              RF bank
            </TableCell>
            <TableCell component="th" scope="row">
              210012312300/6666
            </TableCell>
            <TableCell component="th" scope="row">
              CZ23784623482367423742634
            </TableCell>
            <TableCell component="th" scope="row">
              RFBCZPXXX
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
});
