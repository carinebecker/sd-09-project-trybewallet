import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Description extends Component {
  render() {
    const { fieldContent, onChange } = this.props;
    return (
      <label htmlFor="description">
        Descrição:
        <input
          type="text"
          name="description"
          id="input-description"
          data-testid="description-input"
          onChange={ onChange }
          value={ fieldContent }
          className="description-input"
          required
        />
      </label>
    );
  }
}

Description.propTypes = {
  fieldContent: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Description;
