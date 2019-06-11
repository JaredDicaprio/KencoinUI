import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Button, Fab, Typography} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import SimpleCrypto from "simple-crypto-js";
import FireBaze from '../../../constants/config/FireBaze'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from "axios";
import {connect} from "react-redux";
import {getUserDetails} from "../../../appRedux/actions/Register";
import {getUserData} from "../../../appRedux/actions/User"


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
});

class CreateWallet extends React.Component {
  state = {
    mnemonic: "",
    Encrypted: "",
    new: false,
    wallet: {}
  };

  constructor(props) {
    super(props);
    this.createNewWallet = this.createNewWallet.bind(this);
  }

  async createNewWallet() {
    var mnemonic = "Hehe";
    var encrypted = "encrypted";
    var address = null;
    var pubKey = null;
    var response = await axios.get("http://localhost:4000/Wallet/create")
      .then(response => response)
      .catch(error => error);

    if (response.message) {
      console.log("Sorry  Error Occured")
    } else {
      mnemonic = response.data.seed;
      encrypted = response.data.encrypted;
      address = response.data.address;
      pubKey = response.data.pubkey;
    }

    this.setState({
      Encrypted: encrypted,
      mnemonic: mnemonic,
      new: true,
      wallet: {
        mnemonic: mnemonic,
        encrypted: encrypted,
        address: address,
        pubKey: pubKey
      }
    });
    console.log(this.state);
  }

  static async pushData(user) {
    await axios.post("http://localhost:4000/user/register", user)
      .then(result => result)
      .catch(error => error)
  }

  getMnemonic = name => e => {
    this.setState({
      [name]: e.target.value
    });
    console.log(this.state.mnemonic)
  };

  importWallet = () => {
    const mnemonic = this.state.mnemonic;
    var uid = FireBaze.auth().currentUser.uid;
    var simpleCrypto = new SimpleCrypto(uid);
    var encrypted = simpleCrypto.encrypt("" + mnemonic);
    this.setState({
      Encrypted: encrypted,
      mnemonic: mnemonic,
      new: true,
    });

  };

  handleClose = () => {
    this.setState({new: false});
  };

  finishSignup = () => {
    this.props.getUserDetails(this.state.wallet);
    var regDets = this.props.register;
    var User = {
      name: regDets.name,
      email: regDets.email,
      phone: regDets.phone,
      gender: regDets.gender,
      id: regDets.id,
      pin: regDets.pin,
      PPic: regDets.PPic,
      dob: regDets.dob,
      IDFrontPic: regDets.IDFrontPic,
      IDBackPic: regDets.IDBackPic,
      mnemonic: this.state.wallet.mnemonic,
      encrypted: this.state.wallet.encrypted,
      address: this.state.wallet.address,
      uid: regDets.uid,
      pubKey: this.state.wallet.pubKey

    };
    console.clear();
    console.log("The Final User");
    console.log(User)
    var synced = CreateWallet.pushData(User);

    if (synced.message) {
      console.log("Error Occured")
    } else {
      console.log("Success Happened");
      this.props.getUserData();
    }
  };

  render() {

    return (
      <div style={{marginTop: 100}}>
        <div style={{display: "flex", justifyContent: "center", margin: 30}}>
          <Button color='primary' variant="contained" onClick={this.createNewWallet}> CreateWallet</Button>

        </div>
        <Typography style={{display: "flex", justifyContent: "center"}}>Or</Typography>
        <Typography style={{display: "flex", justifyContent: "center"}}>Import Wallet Using your Mnemonic
          Phrase</Typography>
        <TextField
          id="outlined-name"
          label="Mnemonic Phrase"
          multiline
          fullWidth
          name="mnemonic"
          onChange={this.getMnemonic('mnemonic')}
          rows='3'
          margin="normal"
          variant="outlined"
        />
        <div style={{display: "flex", justifyContent: "center", margin: 30}}>
          <Button color='primary' variant="contained" onClick={this.importWallet}> Import</Button>

        </div>
        <Dialog
          open={this.state.new}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Store the Following Mnemonic Safely"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.mnemonic}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>

        <div style={{position: "absolute", bottom: 0, right: 0, padding: 30}}>
          <Button onClick={this.finishSignup} disabled={this.state.mnemonic == null}>
            <Fab variant="extended" aria-label="Delete">
              <ChevronRightIcon/>
              Complete
            </Fab>
          </Button>
        </div>
      </div>

    );
  }
}

CreateWallet.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({register}) => {

  return {register}
};


export default withStyles(styles)(connect(mapStateToProps, {getUserDetails, getUserData})(CreateWallet));
