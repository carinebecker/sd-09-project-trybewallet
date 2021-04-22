import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Body extends React.Component {
  render() {
    const { expenses } = this.props;
    return (
      <>
        { expenses.map((exp) => (
          <tr key={ exp.id }>
            <td>{ exp.description }</td>
            <td>{ exp.tag }</td>
            <td>{ exp.method }</td>
            <td>{ exp.value }</td>
            <td>{ exp.currency }</td>
            <td>Câmbio utilizado</td>
            <td>Valor convertido</td>
            <td>BRL</td>
            <td>eDITAR/EXCLUIR</td>
          </tr>
        )) }
      </>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

Body.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Body);
