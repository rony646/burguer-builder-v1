import React, { Component } from 'react'
import { connect } from 'react-redux'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

import * as actions from '../../store/actions/index'
import classes from './Auth.css'

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false
            },  
            
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false
            },  
        },
        isSignUp: true
    }

    checkValidity(value, rules) {
        let isValid = true;
        const mailRegex = new RegExp(/^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/, "g")

        if(rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength
        }

        if(rules.isEmail) {
            isValid = mailRegex.test(value)
        }

        return isValid
    }

    inputChangedHandler = (event, controlName) => {
        const updateControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation)
            }
        }

        this.setState({controls: updateControls})
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
        
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignUp: !prevState.isSignUp
            };
        });
    };

    render() {

        const formElements = [];

        for(let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        const form = formElements.map(formElement => (

            <Input
                key={formElement.id}
                shouldValidate={formElement.config.validation}
                invalid={!formElement.config.valid}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
             />
        ))

        return(
            <div className={classes.Auth}>
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button type="Success">SUBMIT</Button>
                </form>
                <Button 
                    type="Danger" 
                    clicked={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}
                </Button>
            </div>
        )
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    };
};

export default connect(null, mapDispatchToProps)(Auth);