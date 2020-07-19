import React, { Component } from 'react'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import axios from '../../../axios-order'

import classes from './ContactData.css'

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
               this.setState({ loading: false})
               this.props.history.push('/');
            })
            .catch(e =>  {
                this.setState({loading: false})
            })
    }

    render() {
        let form = (
            <div>
                <h1>Enter your Contact Data</h1>
                <form>
                    <input type="text" name="name" placeholder="Your Name" />
                    <input type="email" name="email" placeholder="Your Email" />
                    <input type="text" name="street" placeholder="Street" />
                    <input type="text" name="postal" placeholder="Your postal code" />
                    <Button type="Success" clicked={this.orderHandler}>ORDER NOW</Button>
                </form>
            </div>
        );
        if(this.state.loading) { 
            let form = <Spinner />
        }
        return(
           <div className={classes.ContactData}>
                {form}
           </div>
        )
    };
};

export default ContactData;