import React from 'react'

import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.css'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];



const BuildControls = props => {
    return(
        <div className={classes.BuildControls}>
        
            <p><strong>Current price: ${props.price.toFixed(2)}</strong></p>

           {controls.map(item => {
               return <BuildControl label={item.label} 
               added={() => props.ingredientAdded(item.type)}
               key={item.type}
               remove = {() => props.ingredientRemoved(item.type)}
               disabled = {props.disabled[item.type]} />
           })}

        </div>
    )
}

export default BuildControls