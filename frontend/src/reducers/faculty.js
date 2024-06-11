import {
    FETCH_FACULTIES_REQUEST,
    FETCH_FACULTIES_SUCCESS,
    FETCH_FACULTIES_FAILURE,
    UPDATE_FACULTIES_SUCCESS,
    UPDATE_FACULTIES_FAILURE,
    UPDATE_FACULTIES_REQUEST,
    UPDATE_FACULTIES_FILE_ERROR
} from '../actions/types';

const initialState = {
    faculties: [], // Make sure this is properly initialized
    loading: false,
    error: null
};

const faculty = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case UPDATE_FACULTIES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case UPDATE_FACULTIES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case UPDATE_FACULTIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            };
        case UPDATE_FACULTIES_FILE_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case FETCH_FACULTIES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_FACULTIES_SUCCESS:
            return {
                ...state,
                faculties: payload, // Update faculties with payload
                loading: false,
                error: null
            };
        case FETCH_FACULTIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            };
        default:
            return state;
    }
};

export default faculty;
