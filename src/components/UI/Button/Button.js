import React from 'react'

import classes from './Button.css'

const Button = props => (
    <button 
        onClick={props.clicked}
        className={[classes.Button, classes[props.type]].join(' ')}
    >
        {props.children}
    </button>
);
