import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.updateTotal = this.updateTotal.bind(this);

    // this.state = {
    //   total: 0,
    // }
  }

  updateTotal() {
    const { expenses } = this.props;
    return expenses
      .reduce((acc, element) =>
        acc += (Number(element.value) * Number(element.exchangeRates[element.currency].ask)),0
    ).toFixed(2);
  }

  render() {
    const { userEmail } = this.props;
    const { updateTotal } = this;

    return (
      <>
        <section
          name="userData"
        >
          <h3 data-testid="email-field">
            Bem vindo, 
            { userEmail }
          </h3>
        </section>
        <section
          name="walletData"
        >
          <label htmlFor="total">
            Total:
            <p
              id="total"
              data-testid="total-field"
            >
              { updateTotal() }
            </p>
          </label>
          <p data-testid="header-currency-field">Câmbio: BRL</p>
        </section>
      </>
    );
  }
}

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
