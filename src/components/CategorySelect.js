import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

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
            <option value="recreation">Lazer</option>
          </select>
        </label>
      </div>
    );
  }
}

export default CategorySelect
