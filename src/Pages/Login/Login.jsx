import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
// import TextField from '@material-ui/core/TextField';
import * as yup from 'yup';
import PropTypes from 'prop-types';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
// import EmailIcon from '@material-ui/icons/Email';
// import InputAdornment from '@material-ui/core/InputAdornment';
import { Box } from '@material-ui/core';
import { validKey } from '../Trainee';
import LoginFields from './loginComponents';
import { loginIcons } from '../../config/constant';


const schema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
});

const useStyles = (theme) => ({
  button: {
    marginTop: theme.spacing(16),
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    // marginTop: '40%'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      hasError: false,
      error: {
        email: '',
        password: '',
      },
      touched: {
        email: false,
        password: false,
      },
    };
  }

  handleChange = (prop) => (event) => {
    this.setState({ [prop]: event.target.value });
  };

  hasErrors = () => {
    const { hasError } = this.state;
    schema
      .isValid(this.state)
      .then((valid) => {
        if (!valid !== hasError) {
          this.setState({ hasError: !valid });
        }
      });
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
    const {
      hasError,
    } = this.state;
    this.hasErrors();
    const { classes } = this.props;
    const result = Object.keys(loginIcons).map((key) => (
      <LoginFields
        helperText={this.getError(key)}
        label={key}
        error={!!this.getError(key)}
        onChange={this.handleChange(key)}
        onBlur={() => this.isTouched(key)}
        icons={loginIcons[key]}
        type={validKey(key)}
      />
    ));
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box mx="auto" bgcolor="background.paper" p={2} className={classes.box} boxShadow={3} marginTop="30%">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Log in
            </Typography>
            <form className={classes.form} noValidate>
              <div>
                {result[0]}
              </div>
              &nbsp;
              <div>
                {result[1]}
              </div>
              &nbsp;
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={hasError}
              >
                Sign In
              </Button>
            </form>
          </div>
        </Box>
      </Container>
    );
  }
}
Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(useStyles)(Login);
