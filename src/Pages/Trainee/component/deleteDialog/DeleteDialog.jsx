/* eslint-disable no-console */
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as moment from 'moment';
import { MyContext } from '../../../../contexts';
import callApi from '../../../../libs';


export default class DeleteOpenDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  deleteData = (value) => {
    const { onSubmit, data } = this.props;
    const url = `trainee/${data.originalId}`;
    this.setState({ loading: true }, async () => {
      const response = await callApi('delete', url, {});
      this.setState({ loading: false }, () => {
        if (response === 'ok') {
          onSubmit()(data);
          value.openSnackBar(response.message, 'success');
        } else {
          value.openSnackBar(response.message, response.status);
        }
      });

      // if(respone == 'ok'){
      //   const
      // }
    });
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value }, () => console.log(this.state));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSnackBarMessage = (data, openSnackBar) => {
    console.log('sfdsfdsfasajdg');
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
      open, onClose,
    } = this.props;
    const { loading } = this.state;
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
              {(value) => (
                <>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      this.deleteData(value);
                    }}
                  >
                    {loading && (<CircularProgress color="secondary" />)}
                    {loading && <span> Deleting....</span>}
                    {!loading && <span>Delete</span>}

                  </Button>
                </>
              )}
            </MyContext.Consumer>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DeleteOpenDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
