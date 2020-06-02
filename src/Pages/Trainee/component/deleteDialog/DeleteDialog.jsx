import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';

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
            <Button
              onClick={() => onSubmit({
                data,
              })}
              color="primary"
            >
              Delete
            </Button>
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
