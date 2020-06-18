import React from 'react'
import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'

const ToolBar = props => (
    <header className={classes.Toolbar}>
        <div>MENU</div>
        <Logo />
        <nav>
            NAV
        </nav>
    </header>
);

export default ToolBar;

