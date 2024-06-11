import {
    FETCH_CERTIFICATES_REQUEST,
    FETCH_CERTIFICATES_SUCCESS,
    FETCH_CERTIFICATES_FAILURE,
} from '../actions/types';

const initialState = {
    certificates: [], // Make sure this is properly initialized
    loading: false,
    error: null
};

const certificate = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case FETCH_CERTIFICATES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_CERTIFICATES_SUCCESS:
            return {
                ...state,
                certificates: payload, // Update certificates with payload
                loading: false,
                error: null
            };
        case FETCH_CERTIFICATES_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            };
        default:
            return state;
    }
};

export default certificate;
