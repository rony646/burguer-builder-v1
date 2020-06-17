import React from 'react'

import classes from './BuildControl.css'

const BuildControl = props => {
    return(
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button 
            className={classes.Less} 
            onClick={props.remove}
            disabled={props.disabled}> {/* Disabled if there's no ingredient */}
                Less
            </button>
            <button className={classes.More} onClick={props.added}>More</button>
        </div>
    )
}

export default BuildControl