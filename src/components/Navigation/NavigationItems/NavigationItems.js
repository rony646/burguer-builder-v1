import React from 'react'

import NavigationItem from './NavigationItem/NavigationItem'
import classes from './NavigationItems.css'

const NavigationItems = props => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active>Burguer Builder</NavigationItem>
        <NavigationItem link="/" >CheckOut</NavigationItem>
    </ul>
);


export default NavigationItems