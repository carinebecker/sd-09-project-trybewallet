import React from 'react';
import { Switch, Route } from 'react-router-dom';
import EditSelectedItem from './components/EditSelectedItem';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/carteira" component={ Wallet } />
        <Route exact path="/edit" component={ EditSelectedItem } />
      </Switch>
    );
  }
}

export default App;
