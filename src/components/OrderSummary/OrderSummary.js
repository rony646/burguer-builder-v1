import React, {Component} from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Button from '../UI/Button/Button'

class OrderSummary  extends Component  {

    componentWillUpdate() {
        console.log('[OrderSummary]: will update')
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ig)
        .map(igKey => 
            <li key={igKey}>
                <span style={{textTransform: "capitalize"}}>
                    {igKey} : {this.props.ig[igKey]}
                </span>
            </li>)

        return(
            <Auxiliary>
            <h3>Your order: </h3>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total price: {this.props.price}</strong></p>
            <Button type="Danger" clicked={this.props.cancelled}>Cancel</Button>
            <Button type="Success" clicked={this.props.continue}>Continue</Button>
        </Auxiliary>
        );
    }
   
}
export default OrderSummary;

