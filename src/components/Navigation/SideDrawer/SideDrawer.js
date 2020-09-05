import React from 'react'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import classes from './SideDrawer.css'


const SideDrawer = props => {
    let attClasses = [classes.Sidedrawer, classes.Close];
    if(props.open) {
        attClasses[1] = classes.Open;
    }
    return(
        <Auxiliary>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attClasses.join(' ')}>
                <Logo height="11%" margin="32px"/>
                <nav>
                    <NavigationItems isAuth={props.isAuth} />
                </nav>
            </div>
        </Auxiliary>
    );
}

export default SideDrawer;