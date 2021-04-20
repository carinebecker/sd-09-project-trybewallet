import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpenseAddForm extends React.Component {
  createrExpenses() {
    const { stateProps } = this.props;
    const expenses = stateProps;
    return expenses
      .map(({ id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates }) => {
        console.log(exchangeRates[currency]);
        const { name, ask } = exchangeRates[currency];
        return (
          <tr key={ id }>
            <th>{ description }</th>
            <th>{ tag }</th>
            <th>{ method }</th>
            <th>{ value }</th>
            <th>{ currency }</th>
            <th>convertValue</th>
            <th>{ `R$ ${ask}` }</th>
            <th>{ name }</th>
            <button type="button" data-testid="edit-btn">Editar</button>
            <button type="button" data-testid="delete-btn">Exluir</button>
          </tr>
        );
      });
  }

  render() {
    // console.log(this.props.wallet);
    return (
      <div>
        <table>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          { this.createrExpenses() }
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  stateProps: state.wallet.expenses,
  wallet: state.wallet,
});

export default connect(mapStateToProps)(ExpenseAddForm);

ExpenseAddForm.propTypes = {
  stateProps: PropTypes.array,
}.isRequired;
