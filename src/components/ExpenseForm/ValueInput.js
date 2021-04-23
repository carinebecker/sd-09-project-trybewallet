import React from 'react';

class ValueInput extends React.Component {
 /*  constructor(props) {
    super(props);
  } */

  render() {
    /* const { value } = this.state; */
    const { value, handleChange } = this.props;
    return (
      <label htmlFor="value-input">
        Valor da despesa:
        <input
          data-testid="value-input"
          id="value-input"
          name="value"
          type="text"
          onChange={ (event) => handleChange(event) }
          value={ value }
        />
      </label>
    );
  }
}

export default ValueInput;
