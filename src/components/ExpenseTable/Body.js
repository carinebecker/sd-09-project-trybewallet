import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

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
            <td>
              {
                exp.exchangeRates[exp.currency].name.split('/')[0]
              }
            </td>
            <td>
              {
                parseFloat(exp.exchangeRates[exp.currency].ask).toFixed(2)
              }
            </td>
            <td>
              {
                parseFloat(exp.exchangeRates[exp.currency].ask * exp.value).toFixed(2)
              }
            </td>
            <td>Real</td>
            <td>
              <DeleteButton id={ exp.id } />
              <EditButton id={ exp.id } />
            </td>
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
