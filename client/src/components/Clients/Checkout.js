import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import {
  postCheckIn,
  updateCheckout,
  updatePayment
} from '../../actions/clientActions';

import ClientNav from './ClientNav';
import MapContainer from '../MapAux/MapContainer';
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
      hasPayment: false,
      payment: '',
      finalCost: 0,
      count: 3,
      disabled: false,
      rentalMethod: '',
      timeSpent: 0,
      previewCost: 0,
      hasDiscount: true
    };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    this.setState({ address });
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        console.log('latlng' + latLng);
        this.setState({
          lat: latLng.lat,
          lng: latLng.lng,
          canRender: true
        });
      })
      .catch(error => console.error('Error', error));
  };

  checkoutNow = e => {
    e.preventDefault();

    const checkout = {
      id: this.props.clients.checkin._id,
      vehicle: this.props.clients.checkin.vehicle,
      lat: this.state.lat,
      lon: this.state.lng,
      address: this.state.address
    };

    this.props.updateCheckout(
      checkout.id,
      checkout.vehicle,
      checkout.lat,
      checkout.lon,
      checkout.address
    );

    //checkout
    /* setTimeout(() => {
      this.setState({
        checkout: this.props.clients.checkin.checkout
      });
    }, 100); */

    setTimeout(() => {
      this.setState({
        checkout: this.props.clients.checkin.checkout,
        rentalMethod: this.props.clients.checkout.rentalMethod,
        previewCost: this.props.clients.checkout.previewCost,
        timeSpent: this.props.clients.checkout.timeSpent,
        hasDiscount: this.props.clients.checkout.hasDiscount
      });
    }, 500);
  };

  updatePayment = e => {
    e.preventDefault();

    //checkout
    /* this.setState(prevState => {
      return {
        checkout: this.props.checkin.checkin.checkout
      };
    }); */
    //user
    const payment = {
      id: this.props.clients.checkout._id
    };
    console.log(payment);

    this.props.updatePayment(payment.id);

    //checkout
    setTimeout(() => {
      this.setState({
        finalCost: this.props.clients.payment.finalCost
      });
    }, 1000);

    //this.props.payment.payment.finalCost
    //this.props.checkout.checkout.rentalMethod
    //this.props.checkout.checkout.previewCost
    //this.props.checkout.checkout.timeSpent
  };

  redirectNow = () => {
    /* this.setState(prevState => ({
      disabled: !prevState.disabled
    })); */
    setInterval(() => {
      this.setState({
        //disabled: !this.state.disabled,
        count: this.state.count - 1
      });
    }, 2000);
    return (
      <div>
        <div>Refreshing in {this.state.count}</div>
        {this.state.count !== 0 ? (
          ''
        ) : (
          <div>
            {/* <Redirect
              to={'/balance'}
              state={this.props.checkin.isCheckIn === false}
              /> */}
            <Redirect
              to={'/balance'}
              state={this.props.clients.isCheckIn === false}
            />
          </div>
        )}
      </div>
    );
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
    let center = { lat: 41.53113384600326, lng: -8.619018495082855 };

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
          <Button
            node='button'
            type='submit'
            onClick={this.checkoutNow}
            disabled={this.state.disabled}
          >
            Checkout
            <Icon right>send</Icon>
          </Button>
          {console.log('1' + this.props.clients.checkout.checkout)}

          {console.log('2' + this.props.clients.checkout.paymentComplete)}
          {console.log(
            '3' + this.props.clients.checkout.checkout &&
              this.props.clients.checkout.paymentComplete
          )}
          {this.props.clients.checkout.checkout &&
          !this.props.clients.checkout.paymentComplete ? (
            <div>
              <Row key={0}>
                <Col m={12} s={12}>
                  <Card
                    actions={[
                      <Button
                        node='button'
                        type='submit'
                        onClick={this.updatePayment}
                        disabled={this.state.disabled}
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
                            <span>{this.state.rentalMethod}</span>
                          </strong>
                        </p>
                        <p>
                          <label>Payment Method: </label>
                          <strong>
                            <span>{`${this.state.previewCost}€`}</span>
                          </strong>
                        </p>
                        <p>
                          <label>Payment Method: </label>
                          <strong>
                            <span>{this.state.timeSpent}</span>
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

        {this.state.finalCost > 0 ? (
          <div>
            {this.state.hasDiscount ? (
              <div>Discount applied for valid Park.</div>
            ) : (
              <div>No discount</div>
            )}
            <div>{`Payment of ${this.state.finalCost}€ Successful!`}</div>

            <div>{this.redirectNow()}</div>
          </div>
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
  payment: state.payment,
  clients: state.clients
});

export default connect(mapStateToProps, {
  logoutUser,
  postCheckIn,
  updateCheckout,
  updatePayment
})(Checkout);
