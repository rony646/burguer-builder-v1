import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom'

import Checkout from './containers/Checkout/Checkout'
import Layout from './components/Layout/Layout'
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'



class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders}/>
            <Route path="/auth" component={Auth}/>
            <Route path="/" component={BurguerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
