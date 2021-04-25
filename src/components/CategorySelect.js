import React from 'react';
import PropTypes from 'prop-types';

class CategorySelect extends React.Component {
  render() {
    const { onChange } = this.props;
    return (
      <div>
        <label htmlFor="tag">
          Categoria
          <select
            name="tag"
            id="tag"
            onChange={ onChange }
            data-testid="tag-input"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

CategorySelect.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default CategorySelect;
