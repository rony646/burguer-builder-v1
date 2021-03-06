import React, { Component } from 'react'

import { connect } from 'react-redux'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import axios from '../../../axios-order'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index'

import classes from './ContactData.css'

class ContactData extends Component {

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },   
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', displayValue: 'Fastest'}, {value: 'fast', displayValue: 'Fast'}]
                },
                value: 'fastest',
                validation: {
                    required: false
                },
                valid: true
            }
        },
        formIsValid: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {}
        for (let formElementIdendifier in this.state.orderForm) {
            formData[formElementIdendifier] = this.state.orderForm[formElementIdendifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.totalPrice,
            orderData: formData,
            userid: this.props.userId
        }
        
        this.props.onOrderBurguer(order)
    }

    checkValidity(value, rules) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        return isValid
    }

    inputChangedHandler = (e, inputId) => {
       const updatedOrderForm = {
           ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputId]
        };

        updatedFormElement.value = e.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation );

        console.log(updatedFormElement)


        updatedOrderForm[inputId] = updatedFormElement

        let formIsValid = true;

        for(let inputIdentifiers in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifiers].valid && formIsValid
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})

    }

    render() {

        const formElements = [];

        for(let key in this.state.orderForm) {
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <div>
                <h1>Enter your Contact Data</h1>
                  <form onSubmit={this.orderHandler}>
                    {
                        formElements.map(formElement => {
                            return <Input
                                   key={formElement.id}
                                   shouldValidate={formElement.config.validation}
                                   invalid={!formElement.config.valid}
                                   changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                   elementType={formElement.config.elementType}
                                   elementConfig={formElement.config.elementConfig}
                                   value={formElement.config.value} />
                        })
                    }
                    <Button type="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER NOW</Button>
                </form>
            </div>
        );
        if(this.props.loading) { 
            form = <Spinner />
        }
        return(
           <div className={classes.ContactData}>
                {form}
           </div>
        )
    };
};

const mapStateToProps = state => {
    return  {
        ings: state.burguerBuilder.ingredients,
        totalPrice: state.burguerBuilder.totalPrice,
        loading: state.order.loading,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurguer: (orderData) => dispatch(actions.purchaseBurguer(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));