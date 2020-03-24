import React from 'react';
import { PropTypes } from 'prop-types';
import {
  withStyles, createMuiTheme, ThemeProvider, Typography,
} from '@material-ui/core';

const styles = () => ({
  Text: {
    color: 'grey',
  },
});

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10,
    fontFamily: [
      'Arial',
    ].join(','),
  },
});
function NotFound(props) {
  const { classes } = props;
  return (
    <>
      <ThemeProvider theme={theme}>
        <Typography>
          <div className={classes.Text} align="center">
            <h1>
              NOT FOUND
            </h1>
            <h4>
              Seems like the pages you are looking after does not exist
            </h4>
          </div>
        </Typography>
      </ThemeProvider>
    </>
  );
}
NotFound.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(styles)(NotFound);
