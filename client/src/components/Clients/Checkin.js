import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import {
  getVehicles,
  getRentalMethods,
  postCheckIn,
  getConsult,
  getNotifiedUser
} from '../../actions/clientActions';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import ClientNav from './ClientNav';
import { Button, Icon, Modal, Row, Col, Card } from 'react-materialize';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';

//const options = ['one', 'two', 'three'];
//const rental = ['minutes', 'pack'];
class Checkin extends Component {
  UNSAFE_componentWillMount() {
    this.props.getVehicles();
    this.props.getRentalMethods();
    this.props.getNotifiedUser(this.props.auth.user._id);
    this.timer = setInterval(() => this.getNotification(), 2000);
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      });
    });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null; // here...
  }

  getNotification = () => {
    const notified = this.props.clients.notifiedUser.notified;
    if (notified) {
      return (
        <div className='app-container'>
          <ReactNotification />
          {store.addNotification({
            title: 'Wrong Parking!',
            message: 'Your vehicle is in the wrong place',
            type: 'warning',
            insert: 'top',
            container: 'top-right',
            animationIn: ['animated', 'zoomIn'],
            animationOut: ['animated', 'zoomOut'],
            dismiss: {
              duration: 1000,
              onScreen: true
            }
          })}
        </div>
      );
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      vehicle: '',
      rentalMethod: '',
      lat: '',
      lon: '',
      disabled: false,
      checkin: false,
      price: '',
      previewCost: '',
      timeSpent: '',
      canRender: false
    };
    this._onSelect = this._onSelect.bind(this);
    this._onMethodSelect = this._onMethodSelect.bind(this);
  }

  _onSelect(option) {
    this.setState({ vehicle: option });
  }

  _onMethodSelect(value) {
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

    this.setState(prevState => ({
      disabled: !prevState.disabled,
      checkin: !prevState.checkin
    }));

    this.props.clients.isCheckIn = !this.props.clients.isCheckIn;
  };

  onConsult = e => {
    e.preventDefault();

    this.props.getConsult(this.props.clients.checkin._id);

    setTimeout(() => {
      this.setState(prevState => ({
        canRender: !prevState.canRender
      }));
    }, 100);
  };

  render() {
    const { user } = this.props.auth;
    const { vehicles } = this.props.clients;
    const { methods } = this.props.clients;
    const { consult } = this.props.clients;
    const { notifiedUser } = this.props.clients;

    const getAvailables = vehicles.filter(
      vechicle => vechicle.available === true
    );

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
          <p className='flow-text grey-text text-darken-1'>
            Hello {user.username}! Checkin with us now!
          </p>

          <div className='row'>
            <section>
              <p className='flow-text grey-text text-darken-1'>
                Pick your Vehicle
              </p>
              <div className='col s6'>
                <Dropdown
                  options={getAvailables.map(available => available._id)}
                  onChange={this._onSelect}
                  value={defaultVehicleOption}
                  placeholder='Select an option'
                  disabled={this.state.disabled}
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
                  disabled={this.state.disabled}
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
              <Button
                node='button'
                type='submit'
                onClick={this.onSubmit}
                disabled={this.state.disabled}
              >
                Checkin
                <Icon right>send</Icon>
              </Button>
              {this.getNotification()}
            </div>
          </section>
          <div className='flow-text grey-text text-darken-2'>
            {this.state.checkin ? (
              <div>
                <div
                  className='bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3'
                  role='alert'
                >
                  <p className='font-bold'>Careful!</p>
                  <p className='text-sm'>You are already checked in</p>
                </div>
                <Button node='button' type='submit' onClick={this.onConsult}>
                  Check your time estimative!
                  <Icon right>send</Icon>
                </Button>
                {this.state.canRender ? (
                  <section>
                    <div>
                      <span>
                        Base price is:{' '}
                        <strong>{this.props.clients.consult.price}</strong>
                      </span>
                    </div>
                    <div>
                      <span>
                        Your preview cost is:{' '}
                        <strong>
                          {this.props.clients.consult.previewCost}
                        </strong>
                      </span>
                    </div>
                    <div>
                      <span>
                        Time spend:{' '}
                        <strong>{this.props.clients.consult.timeSpent}</strong>
                      </span>
                    </div>
                    <NavLink
                      to={{
                        pathname: '/checkout',
                        state: { ...this.props.clients.consult }
                      }}
                    >
                      <Button node='button' type='submit'>
                        Checkout
                        <Icon right>send</Icon>
                      </Button>
                    </NavLink>
                    {this.props.clients.consult.paymentComplete ? (
                      <Link to='/checkout'>
                        Payment incomplete. Click here to redirect!
                      </Link>
                    ) : (
                      ''
                    )}
                  </section>
                ) : (
                  ''
                )}
              </div>
            ) : (
              <div
                className='bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3'
                role='alert'
              >
                <p className='font-bold'>What are you waiting for?</p>
                <p className='text-sm'>You are not checked in</p>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

Checkin.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  checkin: PropTypes.object.isRequired,
  getVehicles: PropTypes.func.isRequired,
  getRentalMethods: PropTypes.func.isRequired,
  postCheckIn: PropTypes.func.isRequired,
  getConsult: PropTypes.func.isRequired,
  getNotifiedUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  vehicles: state.vehicles,
  methods: state.methods,
  checkin: state.checkin,
  consult: state.consult,
  clients: state.clients,
  notifiedUser: state.notifiedUser
});

export default connect(mapStateToProps, {
  logoutUser,
  getVehicles,
  getRentalMethods,
  postCheckIn,
  getConsult,
  getNotifiedUser
})(Checkin);
