import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, enableBtn } from '../actions';

class Table extends Component {
  constructor() {
    super();
    this.renderExpenses = this.renderExpenses.bind(this);
  }

  renderExpenses() {
    const { expenses, deleteItems, activateBtn } = this.props;
    if (expenses !== undefined) {
      return expenses.map((objects, index) => (
        <tr key={ objects.id }>
          <td>{objects.description}</td>
          <td>{objects.tag}</td>
          <td>{objects.method}</td>
          <td>{objects.value}</td>
          <td>
            {(objects.exchangeRates[objects.currency].name).split('/', 2)[0]}
          </td>
          <td>{ Number(objects.exchangeRates[objects.currency].ask).toFixed(2) }</td>
          <td>
            { (Number(objects.value)
           * Number(objects.exchangeRates[objects.currency].ask)).toFixed(2)}
          </td>
          <td>Real</td>
          <button
            type="button"
            data-testid="edit-btn"
            onClick={ () => activateBtn(true, index) }
          >
            Editar despesa
          </button>
          <button
            type="button"
            data-testid="delete-btn"
            onClick={ () => deleteItems(objects.id) }
          >
            Deletar
          </button>
        </tr>
      ));
    }
  }

  render() {
    return (
      <div>
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
        { this.renderExpenses() }
      </div>

    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteItems: (expenses) => dispatch(deleteExpense(expenses)),
  activateBtn: (bool, index) => dispatch(enableBtn(bool, index)),
});

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.objectOf(Object).isRequired,
  deleteItems: PropTypes.func.isRequired,
  activateBtn: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);

// teste
