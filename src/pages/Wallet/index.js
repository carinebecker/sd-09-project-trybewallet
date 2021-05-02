import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import ExpensesForm from '../../components/ExpenseForm';
import ExpenseTable from '../../components/ExpenseTable';
import EditForm from '../../components/EditForm';

class Wallet extends React.Component {
  render() {
    const { isEditing } = this.props;
    return (
      <main>
        <Header />
        {!isEditing ? (<ExpensesForm />) : (<EditForm />)}
        <ExpenseTable />
      </main>
    );
  }
}

const mapStateToProps = (state) => ({ isEditing: state.wallet.isEditing });

Wallet.propTypes = {
  isEditing: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Wallet);
