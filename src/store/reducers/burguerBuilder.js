import * as actionTypes from '../actions/actionTypes';

const INGREDIENTS_PRICE =  {
    salad: 0.5,
    bacon: 0.65,
    cheese: 0.6,
    meat: 1
}

const intialState ={
    ingredients: null,
    totalPrice: 4,
    error: false
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

        case actionTypes.SET_INGREDIENTS: 
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                },
                totalPrice: 4,
                error: false
            };

        case actionTypes.FETCH_INGREDIENTS_FAIL : 
            return {
                ...state,
                error: true
            };
        
        default: {
            return state    
        }
    };
};

export default reducer;