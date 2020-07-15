import React from 'react'

import Burguer from '../../Burguer/Burguer'
import Button from '../../UI/Button/Button'

import classes from './CheckoutSummary.css'

const checkoutSummary = props  => {
    return(
        <div style={{textAlign: "center"}}>
            <h1>We hope it tastes well!</h1>
            <div className={classes.Container}>
                <Burguer ingredients={props.ingredients} />
                <Button  clicked={props.checkoutCancelled} type="Danger">CANCEL</Button>
                <Button   clicked={props.checkoutContinued} type="Success">CONTINUE</Button>
            </div>
        </div>
    )
};

export default checkoutSummary;