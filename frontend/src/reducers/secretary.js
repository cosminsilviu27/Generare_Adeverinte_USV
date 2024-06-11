import {
    UPDATE_SECRETARIES_REQUEST,
    UPDATE_SECRETARIES_SUCCESS,
    UPDATE_SECRETARIES_FAILURE,
    FETCH_SECRETARIES_REQUEST,
    FETCH_SECRETARIES_SUCCESS,
    FETCH_SECRETARIES_FAILURE,
    FETCH_SECRETARY_REQUEST,
    FETCH_SECRETARY_SUCCESS,
    FETCH_SECRETARY_FAILURE,
    UPDATE_SECRETARY_REQUEST,
    UPDATE_SECRETARY_SUCCESS,
    UPDATE_SECRETARY_FAILURE
} from '../actions/types';

const initialState = {
    secretaries: [], // Make sure this is properly initialized
    loading: false,
    error: null,
    secretary: null
};

const secretary = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case UPDATE_SECRETARIES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case UPDATE_SECRETARIES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case UPDATE_SECRETARIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            };
        case FETCH_SECRETARIES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_SECRETARIES_SUCCESS:
            return {
                ...state,
                secretaries: payload, // Update secretaries with payload
                loading: false,
                error: null
            };
        case FETCH_SECRETARIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            };
        case UPDATE_SECRETARY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case UPDATE_SECRETARY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case UPDATE_SECRETARY_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            };
        case FETCH_SECRETARY_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_SECRETARY_SUCCESS:
            return {
                ...state,
                secretary: payload, // Update secretaries with payload
                loading: false,
                error: null
            };
        case FETCH_SECRETARY_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            };
        default:
            return state;
    }
};

export default secretary;
