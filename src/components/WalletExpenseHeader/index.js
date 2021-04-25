import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './styles.css';

class WalletExpenseHeader extends Component {
  // HONESTIDADE INTELECTUAL -- INICIO --
  // O código que se inicia na linha abaixo e segue até a tag de fechamento foi implementado sob
  // consulta ao PR #107 mais especificamente ao commit 7a6aa89dfabde6267da19c05a518d81a1f85b1cc
  // Eu estava utilizando o estado global para calcular o valor total e atribuindo a uma nova chave
  // no store, porém no teste, o mesmo entendia o valor recebido como um NaN, impedindo a aprovação
  // no último teste do requisito 6. Procurei ajuda em plantões mas, não estava sendo capaz de pensar
  // numa solução que não envolvesse refatorar o projeto desde o zero. Não disponibilizando do tempo
  // necessário para isso atualmente, tomei então a liberdade de consultar a solução de outros colegas
  // chegando então até a aprovação pelo teste.
  calcTotal() {
    const { expenses } = this.props;
    const total = expenses.reduce((accumulator, element) => {
      const convertedValue = (
        Math.round(
          element.value * element.exchangeRates[element.currency].ask * 100,
        ) / 100
      );
      const partialTotal = (
        Math.round((Number(accumulator) + Number(convertedValue)) * 100) / 100
      );
      return partialTotal;
    }, 0);
    return total;
  }
  // HONESTIDADE INTELECTUAL -- FIM --

  render() {
    const { email } = this.props;
    return (
      <header className="header-component">
        TrybeWallet
        <div className="header-info">
          <div className="header-email">
            E-mail:
            <span data-testid="email-field">{ email }</span>
          </div>
          <div className="header-currency">
            Despesa total: R$
            <span data-testid="total-field">
              { this.calcTotal() }
            </span>
            <span data-testid="header-currency-field"> BRL</span>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses, /*
  total: state.wallet.total, */
});

WalletExpenseHeader.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf({}),
}.isRequired;

export default connect(mapStateToProps)(WalletExpenseHeader);
