import React from 'react';
import { string, func } from 'prop-types';

class InputGeneric extends React.Component {
  render() {
    const { type, name, value, functionChange, dataTestId, placeholder } = this.props;
    return (
      <input
        type={ type }
        name={ name }
        id={ name }
        placeholder={ placeholder }
        value={ value }
        onChange={ functionChange }
        data-testid={ dataTestId }
      />
    );
  }
}

InputGeneric.propTypes = {
  type: string.isRequired,
  name: string.isRequired,
  value: string.isRequired,
  dataTestId: string.isRequired,
  functionChange: func.isRequired,
  placeholder: string,
};

InputGeneric.defaultProps = {
  placeholder: '',
};

export default InputGeneric;
