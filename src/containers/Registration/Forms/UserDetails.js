import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {connect} from "react-redux";
import MuiPhoneNumber from 'material-ui-phone-number'
import {Button, Fab, MenuItem} from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import FireBaze from '../../../constants/config/FireBaze'
import {getUserDetails} from "../../../appRedux/actions/Register";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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

const gender = [
  {
    value: 'Male',
    label: 'male',
  },
  {
    value: 'Female',
    label: 'female',
  },
];

class UserDetails extends React.Component {

  state = {
    name: '',
    email: '',
    dob: '',
    phone: '',
    gender: '',
    id: '',
    pin: '',
    submit: false
  };

  constructor(props) {
    super(props);
    this.handleOnchange = this.handleOnchange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleOnchange(value) {
    this.setState({
      phone: value
    })
  }

  componentWillMount() {
    this.unPackUserPhone()
  }

  async unPackUserPhone() {
    var person = this.props.person;
    var number = "";
    // var user = await FireBaze.auth().currentUser;

    console.log(this.props);


    function listenforUser(user) {
      const {name, email, dob, phone, gender, id, pin} = this.props;
      if (user) {
        console.log("user found");
        number = user.phoneNumber;
        this.setState({
          name: name ? name :person.name,
          email:  email ? email :person.name,
          dob:  dob ? dob :person.name,
          phone:  phone ? phone : number,
          gender:  gender ? gender :person.gender,
          id:  id ? id :person.id,
          pin:  pin ? pin :person.pin,
          uid: user.uid
        });
        console.log(this.state.uid);
      } else {
        console.log("User not found")
      }
    }

    FireBaze.auth().onAuthStateChanged(
      listenforUser.bind(this)
    );
    this.setState({
      name: person.name,
      email: person.email,
      dob: person.dob,
      phone: number,
      gender: person.gender,
      id: person.id,
      pin: person.pin,
    })
  }

  handleSubmit() {
    this.setState(
      {submit: true}
    );
    var person = {
      name: this.state.name,
      email: this.state.email,
      dob: this.state.dob,
      phone: this.state.phone,
      gender: this.state.gender,
      id: this.state.id,
      pin: this.state.pin ? this.state.pin : "",
      uid: this.state.uid
    };

    console.log(person);
    this.props.getUserDetails(person);
    this.props.next();
  }

  render() {

    return (
      <ValidatorForm  autoComplete="off" onSubmit={this.handleSubmit} onError={errors => console.log(errors)}>
        <TextValidator
          error={this.state.name === '' && this.state.submit}
          id="outlined-name"
          label="Full Names"
          fullWidth
          value={this.state.name}
          onChange={this.handleChange('name')}
          validators={['required']}
          errorMessages={['Your Full Name is Required']}
          margin="normal"
          variant="outlined"
        />

        <br/>

        <TextValidator
          error={this.state.email === '' && this.state.submit}
          id="outlined-email"
          label="Email"
          type="Email"
          fullWidth
          validators={['required', 'isEmail']}
          errorMessages={['Please provide your email']}
          value={this.state.email}
          onChange={this.handleChange('email')}
          margin="normal"
          variant="outlined"
        />

        <br/>

        <TextValidator
          error={this.state.dob === '' && this.state.submit}
          id="outlined-full-width"
          label="Date of Birth"
          type="date"
          placeholder="Placeholder"
          validators={['required']}
          errorMessages={['Please provide your Date of birth']}
          fullWidth
          margin="normal"
          value={this.state.dob}
          variant="outlined"
          onChange={this.handleChange('dob')}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <br/>
        <br/>

        <MuiPhoneNumber
          error={this.state.phone === '' && this.state.submit}
          id="outlined-email"
          label="Phone Number"
          fullWidth
          value={this.state.phone}
          onChange={this.handleOnchange}
          defaultCountry={'ke'}
          margin="normal"
          variant="outlined"
        />

        <TextValidator
          error={this.state.gender === '' && this.state.submit}
          id="filled-select-gender"
          select
          fullWidth
          label="Gender"
          value={this.state.gender}
          onChange={this.handleChange('gender')}
          helperText="Please select your gender"
          validators={['required']}
          errorMessages={['Please select your gender ']}
          margin="normal"
          variant="filled"
          InputLabelProps={{
            shrink: true,
          }}
        >
          {gender.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextValidator>

        <TextValidator
          error={this.state.id === '' && this.state.submit}
          id="outlined-full-width"
          label="I.D / Passport No."
          type="integer"
          fullWidth
          margin="normal"
          validators={['required']}
          errorMessages={['Please provide your Id or Passport Number ']}
          value={this.state.id}
          variant="outlined"
          onChange={this.handleChange('id')}

        />

        <br/>

        <TextField
          id="outlined-full-width"
          label="KRA PIN"
          type="integer"
          fullWidth
          value={this.state.pin}
          margin="normal"
          variant="outlined"
          onChange={this.handleChange('pin')}
        />

        <br/>
        <div style={{position: "absolute", bottom: 0, right: 0, padding: 30}}>
          <Button type="submit" >
            <Fab variant="extended" aria-label="Delete">
              <ChevronRightIcon/>
              Next
            </Fab>
          </Button>
        </div>
      </ValidatorForm>
    );
  }
}

UserDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({register}) => {
  const {name, email, dob, phone, gender, id, pin} = register;
  return {name, email, dob, phone, gender, id, pin}
};

export default withStyles(styles)(connect(mapStateToProps, {getUserDetails})(UserDetails));
