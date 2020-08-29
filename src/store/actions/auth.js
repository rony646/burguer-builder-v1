import * as actionTypes from '../actions/actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToke: true
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBXa_ro17yYFvEys7OALZF4kWyMd7nTTDo'
        if(!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBXa_ro17yYFvEys7OALZF4kWyMd7nTTDo'
        }

        axios.post(url, authData)
        .then(
            res => {
                console.log(res);
                dispatch(authSuccess(res.data))
            }
        )
        .catch(err => {
            console.log(err);
            dispatch(authFail(err))
        })
    };
};