import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import {
  getVehicles,
  getRentalMethods,
  postCheckIn
} from '../../actions/clientActions';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import ClientNav from './ClientNav';
import { Button, Icon } from 'react-materialize';

//const options = ['one', 'two', 'three'];
//const rental = ['minutes', 'pack'];
class Balance extends Component {
  componentWillMount() {
    this.props.getVehicles();
    this.props.getRentalMethods();
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      });
    });
  }

  constructor(props) {
    super(props);
    this.state = { vehicle: '', rentalMethod: '', lat: '', lon: '' };
    this._onSelect = this._onSelect.bind(this);
    this._onMethodSelect = this._onMethodSelect.bind(this);
  }

  _onSelect(option) {
    console.log('You vehicle ', option);
    this.setState({ vehicle: option });
  }

  _onMethodSelect(value) {
    console.log('You vehicle ', value.label);
    this.setState({ rentalMethod: value });
  }

  onSubmit = e => {
    e.preventDefault();

    const checkin = {
      user: this.props.auth.user._id,
      id: this.state.vehicle.value,
      rentalMethod: this.state.rentalMethod.value,
      lat: JSON.stringify(this.state.lat),
      lon: JSON.stringify(this.state.lon)
    };

    this.props.postCheckIn(
      checkin.user,
      checkin.id,
      checkin.rentalMethod,
      checkin.lat,
      checkin.lon
    );
  };

  render() {
    console.log(this.state);
    const options = [];
    const { user } = this.props.auth;
    const { vehicles } = this.props.vehicles;
    const { methods } = this.props.methods;
    const getAvailables = vehicles.filter(
      vechicle => vechicle.available === true
    );
    options.push(getAvailables.map(t => t._id));
    const rental = methods.map(m => m.rentalMethod);
    const defaultVehicleOption = this.state.vehicle;
    const defaultMethodOption = this.state.rentalMethod;

    const placeHolderVehicleValue =
      typeof this.state.vehicle === 'string'
        ? this.state.vehicle
        : this.state.vehicle.label;

    const placeHolderRentalValue =
      typeof this.state.rentalMethod === 'string'
        ? this.state.rentalMethod
        : this.state.rentalMethod.label;
    return (
      <>
        <ClientNav />
        <div style={{ textAlign: 'center' }}>
          <h3>Hello {user.username}!</h3>
          <p className='flow-text grey-text text-darken-1'>
            Checkin with us now!
          </p>
          <h4 className='flow-text grey-text text-darken-1'>
            Feel free to choose from our available vehicle list!
          </h4>
          <div className='row'>
            <section>
              <h5 className='flow-text grey-text text-darken-1'>
                Pick your Vehicle
              </h5>
              <div className='col s6'>
                <Dropdown
                  options={options}
                  onChange={this._onSelect}
                  value={defaultVehicleOption}
                  placeholder='Select an option'
                />
              </div>
              <div className='col s6 result'>
                Your vehicle
                <strong> {placeHolderVehicleValue} </strong>
              </div>
            </section>
          </div>
          <div className='row'>
            <section>
              <h5 className='flow-text grey-text text-darken-1'>
                Pick your rental method
              </h5>
              <div className='col s6'>
                <Dropdown
                  options={rental}
                  onChange={this._onMethodSelect}
                  value={defaultMethodOption}
                  placeholder='Select an option'
                />
              </div>
              <div className='result col s6'>
                Your Rental Method
                <strong> {placeHolderRentalValue} </strong>
              </div>
            </section>
          </div>
          <section>
            <div className='center-align'>
              <Button node='button' type='submit' onClick={this.onSubmit}>
                Checkin
                <Icon right>send</Icon>
              </Button>
            </div>
          </section>
        </div>
      </>
    );
  }
}

Balance.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getVehicles: PropTypes.func.isRequired,
  getRentalMethods: PropTypes.func.isRequired,
  postCheckIn: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  vehicles: state.vehicles,
  methods: state.methods,
  checkin: state.checkin
});

export default connect(mapStateToProps, {
  logoutUser,
  getVehicles,
  getRentalMethods,
  postCheckIn
})(Balance);
