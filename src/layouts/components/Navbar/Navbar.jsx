import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {
  Link,
} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(3),
  },
  menuButton: {
    marginRight: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
}));
const navbarItems = {
  Trainee: '/trainee',
  'TextField Demo': '/text-field-demo',
  'Input Demo': '/input-demo',
  'Children Demo': '/children-demo',
  login: '/login',
};

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Trainee Portal
          </Typography>
          <div className={classes.menuButton}>
            {
              Object.keys(navbarItems).map((key, i) => (
                <Button
                  // eslint-disable-next-line react/no-array-index-key
                  key={`key${i}`}
                  component={Link}
                  to={navbarItems[key]}
                  color="inherit"
                >
                  {key}
                </Button>
              ))
            }
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
