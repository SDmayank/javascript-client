import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';

import TableSortLabel from '@material-ui/core/TableSortLabel';
import {
  makeStyles, withStyles,
} from '@material-ui/core/styles';

// import * as moment from 'moment';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
      background: '#B6B6B4',
      cursor: 'pointer',
    },
  },
}))(TableRow);


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
  const {
    id, data, columns, order, orderBy, onSort, onSelect,
  } = props;
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">

        <TableHead>
          <TableRow hover>
            {
              columns && columns.length && columns.map(({ label, align, field }) => (
                <TableCell align={align} className={classes.column}>
                  <TableSortLabel
                    align={align}
                    active={orderBy === field}
                    direction={orderBy === field ? order : 'asc'}
                    onClick={onSort(field)}

                  >
                    {console.log('order', order, 'orderBy', orderBy)}
                    {label}
                  </TableSortLabel>
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.length && data.map((element) => (

            <StyledTableRow
              hover
              onClick={(event) => onSelect(event, element)}
              key={element[id]}
            >
              <Fragment key={element.id}>
                {
                  columns && columns.length && columns.map(({ field, align, Format }) => (
                    <TableCell
                      align={align}
                      format={Format}
                      component="th"
                      scope="row"
                    >
                      {Format ? Format(element[field]) : element[field]}
                      {/* {element[field]} */}
                    </TableCell>
                  ))
                }
              </Fragment>
            </StyledTableRow>
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

TraineeTable.propTypes = {
  id: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSort: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  orderBy: PropTypes.string,
  order: PropTypes.oneOf(['asc', 'desc']),
};
TraineeTable.defaultProps = {
  orderBy: '',
  order: 'asc',
};

export default TraineeTable;
