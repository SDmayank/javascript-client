import React from 'react';
import { Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';

import ChildrenDemo from './Pages/childrenDemo';


function App() {
  console.log(theme, "===============")
  return (
    <>
      <ThemeProvider theme={theme}>
        <Typography>
          <ChildrenDemo />
        </Typography>
      </ThemeProvider>
    </>
  );
}

export default App;
