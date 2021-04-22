import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.header = this.header.bind(this);
    this.handleLocalState = this.handleLocalState.bind(this);
    this.expenseAmount = this.expenseAmount.bind(this);
    this.expenseDescription = this.expenseDescription.bind(this);
    this.coin = this.coin.bind(this);

    this.state = {
      expenseAmount: 0,
      expenseDescription: '',
      // coin: '',
    };
  }

  header() {
    const { usuario } = this.props;
    return (
      <header>
        <div>TrybeWallet</div>
        <p data-testid="email-field">{ `Usuário ${usuario}` }</p>
        <p data-testid="total-field">Despesa total 0</p>
        <p data-testid="header-currency-field">Câmbio BRL</p>
      </header>
    );
  }

  handleLocalState({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  expenseAmount() {
    const { expenseAmount } = this.state;
    return (
      <label
        data-testid="value-input"
        htmlFor="expense_amount"
      >
        Valor da despesas
        <input
          name="expenseAmount"
          placeholder="Insira o valor"
          id="expense_amount"
          type="number"
          className="expenseValue"
          value={ expenseAmount }
          onChange={ this.handleLocalState }
        />
      </label>
    );
  }

  expenseDescription() {
    const { expenseDescription } = this.state;
    return (
      <label
        data-testid="description-input"
        htmlFor="expense_description"
      >
        Descrição da despesa
        <input
          name="expenseDescription"
          id="expense_description"
          type="text"
          className="descriptionExpense"
          value={ expenseDescription }
          onChange={ this.handleLocalState }
        />
      </label>
    );
  }

  // coin() {
  //   return (

  //   );
  // }

  render() {
    return (
      <div>
        {this.header()}
        <form>
          { this.expenseAmount() }
          { this.expenseDescription() }
          {/* { this.coin() } */}
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  usuario: state.user.email,
});

Wallet.propTypes = {
  usuario: PropTypes.string,
};

Wallet.defaultProps = {
  usuario: '',
};

export default connect(mapStateToProps, null)(Wallet);
