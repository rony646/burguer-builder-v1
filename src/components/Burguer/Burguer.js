import React from 'react'

import classes from  './Burguer.css'
import BurguerIngredient from './BurguerIngredient/BurguerIngredient'

const Burguer = props => {

    const transformedIngredients = Object.keys(props.ingredients).map(
        igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
               return <BurguerIngredient key={igKey  + i} type={igKey} />
            })
        }
    )

    return(
        <div className={classes.Burguer}>
            <BurguerIngredient  type="bread-top"/>
            {transformedIngredients}
            <BurguerIngredient  type="bread-bottom"/>
        </div>
    )
};


export default Burguer;