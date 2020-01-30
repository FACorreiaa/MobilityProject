import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { updateNotifications, validUsers } from '../../actions/funcActions';
import { Table, Button, Checkbox } from 'react-materialize';
import Navbar from './NavBar';
class NotifyUsers extends Component {
  componentDidMount() {
    this.props.validUsers();
  }

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      item: '',
      checkedItems: new Map()
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const item = e.target.id;
    const isChecked = e.target.checked;
    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(item, isChecked),
      item
    }));
  }

  updateUser = e => {
    e.preventDefault();
    const id = this.state.item;
    this.props.updateNotifications(id);
    window.location.reload();
  };

  render() {
    const { validated } = this.props.validated;
    return (
      <div>
        <Navbar />
        <Table centered='true' responsible='true'>
          <thead>
            <tr>
              <th data-field='role'>Role</th>
              <th data-field='user'>User</th>
              <th data-field='email'>email</th>
              <th data-field='email'>Parking</th>
              <th data-field='valid'>Notified</th>
            </tr>
          </thead>
          {validated.map(user => (
            <tbody key={user._id}>
              <tr>
                <td>{user.role}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {user.validParking ? 'Valid Parking' : 'Invalid Parking'}
                </td>
                <td>
                  {user.notified ? (
                    'User Notified'
                  ) : (
                    <div>
                      <Checkbox
                        style={{ margin: '1em' }}
                        id={user._id}
                        label=''
                        value='Red'
                        checked={this.state.checkedItems.get(user._id)}
                        onChange={this.handleChange}
                      />
                      <Button
                        node='a'
                        small
                        style={{
                          marginRight: '5px',
                          marginBottom: '1.6em'
                        }}
                        onClick={this.updateUser}
                      >
                        Notify
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    );
  }
}
NotifyUsers.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  validUsers: PropTypes.func.isRequired,
  updateNotifications: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  updateUser: state.updateUser,
  validated: state.validated,
  users: state.users
});
export default connect(mapStateToProps, {
  logoutUser,
  validUsers,
  updateNotifications
})(NotifyUsers);
