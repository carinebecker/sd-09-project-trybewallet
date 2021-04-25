import React from 'react';
import PropTypes from 'prop-types';

class CategorySelect extends React.Component {
  render() {
    const { onChange, tag } = this.props;
    return (
      <div>
        <label htmlFor="tag">
          Categoria
          <select
            name="tag"
            id="tag"
            value={ tag }
            onChange={ onChange }
            data-testid="tag-input"
          >
            <option value="food">Alimentação</option>
            <option value="leisure">Lazer</option>
            <option value="transport">Transporte</option>
            <option value="health">Saúde</option>
          </select>
        </label>
      </div>
    );
  }
}

CategorySelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  tag: PropTypes.string.isRequired,
};

export default CategorySelect
