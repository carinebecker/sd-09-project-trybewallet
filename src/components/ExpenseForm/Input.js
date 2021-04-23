import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const { value, handleChange, name, label } = this.props;
    return (
      <label htmlFor={ `${name}-input` }>
        { label }
        <input
          data-testid={ `${name}-input` }
          id={ `${name}-input` }
          name={ name }
          type="text"
          onChange={ (event) => handleChange(event) }
          value={ value }
        />
      </label>
    );
  }
}

Input.defaultProps = {
  value: '',
};

Input.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Input;
