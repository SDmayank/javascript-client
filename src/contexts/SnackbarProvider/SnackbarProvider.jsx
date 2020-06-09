/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import propTypes from 'prop-types';
import MuiAlert from '@material-ui/lab/Alert';

const MyContext = React.createContext();

class SnackBarProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      status: '',
      open: false,
    };
  }

  handleSnackBar = (message, status) => {
    this.setState({
      message,
      status,
      open: true,
    });
  }

  handleCloseSnackBar = () => {
    this.setState({
      open: false,
    });
  }

  render() {
    const { children } = this.props;
    const { message, status, open } = this.state;
    return (
      <>
        <MyContext.Provider
          value={{
            openSnackBar: this.handleSnackBar,
          }}
        >
          {children}
        </MyContext.Provider>
        <CustomizedSnackbars
          message={message}
          status={status}
          open={open}
          closeSnackBar={this.handleCloseSnackBar}
        />
      </>
    );
  }
}
const Alert = (props) => <MuiAlert elevation={6} variant="filled" {...props} />;

const CustomizedSnackbars = (props) => {
  const {
    open, message, status, closeSnackBar,
  } = props;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    closeSnackBar();
  };
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {status === 'success' ? (
          <Alert onClose={handleClose} severity="success">
            {message}
          </Alert>
        )
          : <Alert onClose={handleClose} severity="error">{message}</Alert>}
      </Snackbar>
    </div>
  );
};

SnackBarProvider.propTypes = {
  children: propTypes.element.isRequired,
};
CustomizedSnackbars.propTypes = {
  open: propTypes.bool.isRequired,
  closeSnackBar: propTypes.func.isRequired,
  status: propTypes.string.isRequired,
  message: propTypes.string.isRequired,
};

export { SnackBarProvider, MyContext };
