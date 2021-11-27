import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { bankDetails } from './constants';
import { useTranslation } from 'server/lib/i18n';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const BankDetailsTable = React.memo(() => {
  const classes = useStyles();
  const { t } = useTranslation('common');

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t('basket.bank')}</TableCell>
            <TableCell>{t('basket.accNumber')}</TableCell>
            <TableCell>IBAN</TableCell>
            <TableCell>BIC</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              {bankDetails.bankName}
            </TableCell>
            <TableCell component="th" scope="row">
              {bankDetails.accNumber}
            </TableCell>
            <TableCell component="th" scope="row">
              {bankDetails.IBAN}
            </TableCell>
            <TableCell component="th" scope="row">
              {bankDetails.BIC}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
});
