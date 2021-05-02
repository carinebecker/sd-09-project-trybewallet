import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Tag extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tag: [
        'Alimentação',
        'Lazer',
        'Trabalho',
        'Transporte',
        'Saúde',
      ],
    };
  }

  render() {
    const { fieldContent, onChange } = this.props;
    const { tag } = this.state;
    return (
      <div>
        <span>Categoria:</span>
        <select
          name="tag"
          id="input-tag"
          data-testid="tag-input"
          value={ fieldContent }
          onChange={ onChange }
          className="tag-input"
          required
        >
          {tag.map((item, index) => (
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

Tag.propTypes = {
  fieldContent: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Tag;
