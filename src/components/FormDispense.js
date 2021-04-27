import React from 'react';
import { connect } from 'react-redux';
import { func, string, arrayOf, shape } from 'prop-types';
import InputGeneric from './InputGeneric';
import expensesAction from '../actions/expensesAction';
import { editAction } from '../actions/editAction';

class FormDispense extends React.Component {
  constructor(props) {
    super(props);

    this.inputsForm = this.inputsForm.bind(this);
    this.fecthCurrency = this.fecthCurrency.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.options = this.options.bind(this);

    this.state = {
      id: 0,
      value: 0,
      currency: '',
      method: '',
      tag: '',
      description: '',
      currencyList: [],
    };
  }

  componentDidMount() {
    this.fecthCurrency();
  }

  async fecthCurrency() {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const currency = await response.json();
      const currencyFiltred = Object.keys(currency)
        .filter((curr) => curr !== 'USDT');
      this.setState({
        currencyList: currencyFiltred,
      });
    } catch (error) {
      console.log(error);
    }
  }

  handleChange({ target }) {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    const { expensesAction: sendData } = this.props;
    sendData(this.state);
    this.setState((oldState) => ({
      id: oldState.id + 1,
      value: 0,
      currency: '',
      method: '',
      tag: '',
      description: '',
    }));
  }

  handleEdit(idElementEdit) {
    const { wallet, editAction: sendEdited } = this.props;
    const { value, currency, method, tag, description } = this.state;
    const { expenses } = wallet;
    expenses.forEach((expense) => {
      if (expense.id === idElementEdit) {
        expense.value = value;
        expense.currency = currency;
        expense.method = method;
        expense.tag = tag;
        expense.description = description;
      }
    });
    sendEdited(expenses);
  }

  options() {
    const currency = [
      'USD',
      'CAD',
      'EUR',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
    ];
    return (
      currency.map((curr) => <option key={ curr } data-testid={ curr }>{curr}</option>)
    );
  }

  inputsForm() {
    const {
      value,
      description,
      currency,
    } = this.state;
    const { enableEdit } = this.props;
    const { elementEdit, editing } = enableEdit;

    return (
      <div>
        <InputGeneric
          type="number"
          dataTestId="value-input"
          name="value"
          placeholder={ editing && elementEdit[0].value }
          value={ value }
          functionChange={ this.handleChange }
        />
        <InputGeneric
          type="text"
          dataTestId="description-input"
          name="description"
          placeholder={ editing && elementEdit[0].description }
          value={ description }
          functionChange={ this.handleChange }
        />
        <select
          data-testid="currency-input"
          name="currency"
          value={ currency }
          onChange={ this.handleChange }
        >
          <option value="">Selecione a moeda</option>
          { this.options() }
        </select>
      </div>
    );
  }

  render() {
    const { method, tag } = this.state;
    const { enableEdit } = this.props;
    const { elementEdit, editing } = enableEdit;
    return (
      <section>
        { this.inputsForm() }
        <select
          data-testid="method-input"
          onChange={ this.handleChange }
          name="method"
          selected={ editing && method === elementEdit[0].method }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          onChange={ this.handleChange }
          name="tag"
          selected={ editing && tag === elementEdit[0].tag }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        <button
          type="button"
          onClick={ editing
            ? () => this.handleEdit(elementEdit[0].id)
            : this.handleClick }
        >
          { editing ? 'Editar despesa' : 'Adicionar despesa' }
        </button>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  wallet: state.wallet,
  enableEdit: state.enableEditReducer,
});

const mapDispatchToProps = {
  expensesAction,
  editAction,
};

FormDispense.propTypes = {
  expensesAction: func.isRequired,
  editAction: func.isRequired,
  enableEdit: shape({
    elementEdit: arrayOf(shape({
      id: string,
      description: string,
      tag: string,
      method: string,
      value: string,
      exchangeRates: shape({
        name: string,
        ask: string,
      }),
    })),
  }),
  wallet: shape({
    elementEdit: arrayOf(shape({
      id: string,
      description: string,
      tag: string,
      method: string,
      value: string,
      exchangeRates: shape({
        name: string,
        ask: string,
      }),
    })),
  }),
};

FormDispense.defaultProps = {
  enableEdit: {},
  wallet: {},
};

export default connect(mapStateToProps, mapDispatchToProps)(FormDispense);
