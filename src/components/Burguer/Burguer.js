import React from 'react'

import classes from  './Burguer.css'
import BurguerIngredient from './BurguerIngredient/BurguerIngredient'

const Burguer = props => {
    return(
        <div className={classes.Burguer}>
            <BurguerIngredient  type="bread-top"/>
            <BurguerIngredient  type="salad"/>
            <BurguerIngredient  type="cheese"/>
            <BurguerIngredient  type="cheese"/>
            <BurguerIngredient  type="meat"/>
            <BurguerIngredient  type="meat"/>
            <BurguerIngredient  type="bacon" />
            <BurguerIngredient  type="bread-bottom"/>
        </div>
    )
};


export default Burguer;