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
                console.log(res);
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