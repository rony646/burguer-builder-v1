import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'

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

    componentDidMount() {
        if(!this.props.buildingBurguer && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath()
        };
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

        let form = formElements.map(formElement => (

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

        if(this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null

        if(this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>
        }

        let authRedirect = null

        if(this.props.isAuth) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
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

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        buildingBurguer: state.burguerBuilder.building,
        authRedirectPath: state.auth.authRedirectionPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')) 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);