import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import {CreateWallet, UserDetails, UserUploads} from "./Forms";
import {Paper, Grid} from "@material-ui/core";


function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#",
  },
}));

export default class NavTabs extends Component{

  state = {
    value: 0,
    setValue: 0,
    perzon: {}
  };

  constructor(props) {
    super(props);
    this.goNext = this.goNext.bind(this);
    // this.finishedRegistration = this.finishedRegistration.bind(this);
  }

  goNext() {
    this.setState((previousState) =>
      ({ value: previousState.value + 1 }))
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const classes = makeStyles(theme => ({
      root: {
        flexGrow: 1,
        backgroundColor: "#",
      },
    }));
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs variant="fullWidth" value={this.state.value} onChange={this.handleChange}>
          <LinkTab label="User Daetails" href="/drafts" />
          <LinkTab label="Images" href="/trash" />
          <LinkTab label="Wallet" href="/spam" />
        </Tabs>
      </AppBar>
      {this.state.value === 0 &&
      <TabContainer>
        <Grid
          container
          alignItems="center"
          justify="center">
          <Paper style={{ width: 600, padding: 30 }}>
            <Typography variant="h5" >Your Personal Details</Typography>
            <UserDetails person={this.state.perzon} next={this.goNext}/>
          </Paper>
        </Grid>
      </TabContainer>}
      {this.state.value === 1 && <TabContainer><UserUploads next={this.goNext} /></TabContainer>}
      {this.state.value === 2 && <TabContainer>
        <Grid
          container
          alignItems="center"
          justify="center">
          <Paper style={{ width: 600, padding: 30 }}>
            <Typography variant="h5" >Create Your wallet</Typography>
            <CreateWallet/>
          </Paper>
        </Grid>
      </TabContainer>}
    </div>
  );
}
}




