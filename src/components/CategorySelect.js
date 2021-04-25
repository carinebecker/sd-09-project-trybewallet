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
            onChange={ onChange }
            data-testid="tag-input"
          >
            <option value={ tag }>Alimentação</option>
            <option value={ tag }>Lazer</option>
            <option value={ tag }>Transporte</option>
            <option value={ tag }>Saúde</option>
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

export default CategorySelect;
