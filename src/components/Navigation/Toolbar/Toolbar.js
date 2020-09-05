import React from 'react'
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'
import NavigationItems from '../NavigationItems/NavigationItems'

const ToolBar = props => (
    <header className={classes.Toolbar}>
        <DrawerToggle handleSideDrawer={props.close}/>
        <Logo height="90%" />
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth} />
        </nav>
    </header>
);

export default ToolBar;

