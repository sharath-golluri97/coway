import React, {useState,useEffect,useRef} from 'react';
import {Grid} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import useStyles from "./chatApp.styles";


export default function SkeleteonChatContent() {
  const classes = useStyles();

  return (
    <div>
      <Grid className={classes.messageContainer} container direction='column' alignItems="flex-end">
        <Skeleton variant="rect" width={200} height={40}/>
      </Grid>
      <Grid className={classes.messageContainer} container direction='column' alignItems="flex-start">
        <Skeleton variant="rect" width={200} height={40}/>
      </Grid>
      <Grid className={classes.messageContainer} container direction='column' alignItems="flex-start">
        <Skeleton variant="rect" width={150} height={70}/>
      </Grid>
      <Grid className={classes.messageContainer} container direction='column' alignItems="flex-end">
        <Skeleton variant="rect" width={200} height={60}/>
      </Grid>
      <Grid className={classes.messageContainer} container direction='column' alignItems="flex-start">
        <Skeleton variant="rect" width={200} height={40}/>
      </Grid>
      <Grid className={classes.messageContainer} container direction='column' alignItems="flex-end">
        <Skeleton variant="rect" width={120} height={60}/>
      </Grid>
      <Grid className={classes.messageContainer} container direction='column' alignItems="flex-end">
        <Skeleton variant="rect" width={180} height={50}/>
      </Grid>
      <Grid className={classes.messageContainer} container direction='column' alignItems="flex-start">
        <Skeleton variant="rect" width={200} height={40}/>
      </Grid>
      <Grid className={classes.messageContainer} container direction='column' alignItems="flex-end">
        <Skeleton variant="rect" width={180} height={50}/>
      </Grid>
    </div>
  )
};
