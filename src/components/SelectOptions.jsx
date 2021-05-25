import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectOption extends Component {
  render() {
    const { id, options, onChange, name } = this.props;
    return (
      <label htmlFor={ id }>
        <select name={ name } data-testid={ id } onChange={ onChange }>
          { options.map((option) => (
            <option
              value={ option }
              key={ option }
              data-testid={ option }
            >
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }
}

SelectOption.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectOption;
