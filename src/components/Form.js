import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { saveExpenseData } from '../actions';

import CurrencySelect from './CurrencySelect';
import MethodSelect from './MethodSelect';
import CategorySelect from './CategorySelect';
import './Form.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      currency: '',
      method: '',
      tag: '',
      description: '',
      currencyTypes: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    /* const currencies = getCurrencies.map((currency) => currency.code);
    console.log(currencies); */
    console.log(getCurrencies);
  }

  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  render() {
    const { value, currency, method, tag, description } = this.state;
    return (
      <form className="container-form" action="">
        <label htmlFor="value">
          Valor:
          <input
            className="input-value"
            id="value"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleInputChange }
            data-testid="value-input"
          />
        </label>
        <CurrencySelect onChange={ this.handleInputChange } currency={ currency } />
        <MethodSelect onChange={ this.handleInputChange } method={ method } />
        <CategorySelect onChange={ this.handleInputChange } tag={ tag } />
        <label htmlFor="description">
          Descricao:
          <input
            type="text"
            id="description"
            name="description"
            value={ description }
            onChange={ this.handleInputChange }
            data-testid="description-input"
          />
        </label>
        <button type="button">Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  getCurrencies: state.wallet,
  getExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  setExpenses: ({ value, currency, method, tag, description }) => dispatch(saveExpenseData({ value, currency, method, tag, description })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
