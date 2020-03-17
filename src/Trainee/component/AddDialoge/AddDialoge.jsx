import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import * as yup from 'yup';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import PersonIcon from '@material-ui/icons/Person';
import PropTypes from 'prop-types';
import EmailIcon from '@material-ui/icons/Email';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grid from '@material-ui/core/Grid';

const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(3),
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$/,
    'Must contain 8 characters at least one uppercase one lowercase and one number'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
});

const useStyles = () => ({
  root: {
    flexGrow: 1,
  },
});

class FormDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      hasError: false,
      error: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      touched: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
    };
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  hasErrors = () => {

    const { hasError } = this.state;
    console.log("has error", hasError);
    schema
      .isValid(this.state)

      .then((valid) => {
        if (!valid !== hasError) {
          console.log("vaild", valid);
          this.setState({ hasError: !valid });
        }
      });
  }

  isTouched = (field) => {
    const { touched } = this.state;
    console.log('field', field);
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  }

  getError = (field) => {
    const { error, touched } = this.state;
    if (touched[field]) {
      schema.validateAt(field, this.state).then(() => {
        if (error[field] !== '') {
          this.setState({
            error: {
              ...error,
              [field]: '',
            },
          });
        }
      }).catch((err) => {
        if (err.message !== error[field]) {
          this.setState({
            error: {
              ...error,
              [field]: err.message,
            },
          });
        }
      });
    }
    return error[field];
  }

  render() {
    const { classes } = this.props;
    const { open, onClose, onSubmit } = this.props;
    const {
      name, email, password, confirmPassword, hasError, error,
    } = this.state;
    this.hasErrors();
    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add TRAINEE</DialogTitle>
        <DialogContent className={classes.useStyles}>
          <DialogContentText>
            Add your trainee details
          </DialogContentText>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                label="Name "
                id="Name"
                value={name}
                error={!!error.name}
                fullWidth
                onChange={this.handleChange('name')}
                helperText={this.getError('name')}
                onBlur={() => this.isTouched('name')}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><PersonIcon /></InputAdornment>,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email Address"
                id="email"
                value={email}
                error={!!error.email}
                fullWidth
                onChange={this.handleChange('email')}
                helperText={this.getError('email')}
                onBlur={() => this.isTouched('email')}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Password"
                id="outlined-start-adornment"
                type="password"
                value={password}
                error={!!error.password}
                fullWidth
                onChange={this.handleChange('password')}
                helperText={this.getError('password')}
                onBlur={() => this.isTouched('password')}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><VisibilityOff /></InputAdornment>,
                }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Confirm Password"
                id="password"
                type="password"
                error={!!error.confirmPassword}
                fullWidth
                value={confirmPassword}
                onChange={this.handleChange('confirmPassword')}
                helperText={this.getError('confirmPassword')}
                onBlur={() => this.isTouched('confirmPassword')}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><VisibilityOff /></InputAdornment>,
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
            variant="contained"
            color="primary"
            onClick={() => onSubmit()({
              name, email, password, confirmPassword,
            })}
            disabled={hasError}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(useStyles)(FormDialog);

FormDialog.propTypes = {
  // value: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
// import React from 'react';
// import Button from '@material-ui/core/Button';
// import * as yup from 'yup';
// import TextField from '@material-ui/core/TextField';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import PersonIcon from '@material-ui/icons/Person';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import EmailIcon from '@material-ui/icons/Email';
// import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
// import { withStyles } from '@material-ui/core/styles';
// import PropTypes from 'prop-types';
// import { Grid } from '@material-ui/core';

// const styling = () => ({
//   Content: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   Text: {
//     margin: 15,
//   },
//   PasswordText: {
//     display: 'flex',
//     flexDirection: 'row',
//   },
//   style: {
//     felx: 1,
//   },
// });

// class FormDialog extends React.Component {
//   // classes = useStyles();

//   constructor(props) {
//     super(props);
//     this.schema = yup.object().shape({
//       name: yup.string().required('Please enter your Name').min(3, 'Please enter no less than 3 characters'),
//       emailAddress: yup.string().required('Please select an emailAddress').matches(/([a-zA-Z0-9_\-.]+)@successive[.]tech$/gmi, 'please enter vaild email'),
//       password: yup.string().min(8, 'Password must be of 8 characters').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$/, 'please Choose a strong password')
//         .required('Password is required'),
//       confirmPassword: yup.string()
//         .oneOf([yup.ref('password'), null], 'Passwords must match')
//         .min(8, 'must be of atleast 8 characters')
//         .required('confirm password is required'),
//     });
//     this.state = {
//       name: '',
//       emailAddress: '',
//       password: '',
//       confirmPassword: '',
//       touched: {
//         name: false,
//         emailAddress: false,
//         password: false,
//         confirmPassword: false,
//       },
//     };
//   }

//   hasErrors = () => {
//     try {
//       this.schema.validateSync(this.state);
//     } catch (err) {
//       return true;
//     }
//     return false;
//   }

//   isTouched = (field) => {
//     const { touched } = this.state;
//     this.setState({
//       touched: {
//         ...touched,
//         [field]: true,
//       },
//     });
//   }

//   onChangeNameField = (event) => {
//     this.setState({ name: event.target.value });
//   }

//   onChangeEmailField = (event) => {
//     this.setState({ emailAddress: event.target.value });
//   }

//   onChangePasswordField = (event) => {
//     this.setState({ password: event.target.value });
//   }

//   onChangeConfirmPasswordField = (event) => {
//     this.setState({ confirmPassword: event.target.value });
//   }

//   getError = (field) => {
//     const { touched } = this.state;
//     if (touched[field] && this.hasErrors) {
//       try {
//         // console.log(this.state.touched[field],"sddfasfsdafbdsan");
//         this.schema.validateSyncAt(field, this.state);
//         return false;
//       } catch (err) {
//         return true;
//       }
//     }
//     return false;
//   };

//   getErrors = (field) => {
//     const { touched } = this.state;
//     if (touched[field] && this.hasErrors) {
//       try {
//         // console.log(this.state.touched[field],"sddfasfsdafbdsan");
//         this.schema.validateSyncAt(field, this.state);
//         return false;
//       } catch (err) {
//         return err.message;
//       }
//     }
//     return false;
//   };

//   render() {
//     const { classes } = this.props;
//     console.log(this.state);
//     const { open, onClose, onSubmit } = this.props;
//     return (

//       <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
//         <DialogTitle id="form-dialog-title"><b>Add Trainee</b></DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Enter your Trainee Details.
//           </DialogContentText>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 onChange={this.onChangeNameField}
//                 helperText={this.getErrors('name')}
//                 onBlur={() => this.isTouched('name')}
//                 error={this.getError('name')}
//                 className={classes.Text}
//                 required
//                 fullWidth
//                 style={{ margin: '10px' }}
//                 id="outlined-required"
//                 label="Name"
//                 variant="outlined"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <PersonIcon />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <TextField
//                 className={classes.Text}
//                 onChange={this.onChangeEmailField}
//                 error={this.getError('emailAddress')}
//                 helperText={this.getErrors('emailAddress')}
//                 onBlur={() => this.isTouched('emailAddress')}
//                 required
//                 fullWidth
//                 style={{ margin: '10px' }}
//                 id="outlined-required"
//                 label="Email Address"
//                 variant="outlined"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <EmailIcon />
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>

//             <Grid item xs={6}>
//               <TextField
//                 onChange={this.onChangePasswordField}
//                 error={this.getError('password')}
//                 helperText={this.getErrors('password')}
//                 onBlur={() => this.isTouched('password')}
//                 // className={classes.Text}
//                 required

//                 style={{ margin: '10px' }}
//                 id="outlined-password-input"
//                 label="Password"
//                 type="password"
//                 autoComplete="current-password"
//                 variant="outlined"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <VisibilityOffIcon />
//                     </InputAdornment>
//                   ),
//                 }}
//               />

//             </Grid>
//             <Grid item xs={6}>


//               <TextField
//                 onChange={this.onChangeConfirmPasswordField}
//                 error={this.getError('confirmPassword')}
//                 helperText={this.getErrors('confirmPassword')}
//                 onBlur={() => this.isTouched('confirmPassword')}
//                 className={classes.Text}
//                 required

//                 style={{ margin: '10px' }}
//                 id="outlined-password2-input"
//                 label="confirmPassword"
//                 type="password"
//                 autoComplete="current-password"
//                 variant="outlined"
//                 InputProps={{
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <VisibilityOffIcon />
//                     </InputAdornment>
//                   ),
//                 }}
//               />


//             </Grid>
//           </Grid>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={onClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={onSubmit} disabled={this.hasErrors()} color="primary">
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>

//     );
//   }
// }
// FormDialog.propTypes = {
//   open: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
//   onSubmit: PropTypes.func.isRequired,
//   classes: PropTypes.objectOf(PropTypes.string).isRequired,
// };
// export default withStyles(styling)(FormDialog);
