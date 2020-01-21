import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import {
  postCheckIn,
  updateCheckout,
  updatePayment
} from '../../actions/clientActions';

import ClientNav from './ClientNav';
import MapContainer from './MapContainer';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from 'react-places-autocomplete';
import { Button, Icon, Row, Col, Card } from 'react-materialize';

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      lat: '',
      lng: '',
      value: '',
      canRender: false,
      checkout: false,
      hasPayment: false
    };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({ lat: latLng.lat, lng: latLng.lng, canRender: true });
        console.log('Success', latLng);
      })
      .catch(error => console.error('Error', error));
  };

  checkoutNow = e => {
    e.preventDefault();

    //checkout
    this.setState(prevState => {
      return {
        checkout: this.props.checkin.checkin.data.checkout
      };
    });
    const checkout = {
      id: this.props.checkin.checkin.data._id,
      vehicle: this.props.checkin.checkin.data.vehicle,
      lat: this.state.lat,
      lon: this.state.lng
    };

    this.props.updateCheckout(
      checkout.id,
      checkout.vehicle,
      checkout.lat,
      checkout.lon
    );

    this.setState(prevState => ({
      checkout: this.props.checkin.checkin.data.checkout
    }));

    console.log('MY PROPS' + JSON.stringify(this.props.checkout.checkout));
  };

  updatePayment = e => {
    e.preventDefault();

    //checkout
    /* this.setState(prevState => {
      return {
        checkout: this.props.checkin.checkin.data.checkout
      };
    }); */
    //user
    const payment = {
      user: this.props.auth.user._id,
      id: this.props.checkin.checkin.data._id
    };

    this.props.updatePayment(payment.user, payment.id);

    this.setState(prevState => ({
      hasPayment: !prevState.hasPayment
    }));

    console.log('MY CHECKOUT' + JSON.stringify(this.props.checkout));
    console.log('MY PAYMENT' + JSON.stringify(this.props.payment));
  };

  render() {
    const style = {
      height: '400px',
      width: '800px'
    };

    const initialCenter = { lat: 41.53113384600326, lng: -8.619018495082855 };
    const position = {
      lat: this.state.lat,
      lng: this.state.lng
    };
    const paths = [
      { lat: 41.53113384600326, lng: -8.619018495082855 },
      { lat: 41.53113384600326, lng: -8.61851692199707 },
      { lat: 41.53129447698251, lng: -8.61851692199707 },
      { lat: 41.53129447698251, lng: -8.619018495082855 },
      { lat: 41.53113384600326, lng: -8.619018495082855 }
    ];
    let lat = this.state.lat;
    let lng = this.state.lng;
    let center = {};

    if (this.state.lat !== '' && this.state.lng !== '') {
      center = { lat, lng };
    }
    console.log(this.props);

    return (
      <div>
        <ClientNav />
        <div style={{ textAlign: 'center' }}>
          <h3 className='flow-text grey-text text-darken-1'>
            Checkout your location please!
          </h3>
          {!this.state.checkout ? <div>1</div> : <div>2</div>}
        </div>
        <div className='container valign-wrapper'>
          <div className='row center-align s12'>
            <div className='col'>
              <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading
                }) => (
                  <div>
                    <input
                      {...getInputProps({
                        placeholder: 'Search Places ...',
                        className: 'location-search-input'
                      })}
                    />
                    <div className='autocomplete-dropdown-container'>
                      {loading && <div>Loading...</div>}
                      {suggestions.map(suggestion => {
                        const className = suggestion.active
                          ? 'suggestion-item--active'
                          : 'suggestion-item';
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                          : { backgroundColor: '#ffffff', cursor: 'pointer' };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <Button node='button' type='submit' onClick={this.checkoutNow}>
            Checkout
            <Icon right>send</Icon>
          </Button>

          {this.props.checkout.checkout.checkout &&
          !this.props.checkout.checkout.paymentComplete ? (
            <div>
              <Row key={0}>
                <Col m={12} s={12}>
                  <Card
                    actions={[
                      <Button
                        node='button'
                        type='submit'
                        onClick={this.updatePayment}
                      >
                        Pay now!
                        <Icon right>send</Icon>
                      </Button>
                    ]}
                    className='blue-grey darken-1'
                    closeicon={<Icon>close</Icon>}
                    revealicon={<Icon>more_vert</Icon>}
                    textClassName='white-text'
                    title='Your payment data'
                  >
                    {
                      <div>
                        <p>
                          <label>Payment Method: </label>
                          <strong>
                            <span>
                              {this.props.checkout.checkout.rentalMethod}
                            </span>
                          </strong>
                        </p>
                        <p>
                          <label>Payment Method: </label>
                          <strong>
                            <span>{`${this.props.checkout.checkout.previewCost}€`}</span>
                          </strong>
                        </p>
                        <p>
                          <label>Payment Method: </label>
                          <strong>
                            <span>
                              {this.props.checkout.checkout.timeSpent}
                            </span>
                          </strong>
                        </p>
                      </div>
                    }
                  </Card>
                </Col>
              </Row>
            </div>
          ) : (
            <div>You still havent checked out!</div>
          )}
        </div>

        {this.state.hasPayment ? (
          <div>{`Payment of lol Successful!`}</div>
        ) : (
          <div>No payment has been made</div>
        )}

        <div className='m12'>
          <MapContainer
            initialCenter={initialCenter}
            position={position}
            paths={paths}
            style={style}
            center={center}
          />
        </div>
      </div>
    );
  }
}
Checkout.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postCheckIn: PropTypes.func.isRequired,
  updateCheckout: PropTypes.func.isRequired,
  updatePayment: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  places: state.places,
  checkin: state.checkin,
  checkout: state.checkout,
  payment: state.payment
});

export default connect(mapStateToProps, {
  logoutUser,
  postCheckIn,
  updateCheckout,
  updatePayment
})(Checkout);
