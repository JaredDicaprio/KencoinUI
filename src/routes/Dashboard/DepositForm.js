import {Button, Form} from 'antd';
import React, {Component} from 'react';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import axios from "axios";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


class NormalLoginForm extends Component {

  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      submit: false,
      phone: null,
      account: null,
      amount: null
    }
  }


  handleSubmit = async () => {

    const {phone, account, amount} = this.state;
    console.log('Received values of form: ', this.state);

    if (phone != null && account != null && amount != null) {
      this.setState({
        submit: true
      })
    }

    var response = await axios.post("http://127.0.0.1:4000/coin/deposit", {
      phoneNumber: phone,
      account: account,
      amount: amount
    })
      .then(done => done)
      .catch(err => err);

    if (response.message) {
      console.log(response.message);
      console.log("Error Occured")
    } else {
      console.log("succeess For People");
      this.setState({
        id: response.data.ID
      });
      console.log(this.state);
    }

  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });

    console.log(this.state)

  };

  componentWillMount() {
    this.setState(
      {
        account: this.props.account
      }
    )
  }

  handleClose() {
    this.setState({
      submit: false
    })
  }


  render() {
    const {getFieldDecorator} = this.props.form;
    console.log(this.props.phone);
    return (
      <div>
        <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator
            error={this.state.phone === '' && this.state.submit}
            id="outlined-mpesa-number"
            label="Mpesa Phone"
            fullWidth
            name="phone"
            validators={['required', '\'matchRegexp:^(?=\\d{10}$)(07)\\d+\'']}
            errorMessages={['Please provide an mpesa phone Number', "invalid phone Number"]}
            value={this.state.email}
            onChange={this.handleChange}
            margin="normal"
            variant="outlined"
          />

          <TextValidator
            error={this.state.account === '' && this.state.submit}
            id="outlined-account-phone"
            label="account Phone Number"
            type="integer"
            fullWidth
            margin="normal"
            disabled={true}
            name="account"
            validators={['required']}
            errorMessages={['Please provide your account phone number ']}
            value={this.state.account}
            variant="outlined"
            onChange={this.handleChange}

          />

          <br/>

          <TextValidator
            id="outlined-amount"
            label="Amount"
            type="integer"
            fullWidth
            name="amount"
            validators={['required']}
            value={this.state.amount}
            margin="normal"
            variant="outlined"
            onChange={this.handleChange}
          />

          <br/>
          <Button type="Submit" onClick={this.handleSubmit}>
            Deposit
          </Button>
        </ValidatorForm>

        <Dialog
          open={this.state.submit}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              A push stk has been sent to {this.state.phone}. Please key in your Mpesa pin then press Confirm.
              If you did not recieve a push stk click resend to retry.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Resend
            </Button>
            <Button onClick={this.confirmTransaction} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

      </div>
    );
  }

  confirmTransaction = async () => {
    console.log("Confirming Transaction");
    var data = {
      ID: this.state.id
    };
    console.log(data);
    var reqResponse = await axios.post('http://127.0.0.1:4000/coin/confirm', {
      ID: this.state.id
    })
      .then(result => result)
      .catch(err => err);
    console.log("Confirming Transaction gg");
    console.log(reqResponse)
  }
}

const DepositForm = Form.create({name: 'normal_login'})(NormalLoginForm);

export default DepositForm
