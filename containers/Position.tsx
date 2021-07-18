import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import usePositions from '../hooks/usePositions';
import { toTokenAmount } from '../utils/calculations';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const Position = () => {
  const { positions } = usePositions();
  const classes = useStyles();

  return (
    <>
      <h2 className="text-lg text-cyan mb-8">My positions</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="Position table">
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell align="right">Underlying</TableCell>
              <TableCell align="right">Strike Price</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {positions.map((position) => (
              <TableRow key={position.token.id}>
                <TableCell component="th" scope="row">
                  {position.token.isPut ? 'Put' : 'Call'}
                </TableCell>
                <TableCell align="right">{position.token.underlyingAsset.symbol}</TableCell>
                <TableCell align="right">${toTokenAmount(position.token.strikePrice, 8).toNumber()}</TableCell>
                <TableCell align="right">{toTokenAmount(position.balance, position.token.decimals).toNumber()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <p className="mt-8 text-base">
        Perform advanced options <a className="text-cyan" href="https://v2.opyn.co/#/dashboard" target="_blank">here</a>
      </p>
    </>
  )
};

export default Position;
