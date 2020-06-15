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
           {controls.map(item => {
               return <BuildControl label={item.label} type={item.type} />
           })}
        </div>
    )
}

export default BuildControls