import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import {
  getVehicles,
  getBalance,
  updateBalance
} from '../../actions/clientActions';
import ClientNav from './ClientNav';
import { TextInput, Button, Icon } from 'react-materialize';

class Balance extends Component {
  componentWillMount() {
    this.props.getBalance(this.props.auth.user._id);
  }

  constructor(props) {
    super(props);
    this.state = { clicked: false, balance: 0, disabled: true };
  }

  onclick(type) {
    this.setState(prevState => {
      return {
        balance: type == 'add' ? prevState.balance + 1 : prevState.balance - 1
      };
    });
  }

  onsave = () => {
    this.setState(prevState => ({
      disabled: !prevState.disabled
    }));
  };

  onSubmit = e => {
    e.preventDefault();

    const newBalance = {
      id: this.props.auth.user._id,
      balance: this.state.balance
    };

    this.props.updateBalance(newBalance.id, newBalance.balance);
    window.location.reload();
  };

  render() {
    const { user } = this.props.auth;
    const { balance } = this.props.balance;

    return (
      <>
        <ClientNav />
        <div style={{ textAlign: 'center' }}>
          <h4>Hello {user.username}!</h4>
          <p className='flow-text grey-text text-darken-1'>
            Your Balance is {balance.balance}€
          </p>
          <h5 className="className='flow-text grey-text text-darken-1'">
            Do you want to add more funds?
          </h5>

          <div className='center-align'>
            <TextInput
              icon='euro'
              label='Insert budget'
              type='number'
              className='align-center'
              value={this.state.balance}
              disabled={!this.state.disabled}
              onClick={this.onsave}
            />
          </div>

          <div className='row'>
            <Button
              className='red'
              floating
              icon={<Icon>add</Icon>}
              large
              node='button'
              onClick={this.onclick.bind(this, 'add')}
              disabled={!this.state.disabled}
            />
            <Button
              className='red'
              floating
              icon={<Icon>delete</Icon>}
              large
              node='button'
              onClick={this.onclick.bind(this, 'sub')}
              disabled={!this.state.disabled}
            />
            <Button
              className='red'
              floating
              icon={<Icon>save</Icon>}
              large
              onClick={this.onsave}
              node='button'
            />
          </div>
          <div className='row'>
            <div>
              <Button
                node='button'
                type='submit'
                disabled={this.state.disabled}
                onClick={this.onSubmit}
              >
                Submit
                <Icon right>send</Icon>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Balance.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  getVehicles: PropTypes.func.isRequired,
  getBalance: PropTypes.func.isRequired,
  updateBalance: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  vehicles: state.vehicles,
  balance: state.balance
});

export default connect(mapStateToProps, {
  logoutUser,
  getVehicles,
  getBalance,
  updateBalance
})(Balance);
