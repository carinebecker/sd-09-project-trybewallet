import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable';
import EditForm from '../components/EditForm';

class Wallet extends React.Component {
  render() {
    const { isEditing } = this.props;
    return (
      <>
        <Header />
        { isEditing ? <EditForm /> : <ExpenseForm /> }
        <ExpenseTable />
        <h1>
          TrybeWallet
        </h1>
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
