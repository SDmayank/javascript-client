import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { PropTypes } from 'prop-types';
import { AddDialog } from './component';
import styles from './component/AddDialog/style';

class Trainee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

    handleClickOpen = () => {
      this.setState({ open: true }, () => { });
    };

    handleClose = () => {
      this.setState({ open: false }, () => { });
    };

    handleSumbit = (data) => {
      this.setState({ open: false }, () => { });
      // eslint-disable-next-line no-console
      console.log(data);
    };

    render() {
      const { open } = this.state;
      const { classes } = this.props;
      return (
        <>
          <div className={classes.marginButton}>
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
              ADD TRAINEE
            </Button>
          </div>
          <AddDialog open={open} onClose={this.handleClose} onSubmit={() => this.handleSumbit} />
        </>
      );
    }
}
Trainee.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(styles)(Trainee);
