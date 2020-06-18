import React from 'react'

import burguerlogo from '../../../src/assets/images/logo.png'
import classes from './Logo.css'

const Logo = props => (
    <div className={classes.Logo}>
        <img src={burguerlogo} alt="logo"/>
    </div>
);

export default Logo
