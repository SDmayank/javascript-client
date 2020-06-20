/* eslint-disable no-console */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import { Table, TableSortLabel } from '@material-ui/core';
import {
  makeStyles, withStyles,
} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import Button from '@material-ui/core/Button';
import { withLoaderAndMessage } from '../../../../component';

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

const StyledTableRow = withStyles(() => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#F5F5F5',
    },
    '&:hover': {
      background: '#D3D3D3',
      cursor: 'pointer',
    },
  },
}))(TableRow);

function TraineeTable(props) {
  const {
    id,
    data,
    columns, order,
    orderBy, onSort,
    onSelect, actions,
    count, rowsPerPage, page, onChangePage, onChangeRowsPerPage,
    loading,
  } = props;
  const createSortHandler = (property) => (event) => {
    onSort(event, property);
  };

  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.container}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
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
            <TableCell />
          </TableRow>
        </TableHead>
        {loading ? (
          <TableBody>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                <div align="center">
                  <CircularProgress color="secondary" />
                </div>
              </TableCell>

            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {data.length ? data.map((element) => (

              <StyledTableRow
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
                        component="th"
                        scope="row"
                      >
                        {Format ? Format(element[field]) : element[field]}

                      </TableCell>
                    ))
                  }
                  <TableCell>
                    {actions && actions.length && actions.map(({ icon, handler }) => (
                      // eslint-disable-next-line react/jsx-no-comment-textnodes

                      <Button onClick={() => { handler(element); }}>
                        {icon}
                      </Button>

                    ))}
                  </TableCell>
                </Fragment>
              </StyledTableRow>
            )) : (
              <TableRow>
                <TableCell align="center" colSpan={4}>
                  <div align="center">
                    <h1>
                      OOPS!, No More Trainees
                    </h1>
                  </div>
                </TableCell>

              </TableRow>
            )}
          </TableBody>
        )}
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 25, 100]}
              count={count}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={onChangePage}
              onChangeRowsPerPage={onChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>

    </TableContainer>
  );
}

TraineeTable.propTypes = {
  id: propTypes.string.isRequired,
  data: propTypes.arrayOf(propTypes.object).isRequired,
  columns: propTypes.arrayOf(propTypes.object).isRequired,
  actions: propTypes.arrayOf(propTypes.object).isRequired,
  order: propTypes.string,
  orderBy: propTypes.string.isRequired,
  onSort: propTypes.func.isRequired,
  onSelect: propTypes.func.isRequired,
  count: propTypes.number.isRequired,
  page: propTypes.number,
  onChangePage: propTypes.func.isRequired,
  rowsPerPage: propTypes.number,
  onChangeRowsPerPage: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,

};
TraineeTable.defaultProps = {
  order: 'asc',
  page: 0,
  rowsPerPage: 100,
};

export default withLoaderAndMessage(TraineeTable);
