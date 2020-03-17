import React from 'react';
import Button from '@material-ui/core/Button';
import FormDialog from './component/index';

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
    console.log(data);
  };

  render() {
    const { open } = this.state;
    return (
      <>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          ADD TRAINEE
        </Button>
        <FormDialog open={open} onClose={this.handleClose} onSubmit={() => this.handleSumbit} />
      </>
    );
  }
}

export default Trainee;
