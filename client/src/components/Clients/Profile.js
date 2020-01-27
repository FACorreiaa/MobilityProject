import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { getVehicles } from '../../actions/clientActions';
import { TextInput, Button, Icon } from 'react-materialize';
import ClientNav from './ClientNav';

class Profile extends Component {
  componentDidMount() {
    this.props.getVehicles();
  }

  /* profile: {
    age: Number,
    street: String,
    contact: String,
    city: String,
    education: String,
    school: String,
    bio: String
  } */

  render() {
    const { user } = this.props.auth;
    const { vehicles } = this.props.clients;

    console.log(this.props);
    return (
      <>
        <ClientNav />
        <div style={{ textAlign: 'center' }}>
          <h4>Your profile {user.username}</h4>
          <p className='flow-text grey-text text-darken-1'>
            Edit your profile or charge your account!
          </p>
        </div>
        <div className='row center-align'>
          <div className='col s4'>
            <TextInput label='Firstname' placeholder='First Name' />
          </div>
          <div className='col s4'>
            <TextInput label='Lastname' placeholder='Last Name' />
          </div>
          <div className='col s4'>
            <TextInput label='Age' placeholder='Age' />
          </div>
        </div>
        <div className='row center-align'>
          <div className='col s4'>
            <TextInput label='City' placeholder='City' />
          </div>
          <div className='col s4'>
            <TextInput label='Street' placeholder='Street' />
          </div>
          <div className='col s4'>
            <TextInput label='Contact' placeholder='Contact' />
          </div>
        </div>
        <div className='row center-align'>
          <div className='col s4'>
            <TextInput label='School' placeholder='School' />
          </div>
          <div className='col s4'>
            <TextInput label='Education' placeholder='Education' />
          </div>
          <div className='col s4'>
            <TextInput label='About you' placeholder='About you' />
          </div>
        </div>
        <div className='center-align'>
          <Button node='button' type='submit' waves='light'>
            Submit
            <Icon right>send</Icon>
          </Button>
          <Button node='button' type='cancel' waves='dark'>
            Cancel
            <Icon right>cancel</Icon>
          </Button>
        </div>
      </>
    );
  }
}

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getVehicles: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  vehicles: state.vehicles
});

export default connect(mapStateToProps, { logoutUser, getVehicles })(Profile);
