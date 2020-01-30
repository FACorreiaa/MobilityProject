import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { getRentalData } from '../../actions/adminActions';
import { Table } from 'react-materialize';
import Navbar from './NavBar';
class CheckParkingData extends Component {
  componentDidMount() {
    this.props.getRentalData();
  }

  render() {
    const { rental } = this.props.rental;
    return (
      <div>
        <Navbar />
        <Table centered='true' responsible='true'>
          <thead>
            <tr>
              <th data-field='username'>Username</th>
              <th data-field='fullname'>Fullname</th>
              <th data-field='email'>Email</th>
              <th data-field='rental'>Rental Method</th>
              <th data-field='Address'>Address</th>
              <th data-field='timespend'>Time Spent</th>
              <th data-field='cost'>Cost</th>
            </tr>
          </thead>
          {rental.map(r => (
            <tbody key={r._id}>
              <tr>
                <td>{r.username}</td>
                <td>{`${r.firstname} ${r.lastname}`}</td>
                <td>{r.email}</td>
                <td>{r.rentalMethod}</td>
                <td>{r.address}</td>
                <td>{r.timeSpent}</td>
                <td>{r.finalCost === undefined ? '-' : `${r.finalCost}€`}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    );
  }
}
CheckParkingData.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getRentalData: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  places: state.places,
  rental: state.rental
});
export default connect(mapStateToProps, {
  logoutUser,
  getRentalData
})(CheckParkingData);
