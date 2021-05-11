import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrency, updateExpenses } from '../actions';
import '../css/spencesFormCss.css';

class SpencesForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      value: 0,
      description: '',
      method: '',
      currency: 'USD',
      tag: '',
      exchangeRates: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAddSpenceButton = this.handleAddSpenceButton.bind(this);
  }

  componentDidMount() {
    const { currenciesFetch } = this.props;
    currenciesFetch();
  }

  handleChange(target) {
    const { id, value } = target;
    this.setState({ [id]: value });
  }

  filterCurrencies(currArray) {
    const useCurrencies = currArray.filter(
      (cur) => cur.codein !== 'BRLT',
    );
    return useCurrencies;
  }

  handleAddSpenceButton() {
    const { currencies, currenciesFetch } = this.props;
    currenciesFetch();
    const { id } = this.state;
    const exchangeRates = this.filterCurrencies(currencies);
    this.setState({
      id: id + 1,
      exchangeRates,
    });
    this.sendToGlobalStore();
  }

  sendToGlobalStore() {
    const { updateSpences } = this.props;
    const { id, value, description, currency, method, tag, exchangeRates } = this.state;
    const expenses = {
      id, value, description, currency, method, tag, exchangeRates,
    };
    updateSpences(expenses);
  }

  renderOptionValues(moedas) {
    return (
      <label
        htmlFor="moeda"
      >
        Moeda
        <select
          id="currency"
          data-testid="currency-input"
          onChange={ (e) => this.handleChange(e.target) }
        >
          {moedas.map((cur) => (
            <option value={ cur.code } key={ cur.code } data-testid={ cur.code }>
              {cur.code}
            </option>
          ))}
        </select>
      </label>
    );
  }

  renderSpenceValueInput() {
    return (
      <label
        htmlFor="input-valor"
      >
        Valor
        <input
          type="number"
          id="value"
          data-testid="value-input"
          onChange={ (e) => this.handleChange(e.target) }
        />
      </label>
    );
  }

  renderAddSpenceButton() {
    return (
      <button
        type="button"
        onClick={ () => this.handleAddSpenceButton() }
      >
        Adicionar Despesa
      </button>
    );
  }

  renderTagOption() {
    return (
      <label htmlFor="tag-input">
        Tag
        <select
          id="tag"
          data-testid="tag-input"
          onChange={ (e) => this.handleChange(e.target) }
        >
          <option value="food">Alimentação</option>
          <option value="recreation">Lazer</option>
          <option value="work">Trabalho</option>
          <option value="transport">Transporte</option>
          <option value="health">Saúde</option>
        </select>
      </label>
    );
  }

  renderPaymentMethod() {
    return (
      <label htmlFor="pagamento">
        Método de Pagamento
        <select
          id="method"
          data-testid="method-input"
          onChange={ (e) => this.handleChange(e.target) }
        >
          <option value="dinheiro">Dinheiro</option>
          <option value="credito">Cartão de crédito</option>
          <option value="debito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderDescriptionInput() {
    return (
      <label htmlFor="desciption-input">
        Descrição
        <input
          type="text"
          id="description"
          data-testid="description-input"
          onChange={ (e) => this.handleChange(e.target) }
        />
      </label>
    );
  }

  render() {
    const { currencies } = this.props;
    const moedas = this.filterCurrencies(currencies);
    return (
      <form>
        <div className="user-info">
          { this.renderSpenceValueInput() }
          { this.renderOptionValues(moedas) }
          { this.renderPaymentMethod() }
          { this.renderTagOption() }
          { this.renderDescriptionInput() }
          { this.renderAddSpenceButton() }
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  fetching: state.wallet.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  currenciesFetch: () => dispatch(fetchCurrency()),
  updateSpences: (obj) => dispatch(updateExpenses(obj)),
});

SpencesForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
  currenciesFetch: PropTypes.func.isRequired,
  updateSpences: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SpencesForm);
