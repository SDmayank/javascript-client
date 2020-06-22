/* eslint-disable radix */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-prop-types */
import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { graphql } from '@apollo/react-hoc';
import { Mutation } from '@apollo/react-components';
import propTypes from 'prop-types';
import * as moment from 'moment';
import {
  Link,
} from 'react-router-dom';
import {
  AddDialog, TraineeTable, EditOpenDialog, DeleteOpenDialog,
} from './component';
import callApi from '../../libs';
import { MyContext } from '../../contexts';
import trainees from './data/trainee';
import { GET_TRAINEE } from './query';
import { CREATE_TRAINEE, EDIT_TRAINEE, DELETE_TRAINEE } from './mutation';
import { UPDATE_TRAINEE_SUB, DELETE_TRAINEE_SUB } from './subscription';

const useStyles = (theme) => ({
  button: {
    marginTop: theme.spacing(2),
  },
  buttonPosition: {
    display: 'flex',

    justifyContent: 'flex-end',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Trainee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selected: '',
      orderBy: '',
      order: '',
      EditOpen: false,
      DelOpen: false,
      page: 0,
      rowsPerPage: 83,
      editData: {},
      deleteData: {},
      tableData: '',
      loading: false,
    };
  }

  openDialog = (status) => {
    this.setState({ open: status });
  }

  handleClose = () => {
    this.setState({ EditOpen: false });
  }

  handleEditDialogOpen = (data) => {
    this.setState({ EditOpen: true, editData: data }, () => {

    });
  }

  handleRemoveDialogOpen = (data) => {
    this.setState({ DelOpen: true, deleteData: data }, () => { console.log(this.state); });
  }

  onCreate = (openSnackbar, createTrainee) => async (data) => {
    try {
      console.log('Create Data', data);
      const response = await createTrainee({ variables: data });
      console.log('Response', response);
      this.setState({ open: false }, () => {
        openSnackbar('Trainee Added Successfully', 'success');
      });
    } catch (error) {
      openSnackbar(error.message, 'error');
    }
  }

  componentDidMount = () => {
    console.log('in component di mount');
    const { data: { subscribeToMore } } = this.props;
    subscribeToMore({
      document: UPDATE_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { getAll: { records } } = prev;
        const { data: { traineeUpdated } } = subscriptionData;
        const updatedRecords = [...records].map((record) => {
          if (record.originalId === traineeUpdated.originalId) {
            return {
              ...record,
              ...traineeUpdated,
            };
          }
          return record;
        });
        return {
          getAll: {
            ...prev.getAll,
            count: prev.getAll.count,
            records: updatedRecords,
          },
        };
      },
    });
    subscribeToMore({
      document: DELETE_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { getAll: { records } } = prev;
        console.log('records', records);
        const { data: { traineeDeleted } } = subscriptionData;
        const updatedRecords = [...records].filter((record) => record.originalId !== traineeDeleted);
        return {
          getAll: {
            ...prev.getAll,
            count: prev.getAll.count - 1,
            records: updatedRecords,
          },
        };
      },
    });
  }

  onUpdate = (openSnackbar, updateTrainee) => (data) => {
    console.log('Edit Data', data);
    updateTrainee({ variables: data }).then((response) => {
      console.log('Response', response);

      this.setState({ EditOpen: false, data: {} }, () => {
        openSnackbar('Trainee Updated Successfully', 'success');
      });
    }).catch((error) => {
      openSnackbar(error.message, 'error');
    });
  }

  onDelete = (openSnackbar, deleteTrainee, refetch, count) => (data) => {
    const { rowsPerPage, page } = this.state;
    const result = count - (page * rowsPerPage);
    console.log('Delete Data', data);
    deleteTrainee({ variables: data }).then((response) => {
      console.log('Response', response);
      if (result === 1) {
        this.setState({ DelOpen: false, data: {}, page: (page - 1) });
      } else {
        this.setState({ DelOpen: false, data: {} });
      }
      openSnackbar('Trainee deleted Successfully', 'success');
    }).catch((error) => {
      openSnackbar(error.message, 'error');
    });
  }

  onSortHandle = (event, property) => {
    const { order, orderBy } = this.state;
    const isAsc = orderBy === property && order === 'asc';
    if (isAsc) {
      this.setState({ order: 'desc', orderBy: property });
    } else {
      console.log('befoire', isAsc);
      this.setState({ order: 'asc', orderBy: property });
    }
  };

  handleSelect = (event, data) => {
    this.setState({ selected: event.target.value }, () => console.log(data));
  };

  // handleChangePage = (event, newPage) => {
  //   this.setState({
  //     page: newPage,
  //   });
  // };

  onChangeRowsPerPage = (refetch) => (event) => {
    console.log(typeof (event.target.value));
    const option = parseInt(event.target.value);
    this.setState({
      rowsPerPage: option,
      page: 0,

    }, () => {
      const { page, rowsPerPage } = this.state;
      console.log('page,rows', page, rowsPerPage);
      refetch({ limit: rowsPerPage, skip: rowsPerPage * page });
    });
  };

  handleChangePage = (refetch) => (event, newPage) => {
    const { rowsPerPage } = this.state;
    this.setState({ page: newPage }, () => {
      refetch({ limit: rowsPerPage, skip: rowsPerPage * newPage });
    });
  }

  getFormattedDate = (date) => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')

  onOpen = () => {
    let { open } = this.state;
    open = true;
    this.setState({ open });
  };

  onClose = () => {
    let { DelOpen } = this.state;
    DelOpen = false;
    this.setState({ DelOpen });
  };

  onCloseAddDialoge = () => {
    let { open } = this.state;
    open = false;
    this.setState({ open });
  }

  render() {
    const {
      orderBy, order, open, EditOpen, DelOpen, page, rowsPerPage, editData, deleteData, tableData,
    } = this.state;
    /* doubt */
    const { match: { url } } = this.props;
    const { openSnackBar } = this.context;
    const variables = { limit: rowsPerPage, skip: rowsPerPage * page };
    const {
      classes,
      data: {
        getAll: { count = 0, records = [] } = {},
        refetch,
        loading,
      },
    } = this.props;
    return (
      <div className={classes.paper}>
        <div className={classes.buttonPosition}>
          <Button variant="outlined" color="primary" onClick={this.onOpen} className={classes.button}>
            ADD TRAINEEList
          </Button>
        </div>
        <Mutation mutation={CREATE_TRAINEE} refetchQueries={[{ query: GET_TRAINEE, variables }]}>
          {(createTrainee, loader = { loading }) => (

            <AddDialog open={open} onClose={this.onCloseAddDialoge} loader={loader} onSubmit={this.onCreate(openSnackBar, createTrainee)} />

          )}
        </Mutation>

        <TraineeTable
          id="id"
          data={records}
          columns={
            [
              {
                field: 'name',
                label: 'Name',
                align: 'center',
              },
              {
                field: 'email',
                label: 'Email Address',
                align: 'center',
                Format: (value) => value && value.toUpperCase(),
              },
              {
                field: 'Date',
                label: 'Date',
                aligin: 'right',
                Format: this.getFormattedDate,
              },
            ]
          }
          actions={
            [{
              icon: <EditIcon />,
              handler: this.handleEditDialogOpen,
              aligin: 'left',
            },
            {
              icon: <DeleteIcon />,
              handler: this.handleRemoveDialogOpen,
              aligin: 'left',
            }]
          }

          orderBy={orderBy}
          order={order}
          onSort={this.onSortHandle}
          onSelect={this.handleSelect}
          count={count}
          page={page}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={this.onChangeRowsPerPage(refetch)}
          onChangePage={this.handleChangePage(refetch)}
          loading={loading}
          dataLength={records.length}

        />
        <Mutation mutation={EDIT_TRAINEE}>
          {(updateTrainee, loader = { loading }) => (
            <EditOpenDialog
              data={editData}
              onClose={this.handleClose}
              onSubmit={this.onUpdate(openSnackBar, updateTrainee)}
              open={EditOpen}
              loader={loader}
            />
          )}
        </Mutation>
        <Mutation mutation={DELETE_TRAINEE}>
          {(deleteTrainee, loader = { loading }) => (
            <DeleteOpenDialog
              data={deleteData}
              onClose={this.onClose}
              onSubmit={this.onDelete(openSnackBar, deleteTrainee, refetch, count)}
              open={DelOpen}
              loader={loader}
            />
          )}
        </Mutation>
        <ul>
          {
            trainees && trainees.length && trainees.map((trainee) => (
              <Fragment key={trainee.id}>
                <li>
                  <Link to={`${url}/${trainee.id}`}>{trainee.name}</Link>
                </li>
              </Fragment>
            ))
          }
        </ul>
      </div>
    );
  }
}

Trainee.propTypes = {
  match: propTypes.objectOf(propTypes.any).isRequired,
  classes: propTypes.objectOf(propTypes.any).isRequired,
  data: propTypes.objectOf(propTypes.any).isRequired,
};

export default compose(
  withStyles(useStyles),
  graphql(GET_TRAINEE, {
    options: { variables: { limit: 84, skip: 0 } },
  }),
)(Trainee);
Trainee.contextType = MyContext;
