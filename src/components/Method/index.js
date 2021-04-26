import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Method extends Component {
  constructor(props) {
    super(props);

    this.state = {
      method: [
        'Dinheiro',
        'Cartão de crédito',
        'Cartão de débito',
      ],
    };
  }

  render() {
    const { fieldContent, onChange } = this.props;
    const { method } = this.state;
    return (
      <div>
        <span>Forma de Pagamento:</span>
        <select
          name="method"
          data-testid="method-input"
          value={ fieldContent }
          onChange={ onChange }
          className="method-input"
          required
        >
          {method.map((item, index) => (
            <option
              key={ index }
            >
              { item }
            </option>
          ))}
        </select>
      </div>
    );
  }
}

Method.propTypes = {
  fieldContent: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Method;
