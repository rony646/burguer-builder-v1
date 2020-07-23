import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import axios from '../../../axios-order'

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
                value: ''
            },   
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', displayValue: 'Fastest'}, {value: 'fast', displayValue: 'Fast'}]
                },
                value: ''
            }
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const formData = {}
        for (let formElementIdendifier in this.state.orderForm) {
            formData[formElementIdendifier] = this.state.orderForm[formElementIdendifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
        }
            axios.post('/orders.json', order)
            .then(response =>  {
               this.setState({ loading: false})
               this.props.history.push('/');
            })
            .catch(e =>  {
                this.setState({loading: false})
            })
    }

    inputChangedHandler = (e, inputId) => {
       const updatedOrderForm = {
           ...this.state.orderForm
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputId]
        };

        updatedFormElement.value = e.target.value;

        updatedOrderForm[inputId] = updatedFormElement

        this.setState({orderForm: updatedOrderForm})

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
                                   changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                   elementType={formElement.config.elementType}
                                   elementConfig={formElement.config.elementConfig}
                                   value={formElement.config.value} />
                        })
                    }
                    <Button type="Success" clicked={this.orderHandler}>ORDER NOW</Button>
                </form>
            </div>
        );
        if(this.state.loading) { 
            form = <Spinner />
        }
        return(
           <div className={classes.ContactData}>
                {form}
           </div>
        )
    };
};

export default ContactData;