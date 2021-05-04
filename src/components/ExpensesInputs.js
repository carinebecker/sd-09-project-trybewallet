import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import handleInputsAction from '../actions/handleInputs';

import BtnAddExpense from './BtnAddExpense';
import InputExpenses from './InputExpenses';
import DescriptionInputs from './DescriptionInputs';
import SelectsCurrencies from './SelectsCurrencies';
import SelectsMethods from './SelectsMethods';
import SelectsTags from './SelectsTags';
import TableExpenses from './TableExpenses';

class ExpensesInput extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    };

    this.changeInput = this.changeInput.bind(this);
    this.resetInputs = this.resetInputs.bind(this);
    this.editExpenseValue = this.editExpenseValue.bind(this);
  }

  changeInput(event) {
    const { target: { name, value } } = event;
    const { handlingChange } = this.props;
    this.setState({
      [name]: value,
    });
    handlingChange(event);
  }

  resetInputs() {
    this.setState({
      value: '',
      description: '',
      currency: '',
      method: '',
      tag: '',
    });
  }

  editExpenseValue(editionExp) {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = editionExp;

    this.setState({
      value,
      description,
      currency,
      method,
      tag,
    });
  }

  render() {
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    return (
      <>
        <section className="input-expenses-container">
          <InputExpenses value={ value } changeInput={ this.changeInput } />
          <DescriptionInputs value={ description } changeInput={ this.changeInput } />
          <SelectsCurrencies value={ currency } changeInput={ this.changeInput } />
          <SelectsMethods value={ method } changeInput={ this.changeInput } />
          <SelectsTags value={ tag } changeInput={ this.changeInput } />
          <BtnAddExpense resetInputs={ this.resetInputs } />
        </section>
        <section>
          <TableExpenses editExpenseValue={ this.editExpenseValue } />
        </section>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  handlingChange: (event) => dispatch(handleInputsAction(event)),
});

ExpensesInput.propTypes = {
  handlingChange: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ExpensesInput);
