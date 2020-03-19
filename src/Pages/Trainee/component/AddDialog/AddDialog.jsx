import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Button,
} from '@material-ui/core';
import { schema, icons } from '../../../../config/constant';
import styles from './style';
import { validKey, Formfields } from '../DialogComponents';

class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Email: '',
      Password: '',
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

  handleChange = (key) => ({ target: { value } }) => {
    this.setState({ [key]: value });
  }

  render() {
    const {
      open, onClose, onSubmit, classes,
    } = this.props;
    const { name, email, password } = this.state;
    const result = Object.keys(icons).map((key) => (
      <Formfields
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
            <Button
              onClick={() => onSubmit()({
                name, email, password,
              })}
              color="primary"
              disabled={this.hasErrors()}
            >
              SUBMIT
            </Button>
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
