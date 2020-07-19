import React from 'react'

import classes from './Order.css'

const Order = props => {
    let ingredients = Object.keys(props.ig)
    ingredients = ingredients.map(e => {
       return <li key={Math.random(10)}>{e} : {props.ig[e]}</li>
    })
    return(
        <div className={classes.Order}>
        <strong>Ingredients: </strong> 
        <ul>{ingredients}</ul>
        <p>Price: <strong>USD {Number(props.price).toFixed(2)}</strong></p>
        </div>
    )
}

export default Order