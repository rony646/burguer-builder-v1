import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import Checkout from './containers/Checkout/Checkout'
import Layout from './components/Layout/Layout'
import BurguerBuilder from './containers/BurguerBuilder/BurguerBuilder'
import Orders from './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/logout/Logout'
import * as actions from './store/actions/index'


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render() {

    let routes = (
        <Switch>
            <Route path="/auth" component={Auth}/>
            <Route path="/" component={BurguerBuilder} />
        </Switch>
    );

    if(this.props.isAuth) {
        routes = (
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders}/>
            <Route path="/logout" component={Logout} />
            <Route path="/" component={BurguerBuilder} />
        </Switch>
        )
    }

    return (
      <div>
        <Layout>
            {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state =>  {
   return {
      isAuth: state.auth.token !== null
   };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
