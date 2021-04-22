import React from 'react';
import { tableHeader } from '../../data';

class Header extends React.Component {
  render() {
    return (
      <tr>
        { tableHeader.map((field, index) => (
          <th key={ index }>{ field }</th>
        )) }
      </tr>
    );
  }
}

export default Header;
