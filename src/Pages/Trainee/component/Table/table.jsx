import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
  column: {
    color: 'grey',
  },
}));

function TraineeTable(props) {
  const { id, data, columns } = props;
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">

        <TableHead>
          <TableRow>
            {
              columns && columns.length && columns.map(({ label, align }) => (
                <TableCell align={align} className={classes.column}>{label}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.length && data.map((trainee, key) => (

            <TableRow trainee={key[id]}>
              {
                columns && columns.length && columns.map(({ field, align }) => (
                  <TableCell align={align}>{trainee[field]}</TableCell>
                ))
              }

            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}

TraineeTable.propTypes = {

  id: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TraineeTable;
