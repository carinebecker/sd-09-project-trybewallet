import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserCosts extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <p data-testid="email-field">
          { email }
        </p>
      </div>
    );
  }
}

UserCosts.propTypes = {
  email: PropTypes.string.isRequired,
};

export default UserCosts;
