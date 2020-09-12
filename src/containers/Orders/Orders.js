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
        console.log('USER ID:', this.props.userId)
        this.props.onFetchOrders(this.props.userId);
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
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders : (userId) => dispatch(actions.fetchOrders(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)