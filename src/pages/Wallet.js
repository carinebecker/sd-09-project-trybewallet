import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Form from '../components/Form';
import Header from '../components/Header';
import ExpenseTable from '../components/ExpenseTable';
import { fetchCurrencyTypes } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencyTypes } = this.props;
    getCurrencyTypes();
  }

  render() {
    const { isFetching } = this.props;
    console.log('render wallet');
    console.log(isFetching);
    const walletContent = (
      <div>
        <Header />
        <Form />
        <ExpenseTable />
      </div>
    );

    return isFetching ? 'Loading...' : walletContent;
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.wallet.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencyTypes: () => dispatch(fetchCurrencyTypes()),
});

Wallet.propTypes = {
  getCurrencyTypes: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
