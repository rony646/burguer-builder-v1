import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from '../../containers/Checkout/ContactData/ContactData'
import * as actions from '../../store/actions/index'

class Checkout extends Component {

    
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {

        let summary = <Redirect to='/'/>

        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary = <div>
                            {purchasedRedirect}
                            <CheckoutSummary
                            checkoutCancelled={this.checkoutCancelledHandler}
                            checkoutContinued={this.checkoutContinuedHandler} 
                            ingredients={this.props.ings}
                            />
                      </div>
                        
        }

        return(
           <div>
                {summary}
                <Route path={this.props.match.url + '/contact-data'} component={ContactData}/>
           </div>
        )
    };
}

const mapStateToProps = state => {
    return {
        ings: state.burguerBuilder.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(mapStateToProps)(Checkout);