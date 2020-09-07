import * as actionTypes from '../actions/actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('expirationTime')
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = () => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, 3600 * 1000) //  Logging user out after 1 hour
    }
}

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
                const expirationDate = new Date(new Date().getTime()) + 3600 * 1000
                localStorage.setItem('token', res.data.idToken)
                localStorage.setItem('expirationDate', expirationDate)
                localStorage.setItem('userId', res.data.localId)
                dispatch(authSuccess(res.data.idToken, res.data.localId))
                dispatch(checkAuthTimeout())
            }
        )
        .catch(err => {
            console.log(err);
            dispatch(authFail(err.response.data.error))
        })
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token) {
           dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate  > new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token, userId))
                dispatch(checkAuthTimeout())
            }
            
        }
    };
};