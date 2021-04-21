import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ExpenseAddForm extends React.Component {
  createrExpenses() {
    const { stateProps } = this.props;
    const expenses = stateProps;

    if (expenses !== undefined) {
      return expenses
        .map(({ id,
          value,
          description,
          currency,
          method,
          tag,
          exchangeRates }) => {
          const { name, ask } = exchangeRates[currency];
          const total = value * Number(ask);
          return (
            <tr key={ id }>
              <td name={ description }>{ description }</td>
              <td name={ tag }>{ tag }</td>
              <td name={ method }>{ method }</td>
              <td name={ Number(ask).toFixed(2) }>
                { `${Number(ask).toFixed(2)}` }
              </td>
              <td name={ name.substring(0, )}>{ name }</td>
              <td name={ value }>{ value }</td>
              <td>{ `${total.toFixed(2)}` }</td>
              <td>Real</td>
              <button type="button" data-testid="edit-btn">Editar</button>
              <button type="button" data-testid="delete-btn">Exluir</button>
            </tr>
          );
        });
    }
  }

  render() {
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
