/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable react/no-unused-prop-types */
import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
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
      rowsPerPage: 20,
      editData: {},
      deleteData: {},
      tableData: '',
      loading: false,
      count: '',
    };
  }


  componentDidMount() {
    const { rowsPerPage, page } = this.state;
    console.log('didmount');
    this.setState({ loading: true }, async () => {
      const response = await callApi('get', 'trainee', {
        limit: rowsPerPage,
        skip: page,
      });
      console.log('response', response);
      this.setState({ loading: false }, () => {
        if (response.status === 'ok') {
          this.setState({ count: response.data.count, tableData: response.data.records });
        } else {
          const value = this.context;
          value.openSnackBar(response.message, response.status);
        }
      });
    });
  }

  openDialog = (status) => {
    this.setState({ open: status });
  }

  handleClose = () => {
    console.log('mayank');
    this.setState({ EditOpen: false });
  }

  handleEditClick = (name, email) => {
    console.log('mayank');
    this.setState({ EditOpen: false });
    console.log('Created Trainee', name, email);
  }

  handleEditDialogOpen = (data) => {
    this.setState({ EditOpen: true, editData: data }, () => {

    });
  }

  handleRemoveDialogOpen = (data) => {
    this.setState({ DelOpen: true, deleteData: data }, () => { console.log(this.state); });
  }

  handleDeleteClick = (data) => {
    this.setState({ DelOpen: false }, () => console.log('Deleted Trainee', data.data));
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

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

  handleChangePage = (event, newPage) => {
    console.log('handle change page',newPage)
    const { rowsPerPage } = this.state;
    this.setState({ page: newPage, loading: true }, async () => {
      const response = await callApi('get', 'trainee', {
        limit: rowsPerPage,
        skip: newPage * rowsPerPage,
      });
      this.setState({ loading: false }, () => {
        if (response.status === 'ok') {
          this.setState({ tableData: response.data.records });
        } else {
          const value = this.context;
          value.openSnackBar(response.message, response.status);
        }
      });
    });
  }

  getFormattedDate = (date) => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a')


  onOpen = () => {
    let { open } = this.state;
    open = true;
    this.setState({ open });
  };

  onClose = () => {
    let { open } = this.state;
    open = false;
    this.setState({ open });
  };

  onSubmit = (data) => {
    const { open } = this.state;
    this.setState({ open: false }, () => {
      console.log(data);
    });
    return open;
  }


  render() {
    const {
      orderBy, order, open, EditOpen, DelOpen, page, rowsPerPage, editData, deleteData, loading, tableData, count,
    } = this.state;

    const { match: { url } } = this.props;
    const { classes } = this.props;
    return (
      <div className={classes.paper}>
        <div className={classes.buttonPosition}>
          <Button variant="outlined" color="primary" onClick={this.onOpen} className={classes.button}>
            ADD TRAINEEList
          </Button>
        </div>
        <AddDialog open={open} onClose={this.onClose} onSubmit={() => this.onSubmit} />
        <TraineeTable
          id="id"
          data={tableData}
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
          onChangeRowsPerPage={this.handleChangePage}
          onChangePage={this.handleChangePage}
          loading={loading}
          dataLength={tableData.length}

        />
        <EditOpenDialog
          data={editData}
          onClose={this.handleClose}
          onSubmit={this.handleEditClick}
          open={EditOpen}
        />
        <DeleteOpenDialog
          data={deleteData}
          onClose={this.handleDeleteClick}
          onSubmit={this.handleDeleteClick}
          open={DelOpen}
        />
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
};

export default withStyles(useStyles)(Trainee);
Trainee.contextType = MyContext;
