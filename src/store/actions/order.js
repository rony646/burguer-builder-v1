import * as actionTypes from './actionTypes'

import axios from '../../axios-order'

export const purchaseBurguerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGUER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurguerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGUER_FAIL,
        error: error
    }
};

export const purchaseBurguerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGUER_START,

    }
}

export const purchaseBurguer = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurguerStart())
        axios.post('/orders.json', orderData)
        .then(response =>  {
           dispatch(purchaseBurguerSuccess(response.data.name, orderData))
        })
        .catch(e =>  {
           dispatch(purchaseBurguerFail(e))        
        })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fechOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGUER_FAIL,
        error: error
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = () => {

    return dispatch => {
        axios.get('/orders.json')
        .then(response => {
                if(response.data !== null) {
                const data = Object.values(response.data)
                dispatch(fechOrdersSuccess(data))
            }
        })
        .catch(error => {
            dispatch(fetchOrdersFail(error))
        })
    }
    
}