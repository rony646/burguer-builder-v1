import React, { Component } from 'react';

import { connect } from 'react-redux'
import * as burguerBuilderActions from '../../store/actions/index'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Burguer from '../../components/Burguer/Burguer'
import BuildControls from '../../components/Burguer/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
import axios from '../../axios-order'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'



class  BurguerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.onInitIngredients() // gettin from redux
    }

    updatePurchaseState (ig) {
        const ingredients = ig

        const sum = Object.keys(ingredients)
        .map(key => {
            return ingredients[key];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        return sum > 0;
    }

   

    purchasingHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase()
        this.props.history.push('/checkout')
    }

    

    render() {
        const disabledInfo = {
            ...this.props.ings
        }

        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null

        
        let burguer = this.props.error ? 
                        <p style={{fontSize: '45px', textAlign: 'center'}}>Something is broken, please come back later</p>:
                        <Spinner />



        if(this.props.ings) {
            burguer = <Auxiliary>
                        <Burguer ingredients={this.props.ings} />
                        <BuildControls
                            ingredientAdded={this.props.onIngredientAdded}
                            ingredientRemoved={this.props.onIngredientRemoved}
                            disabled={disabledInfo}
                            price={this.props.totalPrice}
                            purchaseable={this.updatePurchaseState(this.props.ings)}
                            purchasing={this.purchasingHandler}
                        />
                      </Auxiliary>

            orderSummary =  <OrderSummary
                ig={this.props.ings} 
                cancelled={this.purchaseCancelHandler}
                continue={this.purchaseContinueHandler}
                price={this.props.totalPrice.toFixed(2)}>
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

const mapStateToProps = state => {
    console.log('Monstrando estado', state)
   return {
        ings: state.burguerBuilder.ingredients,
        totalPrice: state.burguerBuilder.totalPrice,
        error: state.burguerBuilder.error
   };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burguerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burguerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burguerBuilderActions.initIngredients()),
        onInitPurchase: () => (dispatch(burguerBuilderActions.purchaseInit()))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurguerBuilder, axios)) 
