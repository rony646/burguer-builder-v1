import * as actionTypes from './actionTypes'

import axios from '../../axios-order'

export const addIngredient = (name) => {
    return  {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}
 
export const removeIngredient = (name) => {
    return  {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientsFail = () =>  {
    return  {
        type: actionTypes.FETCH_INGREDIENTS_FAIL
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then( res => {
                dispatch(setIngredients(res.data))
            })
            .catch(e => {
                dispatch(fetchIngredientsFail())
            })
    }
}