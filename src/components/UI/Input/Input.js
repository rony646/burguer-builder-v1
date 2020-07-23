import React from 'react';

import classes from './Inupt.css'

const input = props => {

    let inputElement = null

    const InputClasses = [classes.InputElement]

    if(props.invalid && props.shouldValidate) {
        InputClasses.push(classes.Invalid)
    }

    switch (props.elementType) {
        case('input'):
            inputElement = <input 
                            onChange={props.changed}
                            className={InputClasses.join(' ')}                  
                            {...props.elementConfig} 
                            value={props.value} />;
            break;
        case('textarea'):
            inputElement = <textarea
                            className={InputClasses.join(' ')} 
                            onChange={props.changed}
                            {...props.elementConfig} 
                            value={props.value} />;
            break;

        case('select'):
            inputElement = (
                <select 
                    onChange={props.changed}
                    className={InputClasses.join(' ')}
                    value={props.value}>
                    {props.elementConfig.options.map(option => {
                        return <option key={option.value} value={option.value}>
                                    {option.displayValue}
                                </option>
                    })}
                </select>
            );
            break;
        default:
            inputElement = <input 
                            onChange={props.changed}
                            className={InputClasses.join(' ')}
                            {...props.elementConfig} 
                            value={props.value} />
    }

    return (
        <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
    
};

export default input