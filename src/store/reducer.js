import * as actionTypes from './actions';

const INGREDIENTS_PRICE =  {
    salad: 0.5,
    bacon: 0.65,
    cheese: 0.6,
    meat: 1
}

const intialState ={
    ingredients: {
       salad: 0,
       bacon: 0,
       meat: 0,
       cheese: 0
    },
    totalPrice: 4
};

const reducer = (state = intialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
            };
        default: {
            return state    
        }
    };
};

export default reducer;