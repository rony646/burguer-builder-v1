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
           dispatch(purchaseBurguerSuccess(response.data, orderData))
        })
        .catch(e =>  {
           dispatch(purchaseBurguerFail(e))        
        })
    }
}