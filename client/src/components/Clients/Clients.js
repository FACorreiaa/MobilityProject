import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { getVehicles } from '../../actions/clientActions';
import { Table } from 'react-materialize';
import ClientNav from './ClientNav';

class Clients extends Component {
  componentWillMount() {
    this.props.getVehicles();
  }

  render() {
    const { user } = this.props.auth;
    const { vehicles } = this.props.clients;

    console.log(this.props);
    return (
      <>
        <ClientNav />
        <div style={{ textAlign: 'center' }}>
          <h4>List of Vehicles</h4>
          <p className='flow-text grey-text text-darken-1'>
            Want to use one? Just check in now here!
          </p>
        </div>
        <Table centered='true' responsible='true'>
          <thead>
            <tr>
              <th data-field='id'>Code</th>
              <th data-field='name'>Description</th>
              <th data-field='price'>Available</th>
            </tr>
          </thead>
          {vehicles.map(vehicle => (
            <tbody key={vehicle._id}>
              <tr>
                <td>{vehicle.code}</td>
                <td>{vehicle.description}</td>
                <td>{vehicle.available ? 'Available' : 'Not Available'}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </>
    );
  }
}

Clients.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getVehicles: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  vehicles: state.vehicles,
  clients: state.clients
});

export default connect(mapStateToProps, { logoutUser, getVehicles })(Clients);
