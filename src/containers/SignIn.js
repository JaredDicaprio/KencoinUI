import React, { Component } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Grid } from '@material-ui/core';
import FireBaze from '../constants/config/FireBaze';
import {connect} from "react-redux";
import {userSignInSuccess} from "../appRedux/actions/Auth";
import {getUserData} from "../appRedux/actions/User";
import Particles from "react-particles-js";
import {AppBar, Toolbar, Typography} from "@material-ui/core";

class Login extends Component {


  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.EmailAuthProvider.PROVIDER_ID,
      {provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        defaultCountry: 'KE'
      }
    ],
    callbacks: {
      signInSuccessWithAuthResult: async (authResult, redirectUrl) => {
        getUserData();
        await userSignInSuccess(authResult.user.uid);
        localStorage.setItem("user_id", authResult.user.uid)
        this.fetchUserData()
        console.log("From Reducer",this.props.authUser);
        return false;
      }
    },
    signInSuccessUrl: "http://localhost:3000/dashboard",
  };


  async fetchUserData(){
    await this.props.getUserData()
  }

  componentDidMount() {
    console.log(this.props.authUser)
  }

  render() {
    return (
      <div style={{
        background: "linear-gradient(to right, rgb(203, 52, 181), rgb(68,166,187))",
        height: "inherit"
      }}>
        <AppBar position="static" color="default" style={{marginBottom: "20px", background: "rgba(255,255,255,0.45)"}}>
          <Toolbar>
            <img src={require("assets/images/logo.png")} alt=""/>
          </Toolbar>
        </AppBar>
        <Particles
          params={{
            particles: {
              number: {
                value: 150,
                density: {
                  enable: true,
                  value_area: 1080
                }
              }
            }
          }}
          style={{position: "absolute",}}
        />
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh', position: 'absolute', zIndex: '1' }}>
          <Grid item xs={8} >
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={FireBaze.auth()}

            />
          </Grid>
        </Grid>
      </div>
    )
  }
}
const mapStateToProps = ({auth}) => {
  const {authUser, initURL} = auth;
  return {authUser, initURL}
};

export default connect(mapStateToProps, {getUserData})(Login)
