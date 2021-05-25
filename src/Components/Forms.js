import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrenciesValues } from '../actions/index';

const categories = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const payment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
class Forms extends Component {
  constructor(props) {
    super(props);

    this.addExpense = this.addExpense.bind(this);
  }

  componentDidMount() {
    const { fetchCurrenciesValues } = this.props;
    fetchCurrenciesValues();
  }

  addExpense() {
    return (
      <button
        type="button"
      >
        Adicionar despesa
      </button>
    );
  }

  render() {
    return (
      <div>
        <label htmlFor="value">
          Valor:
          <input type="text" data-testid="value-input" />
        </label>
        <label htmlFor="description">
          Descrição:
          <input type="text" data-testid="description-input" />
        </label>
        <label htmlFor="method">
          Pagamento:
          <select data-testid="method-input" name="method" id="method">
            {payment.map((pay) => (
              <option key={ pay } value={ pay }>
                {pay}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="tag">
          Tipo:
          <select data-testid="tag-input" name="tag" id="tag">
            {categories.map((tag) => (
              <option key={ tag } value={ tag }>
                {tag}
              </option>
            ))}
          </select>
        </label>
      </div>
    );
  }
}

Forms.propTypes = {
  fetchCurrenciesValues: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesValues: () => dispatch(fetchCurrenciesValues()),
});

export default connect(mapDispatchToProps)(Forms);
