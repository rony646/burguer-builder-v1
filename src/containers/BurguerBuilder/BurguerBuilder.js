import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burguer from '../../components/Burguer/Burguer'
import BuildControls from '../../components/Burguer/BuildControls/BuildControls'

const INGREDIENTS_PRICE =  {
    salad: 0.5,
    bacon: 0.65,
    cheese: 0.6,
    meat: 1
}

class  BurguerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },

        totalPrice:  3
    }

    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount + 1
        const newIg = {
            ...this.state.ingredients
        }

        newIg[type] = newCount;

        let priceAdd = INGREDIENTS_PRICE[type];
        let oldPrice = this.state.totalPrice;
        let newPrice = oldPrice + priceAdd;

        
        this.setState({ingredients: newIg, totalPrice: newPrice})
    }


    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const newCount = oldCount - 1
        const newIg = {
            ...this.state.ingredients
        }

        newIg[type] = newCount;

        let priceLess = INGREDIENTS_PRICE[type];
        let oldPrice = this.state.totalPrice;
        let newPrice = oldPrice - priceLess;

        
        this.setState({ingredients: newIg, totalPrice: newPrice})
    }


    

    render() {
        {console.log(this.state.totalPrice)}
        return(
            <Auxiliary>
                <Burguer ingredients={this.state.ingredients} />
                <BuildControls
                 ingredientAdded={this.addIngredientHandler}
                 ingredientRemoved={this.removeIngredientHandler}/>
                
            </Auxiliary>
        );
    }
}

export default BurguerBuilder 