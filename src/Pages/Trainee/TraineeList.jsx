/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/prop-types */
import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import {
  Link,
} from 'react-router-dom';
import { AddDialog, TraineeTable } from './component';
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

class Trainee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selected: '',
      orderBy: '',
      order: '',
    };
  }

  onSortHandle = (field) => () => {
    const { order } = this.state;
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  }

  handleSelect = (event, data) => {
    this.setState({ selected: event.target.value }, () => console.log(data));
  };

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
    const { open, order, orderBy } = this.state;
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
          data={trainees}
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
          orderBy={orderBy}
          order={order}
          onSort={this.onSortHandle}
          onSelect={this.handleSelect}
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
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  order: PropTypes.oneOf(['asc', 'desc']),
  orderBy: PropTypes.string,
};
Trainee.defaultProps = {
  orderBy: '',
  order: 'asc',
};
export default withStyles(useStyles)(Trainee);
