import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  constructor() {
    super();
    this.state = {

    };
    this.renderExpenses = this.renderExpenses.bind(this);
    this.alternName = this.alternName.bind(this);
  }

  alternName(name) {
    if (name === 'Dólar Americano') {
      return <td>Dólar Comercial</td>;
    }
    return <td>{name}</td>;
  }

  renderExpenses() {
    const { expenses } = this.props;
    if (expenses) {
      console.log(expenses);
      return expenses.map((objects) => (
        <tr key={ objects.id }>
          <td>{objects.description}</td>
          <td>{objects.tag}</td>
          <td>{objects.method}</td>
          <td>{objects.value}</td>
          <td>
            { this.alternName(
              (objects.exchangeRates[objects.currency].name).split('/', 2)[0],
            )}
          </td>
          <td>{ Number(objects.exchangeRates[objects.currency].ask).toFixed(2) }</td>
          <td>
            { (Number(objects.value)
           * Number(objects.exchangeRates[objects.currency].ask)).toFixed(2)}
          </td>
          <td>Real</td>
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

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.objectOf(Array).isRequired,
};

export default connect(mapStateToProps)(Table);
