import React, { Component } from 'react';

import Checkout from './containers/Checkout/Checkout'
import Layout from './components/Layout/Layout'
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder'

class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <BurguerBuilder />
          <Checkout />
        </Layout>
      </div>
    );
  }
}

export default App;
