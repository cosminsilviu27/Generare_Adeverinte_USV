import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
} from '../actions/types';

const initialState = {
    isAuthenticated: null,
    loginMethod: null // Added to track the method of login
};

const auth = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case AUTHENTICATED_SUCCESS:
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: payload
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                loginMethod: 'username',
                user: payload.user // Assuming payload carries user data
            };
        case GOOGLE_AUTH_SUCCESS:
            return {
                // ...state,
                // isAuthenticated: true,
                loginMethod: 'google'
            };
        case LOGOUT_SUCCESS:
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                loginMethod: null
            };
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            return {
                ...state,
                isAuthenticated: false,
                loginError: payload.error || 'Login failed due to server error'
            };
        case GOOGLE_AUTH_FAIL:
        case LOGOUT_FAIL:
        case DELETE_USER_FAIL:
            return state;
        default:
            return state;
    };
};

export default auth;
