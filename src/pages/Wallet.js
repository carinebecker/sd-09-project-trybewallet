import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  savesCurrencyList as savesCurrencyListAction,
} from '../actions';
import Header from '../components/Header';
import { currencyList } from '../services/currencyData';
import ExpenseForm from '../components/ExpenseForm';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.test = this.test.bind(this);
  }

  componentDidMount() {
    this.savesCurrencyList();
  }

  async savesCurrencyList() {
    const { savesCurrencyList } = this.props;
    const currencyArray = await currencyList();
    savesCurrencyList(currencyArray);
  }

  test() {
    // console.log(this.state.currencyList);
  }

  render() {
    const { test } = this;

    return (
      <>
        <button
          type="button"
          onClick={ () => test() }
        >
          teste
        </button>
        <Header />
        <ExpenseForm />
      </>
    );
  }
}

Wallet.propTypes = {
  savesCurrencyList: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  savesCurrencyList: (currencies) => dispatch(savesCurrencyListAction(currencies)),
});

export default connect(null, mapDispatchToProps)(Wallet);
