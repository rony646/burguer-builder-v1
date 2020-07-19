import React, { Component } from 'react'
import axios from '../../axios-order'

import Order from './Order/Order'

class Orders extends Component {

    state = {
        orders: null
    }

    componentDidMount() {
        console.log('[ORDERS.js] mounted')
        axios.get('/orders.json')
            .then(r => {
              if(r.data !== null) {
                const data = Object.values(r.data)
                this.setState({orders: data})
              }
            })
    }

    render() {
        let loadedOrders = this.state.orders
        let showOrders;
        if(loadedOrders) {
            showOrders = loadedOrders.map(e => {
                return <Order
                        key={e.price}
                        ig={e.ingredients}
                        price={e.price}>
                       </Order>
            })
        } else {
            showOrders = <h1 style={{textAlign: 'center'}}>Nothing to show here!</h1>
        }
        return(           
            <div>
               {showOrders}
            </div>
        )
    }
}

export default Orders