import React from 'react'

import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'

const NavigationItems = props => (
    <ul className={classes.NavigationItems}>
        { props.isAuth ? 
            <NavigationItem link="/orders" >Orders</NavigationItem> : 
            null
        }
        <NavigationItem link="/">Burguer Builder</NavigationItem>
        {   props.isAuth ? 
            <NavigationItem link="/Logout" >Logout</NavigationItem> : 
            <NavigationItem link="/Auth" >Authenticate</NavigationItem>
        }
    </ul>
);


export default NavigationItems