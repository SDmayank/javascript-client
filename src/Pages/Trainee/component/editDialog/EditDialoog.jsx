import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as yup from 'yup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { MyContext } from '../../../../contexts';

import callApi from '../../../../libs';

const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(3),
  email: yup.string().email().required('Email is required'),
});

export default class EditOpenDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Email: '',
      loading: false,
      error: {
        name: '',
        email: '',
      },
      touched: {
        name: false,
        email: false,
      },
    };
  }

  getError = (validateField) => {
    const { touched } = this.state;
    if (touched[validateField] && this.hasErrors()) {
      try {
        schema.validateSyncAt(validateField, this.state);
        return '';
      } catch (err) {
        return String(err.errors);
      }
    }
    return '';
  };

  hasErrors = () => {
    try {
      schema.validateSync(this.state);
    } catch (err) {
      return true;
    }
    return false;
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

  putData = (value) => {
    const {
      name, email,
    } = this.state;
    const { onSubmit, data } = this.props;
    this.setState({ loading: true }, async () => {
      const response = await callApi('put', 'trainee', {
        name,
        email,
        // password: 'Training@123',
        id: data.originalId,
      });
      this.setState({ loading: false }, () => {
        if (response.status === 'ok') {
          onSubmit()('EditOpen', {
            name, email,
          });
          this.formReset();
          value.openSnackBar(response.message, 'success');
        } else {
          value.openSnackBar(response.message, response.status);
        }
      });
    });
  }

  formReset = () => {
    if (JSON.stringify(this.state) !== JSON.stringify(this.baseState)) {
      this.setState(this.baseState);
    }
  }


  render() {
    const {
      open, onClose, data,
    } = this.props;
    const { loading } = this.state;
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
                  helperText={this.getError('name')}
                  error={!!this.getError('name')}
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
                  helperText={this.getError('email')}
                  error={!!this.getError('email')}
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
            <MyContext.Consumer>
              {(value) => (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={this.hasErrors()}
                    onClick={() => {
                      this.putData(value);
                    }}
                  >
                    {' '}
                    {loading && (
                      <CircularProgress color="secondary" />
                    )}
                    {loading && <span> Adding....</span>}
                    {!loading && <span>Submit</span>}
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

EditOpenDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
