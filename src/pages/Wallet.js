import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import FormEdit from '../components/FormEdit';

class Wallet extends Component {
  render() {
    const { isEditing } = this.props;
    return (
      <>
        <Header />
        { isEditing ? <FormEdit /> : <ExpenseForm /> }
        <ExpenseTable />
      </>
    );
  }
}
const mapStateToProps = ({ wallet: { isEditing } }) => ({
  isEditing,
});

Wallet.propTypes = {
  isEditing: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Wallet);
