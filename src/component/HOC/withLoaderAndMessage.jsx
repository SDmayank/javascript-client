/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  createMuiTheme, ThemeProvider,
} from '@material-ui/core';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
  buttonPosition: {
    display: 'flex',
  },
  Text: {
    color: 'grey',
  },
}));

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10,
    fontFamily: [
      'Arial',
    ].join(','),
  },
});

const withLoaderAndMessage = (WrappedComponent) => (props) => {
  const classes = useStyles();
  const { loading, ...rest } = props;
  if (loading) {
    return (<div className={classes.buttonPosition} style={{ justifyContent: 'center' }}><CircularProgress color="secondary" /></div>);
  }

  return (
    <>
      {props.dataLength ? (<WrappedComponent {...rest} />) : (
        <>
          <ThemeProvider theme={theme}>

            <Box paddingLeft={72}>
              <h3>Oops No more Trainees</h3>
            </Box>
          </ThemeProvider>
        </>
      )}
    </>

  );
};

export default withLoaderAndMessage;
