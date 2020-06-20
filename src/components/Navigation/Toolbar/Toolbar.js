import React from 'react'
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const ToolBar = props => (
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <Logo height="90%" />
        <NavigationItems />
    </header>
);

export default ToolBar;

