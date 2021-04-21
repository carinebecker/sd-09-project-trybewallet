import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchCurrency from '../services/api';

class SelectCurrency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: {},
    };

    this.getCurrencies = this.getCurrencies.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  getCurrencies() {
    fetchCurrency().then((currencies) => this.setState({ currencies }));
  }

  render() {
    const { currencies } = this.state;
    const { handleChange } = this.props;
    const selectCurrency = Object.keys(currencies).map((currency, index) => (
      <option
        value={ currency }
        key={ index }
        data-testid={ currency }
      >
        {currency}
      </option>
    ));
    return (
      <label htmlFor="currency">
        Moeda:
        <select
          name="currency"
          id="currency"
          data-testid="currency-input"
          onChange={ handleChange }
          defaultValue="USD"
        >
          {selectCurrency}
        </select>
      </label>
    );
  }
}

SelectCurrency.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default SelectCurrency;
