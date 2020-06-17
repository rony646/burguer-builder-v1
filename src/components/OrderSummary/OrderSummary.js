import React from 'react'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

// const OrderSummary = props => {
//     const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
//         return <li>
//             <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
//         </li>

//     });
// }

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
            {console.log(ingredientSummary)}
            <h3>Your order: </h3>
            <ul>
                {ingredientSummary}
            </ul>
        </Auxiliary>
    )
}
export default OrderSummary;

