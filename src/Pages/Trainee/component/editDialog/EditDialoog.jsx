import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';


export default class EditOpenDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      touched: {
        name: false,
        email: false,
      },
    };
  }

  handleNameChange = (event) => {
    const { touched } = this.setState;
    this.setState({
      name: event.target.value,
    }, () => {
      this.setState({
        touched: {
          ...touched,
          name: true,
        },
      });
    });
  };

  handleEmailChange = (event) => {
    const { touched } = this.state;
    this.setState({
      email: event.target.value,
    }, () => {
      this.setState({
        touched: {
          ...touched,
          email: true,
        },
      });
    });
  };


  isTouched = (value) => {
    const { touched } = this.state;
    const { data } = this.props;
    this.setState({
      touched: {
        ...touched,
        [value]: true,

      },
    }, () => {
      Object.keys(data).forEach((keys) => {
        if (!touched[keys]) {
          this.setState({
            [keys]: data[keys],
          });
        }
      });
    });
  }

  formReset = () => {
    this.setState({
      name: '',
      email: '',
      touched: {},
    });
  }


  render() {
    const {
      open, onClose, onSubmit, data,
    } = this.props;
    const { name, email } = this.state;
    return (
      <div>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Item</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={this.handleNameChange}
                  autoFocus
                  // eslint-disable-next-line react/prop-types
                  defaultValue={data.name}
                  margin="dense"
                  id="name"
                  label="Name"
                  type="name"
                  onBlur={() => this.isTouched('name')}
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={this.handleEmailChange}
                  autoFocus
                  // eslint-disable-next-line react/prop-types
                  defaultValue={data.email}
                  margin="dense"
                  id="name"
                  label="Email Address"
                  type="email"
                  onBlur={() => this.isTouched('email')}
                  fullWidth
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => { onSubmit({ name, email }); this.formReset(); }}
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

EditOpenDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
