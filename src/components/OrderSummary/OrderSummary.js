import React from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Button from '../UI/Button/Button'

const OrderSummary = props => {
    const ingredientSummary = Object.keys(props.ig)
    .map(igKey => 
        <li key={igKey}>
            <span style={{textTransform: "capitalize"}}>
                {igKey} : {props.ig[igKey]}
            </span>
        </li>)

    return(
        
        <Auxiliary>
            <h3>Your order: </h3>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {props.price}</strong></p>
            <Button type="Danger" clicked={props.cancelled}>Cancel</Button>
            <Button type="Success" clicked={props.continue}>Continue</Button>
        </Auxiliary>
    )
}
export default OrderSummary;

