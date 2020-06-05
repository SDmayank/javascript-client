/* eslint-disable no-console */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import propTypes from 'prop-types';
import * as moment from 'moment';
import { MyContext } from '../../../../contexts';


export default class DeleteOpenDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value }, () => console.log(this.state));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSnackBarMessage = (data, openSnackBar) => {
    const date = '2019-02-14T18:15:11.778Z';
    const isAfter = (moment(data.Date).isAfter(date));
    if (isAfter) {
      this.setState({
        message: 'This is a success Message! ',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'success');
      });
    } else {
      this.setState({
        message: 'This is an error',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'error');
      });
    }
  }

  render() {
    const {
      open, onClose, onSubmit, data,
    } = this.props;
    return (
      <div>
        <Dialog open={open} onClose={() => this.handleClose()} aria-labelledby="form-dialog-title" fullWidth>
          <DialogTitle id="form-dialog-title">Delete Item</DialogTitle>
          <DialogContentText>
            Do you really want to remove this item?
          </DialogContentText>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <MyContext.Consumer>
              {(value) => {
                const { openSnackBar } = value;
                return (
                  <>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        onSubmit({ data });
                        this.handleSnackBarMessage(data, openSnackBar);
                      }}
                    >
                      Delete
                    </Button>
                  </>
                );
              }}
            </MyContext.Consumer>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DeleteOpenDialog.propTypes = {
  open: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
  onSubmit: propTypes.func.isRequired,
  data: propTypes.objectOf(propTypes.string).isRequired,
};
