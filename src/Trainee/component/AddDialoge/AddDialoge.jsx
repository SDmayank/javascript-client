
import React from 'react';
import Button from '@material-ui/core/Button';
import * as yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonIcon from '@material-ui/icons/Person';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

const styling = () => ({
  Content: {
    display: 'flex',
    flexDirection: 'column',
  },
  Text: {
    margin: 15,
  },
  PasswordText: {
    display: 'flex',
    flexDirection: 'row',
  },
  style: {
    felx: 1,
  },
});

class FormDialog extends React.Component {
  // classes = useStyles();

  constructor(props) {
    super(props);
    this.schema = yup.object().shape({
      name: yup.string().required('Please enter your Name').min(3, 'Please enter no less than 3 characters'),
      emailAddress: yup.string().required('Please select an emailAddress').matches(/([a-zA-Z0-9_\-.]+)@successive[.]tech$/gmi, 'please enter vaild email'),
      password: yup.string().min(8, 'Password must be of 8 characters')
        .required('Password is required'),
      confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .min(8, 'must be of atleast 8 characters')
        .required('confirm password is required'),
    });
    this.state = {
      name: '',
      emailAddress: '',
      password: '',
      confirmPassword: '',
      touched: {
        name: false,
        emailAddress: false,
        password: false,
        confirmPassword: false,
      },
    };
  }

  hasErrors = () => {
    try {
      this.schema.validateSync(this.state);
    } catch (err) {
      return true;
    }
    return false;
  }

  isTouched = (field) => {
    const { touched } = this.state;
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  }

  onChangeNameField = (event) => {
    this.setState({ name: event.target.value });
  }

  onChangeEmailField = (event) => {
    this.setState({ emailAddress: event.target.value });
  }

  onChangePasswordField = (event) => {
    this.setState({ password: event.target.value });
  }

  onChangeConfirmPasswordField = (event) => {
    this.setState({ confirmPassword: event.target.value });
  }


  getErrors = (field) => {
    const { touched } = this.state;
    if (touched[field] && this.hasErrors) {
      try {
        // console.log(this.state.touched[field],"sddfasfsdafbdsan");
        this.schema.validateSyncAt(field, this.state);
        return false;
      } catch (err) {
        return err.message;
      }
    }
    return false;
  };

  render() {
    const { classes } = this.props;
    const { open, onClose, onSubmit } = this.props;
    const {
      name, emailAddress, password, confirmPassword,
    } = this.state;
    return (

      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"><b>Add Trainee</b></DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your Trainee Details.
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                onChange={this.onChangeNameField}
                helperText={this.getErrors('name')}
                onBlur={() => this.isTouched('name')}
                error={!!this.getErrors('name')}
                className={classes.Text}
                required
                fullWidth
                style={{ margin: '10px' }}
                id="outlined-required"
                label="Name"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className={classes.Text}
                onChange={this.onChangeEmailField}
                error={!!this.getErrors('emailAddress')}
                helperText={this.getErrors('emailAddress')}
                onBlur={() => this.isTouched('emailAddress')}
                required
                fullWidth
                style={{ margin: '10px' }}
                id="outlined-required"
                label="Email Address"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                onChange={this.onChangePasswordField}
                error={!!this.getErrors('password')}
                helperText={this.getErrors('password')}
                onBlur={() => this.isTouched('password')}
                // className={classes.Text}
                required

                style={{ margin: '10px' }}
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VisibilityOffIcon />
                    </InputAdornment>
                  ),
                }}
              />

            </Grid>
            <Grid item xs={6}>


              <TextField
                onChange={this.onChangeConfirmPasswordField}
                error={!!this.getErrors('confirmPassword')}
                helperText={this.getErrors('confirmPassword')}
                onBlur={() => this.isTouched('confirmPassword')}
                className={classes.Text}
                required

                style={{ margin: '10px' }}
                id="outlined-password2-input"
                label="confirmPassword"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VisibilityOffIcon />
                    </InputAdornment>
                  ),
                }}
              />


            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => onSubmit()({
              name, emailAddress, password, confirmPassword,
            })}
            disabled={this.hasErrors()}
            color="primary"
            data={this.state}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

    );
  }
}
FormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(styling)(FormDialog);
