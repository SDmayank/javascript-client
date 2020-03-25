/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { AddDialog } from './component';
import trainees from './data/trainee';

const useStyles = (theme) => ({
  button: {
    marginTop: theme.spacing(2),
    align: 'Right',

  },
  buttonPosition: {
    display: 'flex',
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
    width: '100%',
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
    };
  }

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

  onSubmit = () => {
    const { open } = this.state;
    this.setState({ open: false }, () => {
    });
    return open;
  }

  render() {
    const { open } = this.state;
    const { match: { url } } = this.props;
    const { classes } = this.props;

    return (
      <div className={classes.paper}>
        <div className={classes.buttonPosition}>
          <Button variant="outlined" color="primary" onClick={this.onOpen} className={classes.button}>
            ADD TRAINEE
          </Button>
        </div>
        <AddDialog open={open} onClose={this.onClose} onSubmit={() => this.onSubmit} />
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
};

export default withStyles(useStyles)(Trainee);
