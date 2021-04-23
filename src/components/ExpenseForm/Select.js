import React from 'react';
import PropTypes from 'prop-types';
import { payMethods, tagExpense } from '../../data';

class Select extends React.Component {
  render() {
    const { value, handleChange, name, label } = this.props;
    let array = [];
    if (name === 'tag') {
      array = tagExpense;
    } else {
      array = payMethods;
    }
    return (
      <label htmlFor={ `${name}-input` }>
        { label }
        <select
          data-testid={ `${name}-input` }
          id={ `${name}-input` }
          name={ name }
          onChange={ (event) => handleChange(event) }
          value={ value }
        >
          { array
            .map((element, index) => (
              <option
                key={ index }
              >
                { element }
              </option>)) }
        </select>
      </label>
    );
  }
}

Select.defaultProps = {
  value: '',
};

Select.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Select;
