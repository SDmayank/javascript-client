import React from 'react';
import Button from '@material-ui/core/Button';
import FormDialog from './component/AddDialoge/AddDialoge';

class Trainee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  render() {
    const handleClickOpen = () => {
      this.setState({ open: true }, () => { console.log(this.state); });
    };
    const handleClose = () => {
      this.setState({ open: false }, () => { console.log(this.state); });
    };
    const { open } = this.state;
    return (
      <>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          ADD TRAINEE
        </Button>
        <FormDialog open={open} onClose={handleClose} onSubmit={handleClose} />
      </>
    );
  }
}

export default Trainee;
