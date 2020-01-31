import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { getValidUsers, updateUsers } from '../../actions/adminActions';
import { Table, Button, Checkbox } from 'react-materialize';
import Typography from '@material-ui/core/Typography';
import { typo } from '../Contants/constants/typo';
import Navbar from './NavBar';
class ValidateUsers extends Component {
  componentDidMount() {
    this.props.getValidUsers();
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

    const validateUser = {
      id: this.state.item,
      userId: this.props.auth.user._id
    };

    this.props.updateUsers(validateUser.id, validateUser.userId);
    window.location.reload();
  };

  render() {
    const { validUsers } = this.props.validUsers;

    return (
      <div>
        <Navbar />
        <Table centered='true' responsible='true'>
          <thead>
            <tr>
              <th data-field='role'>Role</th>
              <th data-field='user'>User</th>
              <th data-field='email'>email</th>
              <th data-field='valid'>Validate</th>
            </tr>
          </thead>
          {validUsers.length > 0 ? (
            validUsers.map(user => (
              <tbody key={user._id}>
                <tr>
                  <td>{user.role}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <Checkbox
                      style={{ margin: '1em' }}
                      id={user._id}
                      label=''
                      value='Red'
                      onChange={this.handleChange}
                      checked={this.state.checkedItems.get(user._id)}
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
                      Validate
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))
          ) : (
            <div style={{ textAlign: 'left' }}>
              <Typography className={typo.root} variant='h6' gutterBottom>
                No users to validate!
              </Typography>
            </div>
          )}
        </Table>
      </div>
    );
  }
}
ValidateUsers.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getValidUsers: PropTypes.func.isRequired,
  updateUsers: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  places: state.places,
  clients: state.clients,
  validUsers: state.validUsers,
  updateUser: state.updateUser
});
export default connect(mapStateToProps, {
  logoutUser,
  getValidUsers,
  updateUsers
})(ValidateUsers, updateUsers);
