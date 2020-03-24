/* eslint-disable array-callback-return */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import * as moment from 'moment';
import {
  useParams, useHistory,
} from 'react-router-dom';
import { CardActions } from '@material-ui/core';
import trainees from './data/trainee';
import NotFound from '../nomatch';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  margin: {
    margin: theme.spacing(2),
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

function Date(date) {
  return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');
}

function TraineeDetail(props) {
  const classes = useStyles();
  console.log('trainee detail', props);
  let check = false;
  let matchTrainee;
  const { id } = useParams();
  const history = useHistory();
  if (trainees.length) {
    trainees.map((trainee) => {
      if (id === trainee.id) {
        check = true;
        matchTrainee = trainee;
      }
    });
  }
  return (
    <>
      {check ? (
        <div>
          <Card className={classes.root}>
            <CardMedia
              className={classes.cover}
              image="https://www.melissa.com.br/assets/img/thumbnail.png"
              title="Live from space album cover"
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h5" variant="h5">
                  {matchTrainee.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {Date(matchTrainee.createdAt)}
                </Typography>
                <Typography variant="subtitle2">
                  {matchTrainee.email}
                </Typography>
              </CardContent>
            </div>
          </Card>
          <CardActions style={{ justifyContent: 'center' }}>
            <Button variant="contained" size="medium" className={classes.margin} onClick={history.goBack}>Back</Button>
          </CardActions>
        </div>
      ) : <NotFound />}
    </>
  );
}
export default TraineeDetail;
