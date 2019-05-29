import React, { Component } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Grid } from '@material-ui/core';
import Fire from '../constants/config/Fire';
import {connect} from "react-redux";
import {userSignInSuccess} from "../appRedux/actions/Auth";


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
        console.clear();
        console.log("The user:", authResult.user.uid);
        console.log("The Url:", redirectUrl);
        await userSignInSuccess(authResult.user.uid);
        console.log("From Reducer",this.props.authUser);
        return false;
      }
    },
    signInSuccessUrl: "http://localhost:3000/dashboard",
  };

  render() {
    return (
      <div>
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
              firebaseAuth={Fire.auth()}

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

export default connect(mapStateToProps, null)(Login)
