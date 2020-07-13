import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burguer from '../../components/Burguer/Burguer'
import BuildControls from '../../components/Burguer/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENTS_PRICE =  {
    salad: 0.5,
    bacon: 0.65,
    cheese: 0.6,
    meat: 1
}

class  BurguerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice:  3,
        purchaseable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => this.setState({ingredients: response.data}))
            .catch(e => {
                this.setState({error: true})
            })
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

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true})
        const order = {
            ingridientes: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Rony Peterson ',
                address: {
                    street: 'Rua teste',
                    number: '899',
                    country: 'Brazil'
                },
                email: 'teste@teste.com'
            },
            deliveryMethod: 'express'
        }
            axios.post('/orders.json', order)
            .then(response =>  {
               this.setState({ loading: false, purchasing: false })
            })
            .catch(e =>  {
                this.setState({loding: false, purchasing: false})
            })

        this.props.history.push('/checkout')

    }

    

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null

        
        let burguer = this.state.error ? 
                        <p style={{fontSize: '45px', textAlign: 'center'}}>Something is broken, please come back later</p>:
                        <Spinner />

        if(this.state.loading) {
            orderSummary = <Spinner />
        }


        if(this.state.ingredients) {
            burguer = <Auxiliary>
                        <Burguer ingredients={this.state.ingredients} />
                        <BuildControls
                            ingredientAdded={this.addIngredientHandler}
                            ingredientRemoved={this.removeIngredientHandler}
                            disabled={disabledInfo}
                            price={this.state.totalPrice}
                            purchaseable={this.state.purchaseable}
                            purchasing={this.purchasingHandler}
                        />
                      </Auxiliary>

            orderSummary =  <OrderSummary
                ig={this.state.ingredients} 
                cancelled={this.purchaseCancelHandler}
                continue={this.purchaseContinueHandler}
                price={this.state.totalPrice.toFixed(2)}>
            </OrderSummary>
        }
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burguer}
            </Auxiliary>
        );
    }
}

export default withErrorHandler(BurguerBuilder, axios) 
