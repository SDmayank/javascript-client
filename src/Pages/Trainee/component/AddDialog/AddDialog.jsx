import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Button,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import callApi from '../../../../libs/utils/api';

import { MyContext } from '../../../../contexts/index';
import { schema, icons } from '../../../../config/constant';
import styles from './style';
import validKey from '../DialogComponents';
import Fields from '../../../mainComponent';

class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Email: '',
      Password: '',
      loading: false,
      confirmPassword: '',
      touched: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
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

  isTouched = (field) => {
    const { touched } = this.state;
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  }

  resetForm = () => {
    if (JSON.stringify(this.state) !== JSON.stringify(this.baseState)) {
      this.setState(this.baseState);
    }
  }

  handleChange = (key) => ({ target: { value } }) => {
    this.setState({ [key]: value });
  }

  fetchData = (value) => {
    const {
      name, email, password,
      confirmPassword,
    } = this.state;
    const { onSubmit } = this.props;
    this.setState({ loading: true }, async () => {
      const response = await callApi('post', 'trainee', {
        name,
        email,
        password,
      });
      this.setState({ loading: false }, () => {
        if (response.status === 'ok') {
          onSubmit('open', {
            name, email, password, confirmPassword,
          });
          this.resetForm();
          value.openSnackBar(response.message, 'success');
        } else {
          value.openSnackBar(response.message, response.status);
        }
      });
    });
  }

  render() {
    const {
      open, onClose, classes,
    } = this.props;
    const { loading } = this.state;
    const result = Object.keys(icons).map((key) => (
      <Fields
        helperText={this.getError(key)}
        label={key}
        error={!!this.getError(key)}
        onChange={this.handleChange(key)}
        onBlur={() => this.isTouched(key)}
        icons={icons[key]}
        type={validKey(key)}
      />
    ));

    return (
      <>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter your trainee details.
            </DialogContentText>
            <div>
              {result[0]}
            </div>
            &nbsp;
            <div>
              {result[1]}
            </div>
            &nbsp;
            <div className={classes.upparTextfield}>
              <div className={classes.lowerTextfield}>
                {result[2]}
              </div>
              &nbsp;
              &nbsp;
              <div className={classes.lowerTextfield}>
                {result[3]}
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              CANCEL
            </Button>
            <MyContext.Consumer>
              {(value) => (
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={loading || this.hasErrors()}
                  onClick={() => {
                    this.fetchData(value);
                  }}
                >
                  {loading && (
                    <CircularProgress color="secondary" />
                  )}
                  {loading && <span> Adding....</span>}
                  {!loading && <span>Submit</span>}
                </Button>
              )}
            </MyContext.Consumer>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(AddDialog);
