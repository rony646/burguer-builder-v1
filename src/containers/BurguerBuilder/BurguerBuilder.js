import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burguer from '../../components/Burguer/Burguer'
import BuildControls from '../../components/Burguer/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/OrderSummary/OrderSummary'

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

        totalPrice:  3,
        purchaseable: false,
        purchasing: false
    }

    updatePurchaseState (ig) {
        const ingredients = ig

        const sum = Object.keys(ingredients)
        .map(key => {
            return ingredients[key];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({purchaseable: sum > 0})
    };

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
        this.updatePurchaseState(newIg)
    }


    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const newCount = oldCount - 1
        const newIg = {
            ...this.state.ingredients
        }

        newIg[type] = newCount;

        let priceLess = INGREDIENTS_PRICE[type];
        let oldPrice = this.state.totalPrice;
        let newPrice = oldPrice - priceLess;

        
        this.setState({ingredients: newIg, totalPrice: newPrice})
        this.updatePurchaseState(newIg)
    }

    purchasingHandler = () => {
        this.setState({purchasing: true});
    }

    

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return(
            <Auxiliary>
                {console.log('Finalizando: ', this.state.purchasing)}
                <Modal show={this.state.purchasing}>
                    <OrderSummary ig={this.state.ingredients} />
                </Modal>
                <Burguer ingredients={this.state.ingredients} />
                <BuildControls
                 ingredientAdded={this.addIngredientHandler}
                 ingredientRemoved={this.removeIngredientHandler}
                 disabled={disabledInfo}
                 price={this.state.totalPrice}
                 purchaseable={this.state.purchaseable}
                 purchasing={this.purchasingHandler}/>
            </Auxiliary>
        );
    }
}

export default BurguerBuilder 