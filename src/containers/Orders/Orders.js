import React, { Component } from 'react'

import Order from './Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'
import { connect } from 'react-redux'

import * as  actions from '../../store/actions/index'

class Orders extends Component {

    state = {
        orders: null
    }

    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }

    render() {
        let orders = <Spinner /> 
        if(!this.props.loading) {
            orders = this.props.orders.map(e => {
                return <Order
                        key={e.price}
                        ig={e.ingredients}
                        price={e.price}>
                       </Order>
            })
        return(           
            <div>
               {orders}
            </div>
        )
    }
}}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders : (token) => dispatch(actions.fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)