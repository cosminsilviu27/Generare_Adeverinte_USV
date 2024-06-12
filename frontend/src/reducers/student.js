import {
    FETCH_STUDENTS_REQUEST,
    FETCH_STUDENTS_SUCCESS,
    FETCH_STUDENTS_FAILURE,
    UPDATE_STUDENTS_SUCCESS,
    UPDATE_STUDENTS_FAILURE,
    UPDATE_STUDENTS_REQUEST,
    UPDATE_STUDENTS_FILE_ERROR,
    CREATE_STUDENT_SUCCESS,
    CREATE_STUDENT_FAILURE,
    CREATE_STUDENT_REQUEST,
    UPDATE_STUDENT_REQUEST,
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_FAILURE,
    FETCH_STUDENT_REQUEST,
    FETCH_STUDENT_SUCCESS,
    FETCH_STUDENT_FAILURE,
    DELETE_STUDENT_REQUEST,
    DELETE_STUDENT_SUCCESS,
    DELETE_STUDENT_FAILURE
} from '../actions/types';

const initialState = {
    students: [], // Make sure this is properly initialized
    loading: false,
    error: null
};

const student = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case UPDATE_STUDENTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case UPDATE_STUDENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case UPDATE_STUDENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            };
        case UPDATE_STUDENTS_FILE_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        case CREATE_STUDENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case CREATE_STUDENT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };

        case CREATE_STUDENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            };
        case UPDATE_STUDENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case UPDATE_STUDENT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case UPDATE_STUDENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            };
        case FETCH_STUDENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_STUDENT_SUCCESS:
            return {
                ...state,
                student: payload, // Update students with payload
                loading: false,
                error: null
            };
        case FETCH_STUDENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            };
        case FETCH_STUDENTS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case FETCH_STUDENTS_SUCCESS:
            return {
                ...state,
                students: payload, // Update students with payload
                loading: false,
                error: null
            };
        case FETCH_STUDENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            };
        case DELETE_STUDENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case DELETE_STUDENT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case DELETE_STUDENT_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload
            };

        default:
            return state;
    }
};

export default student;
