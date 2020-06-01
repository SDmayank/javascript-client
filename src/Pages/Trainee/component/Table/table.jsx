/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Table, TableSortLabel, Button } from '@material-ui/core';
import {
  makeStyles, withStyles,
} from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';

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
    id,
    data,
    columns, order,
    orderBy, onSort,
    onSelect, actions,
    count, rowsPerPage, page, onChangePage, onChangeRowsPerPage,
  } = props;
  const createSortHandler = (property) => (event) => {
    onSort(event, property);
  };

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
                    onClick={createSortHandler(field)}

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
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((element) => (

            <StyledTableRow
              hover
              onClick={(event) => onSelect(event, element)}
              key={element[id]}
              actions={actions}
            >
              <Fragment key={element.id}>
                {
                  columns && columns.length && columns.map(({
                    field, align, Format,
                  }) => (
                    <TableCell
                      align={align}
                      format={Format}
                      x
                      component="th"
                      scope="row"
                    >
                      {Format ? Format(element[field]) : element[field]}

                    </TableCell>
                  ))
                }
                <div>
                  {actions && actions.length && actions.map(({ icon, handler }) => (
                    <Button onClick={() => handler(element)}>
                      {icon}
                    </Button>
                  ))}
                </div>
              </Fragment>
            </StyledTableRow>
          ))}
        </TableBody>
        <TablePagination
          rowsPerPageOptions={[3, 5, 10, 15, 100]}
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
        />

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
  orderBy: PropTypes.objectOf,
  order: PropTypes.string,
};
TraineeTable.defaultProps = {
  orderBy: '',
  order: 'asc',
};

export default TraineeTable;
