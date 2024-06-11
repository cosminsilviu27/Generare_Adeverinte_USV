import Cookies from 'js-cookie';
import axios from 'axios';
import {
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOGOUT_SUCCESS, 
    LOGOUT_FAIL, 
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    // GOOGLE_AUTH_SUCCESS,
    // GOOGLE_AUTH_FAIL,
} from './types';

export const googleAuth = () => {
    // const loginUrl = `${process.env.REACT_APP_API_URL}/accounts/google/login/`;
    const loginUrl = `${process.env.REACT_APP_API_URL}/social/login`;

    window.location.href = loginUrl;

};

export const loginAdmin = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', 'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({username, password});

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/login`, body, config);

        if (res.data.success) {
            Cookies.set('authToken', res.data.token);

            dispatch({
                type: LOGIN_SUCCESS, payload: {
                    isAuthenticated: true, loginMethod: 'username', user: res.data.data
                }
            });

            console.log("Login ok");
        } else {
            dispatch({
                type: LOGIN_FAIL, error: res.data.error
            });

            console.log("Login not ok");
        }
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL, error: err
        });

        console.log("Error during loginAdmin", err);
    }
};


export const logoutAdmin = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', 'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({
        'withCredentials': true
    });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/logout`, body, config);
        if (res.data.success) {
            dispatch({
                type: LOGOUT_SUCCESS
            });
            window.location.href = '/'
        } else {
            dispatch({
                type: LOGOUT_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: LOGOUT_FAIL
        });
    }
};

export const logoutSecretary = () => {
    const logoutUrl = `${process.env.REACT_APP_API_URL}/accounts/logout/`;
    console.log('Redirecting to:', logoutUrl);  // Check the output in the browser console
    window.location.href = logoutUrl;
};

export const delete_account = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json', 'Content-Type': 'application/json', 'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const body = JSON.stringify({
        'withCredentials': true
    });

    try {
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/accounts/delete`, config, body);

        if (res.data.success) {
            dispatch({
                type: DELETE_USER_SUCCESS
            });
        } else {
            dispatch({
                type: DELETE_USER_FAIL
            });
        }
    } catch (err) {
        dispatch({
            type: DELETE_USER_FAIL
        });
    }
};
