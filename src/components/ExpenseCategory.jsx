import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ExpenseCategory extends Component {
  render() {
    const { handleChange } = this.props;
    return (
      <label htmlFor="tag">
        Tag:
        <select
          name="tag"
          id="tag"
          data-testid="tag-input"
          onChange={ handleChange }
          defaultValue="Alimentação"
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }
}

ExpenseCategory.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default ExpenseCategory;
