import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {Card} from 'antd';
import RegistrationTabs from "./RegistrationTabs";
import Particles from 'react-particles-js';
import {AppBar, Toolbar, Typography} from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {


  return (
    <div style={{background: "linear-gradient(to right, rgb(203, 52, 181), rgb(68,166,187))", height: "inherit"}}>
      <AppBar position="static" color="default" style={{marginBottom: "20px"}}>
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
      <Card style={{
        width: "80%",
        margin: "auto",
        background: "rgba(255,255,255,0.4)",
      }}>
        <RegistrationTabs/>
      </Card>
    </div>
  );
}
