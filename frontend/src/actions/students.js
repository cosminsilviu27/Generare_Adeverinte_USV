import Cookies from 'js-cookie';
import axios from 'axios';
import {
    FETCH_STUDENTS_FAILURE,
    FETCH_STUDENTS_REQUEST,
    FETCH_STUDENTS_SUCCESS,
    UPDATE_STUDENTS_SUCCESS,
    UPDATE_STUDENTS_FAILURE,
    UPDATE_STUDENTS_FILE_ERROR,
    UPDATE_STUDENTS_REQUEST,
    CREATE_STUDENT_REQUEST,
    CREATE_STUDENT_FAILURE,
    CREATE_STUDENT_SUCCESS,
    FETCH_STUDENT_SUCCESS,
    FETCH_STUDENT_REQUEST,
    FETCH_STUDENT_FAILURE,
    UPDATE_STUDENT_SUCCESS,
    UPDATE_STUDENT_REQUEST,
    UPDATE_STUDENT_FAILURE,
    DELETE_STUDENT_REQUEST,
    DELETE_STUDENT_FAILURE,
    DELETE_STUDENT_SUCCESS
} from "./types";


export const updateStudentsList = (file, navigate) => async (dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data', 'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        const formData = new FormData();
        formData.append('file', file);

        dispatch({
            type: UPDATE_STUDENTS_REQUEST
        });

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/students/updateStudentsList`, formData, config);

        if (res.data.error) {
            dispatch({
                type: UPDATE_STUDENTS_FAILURE, payload: res.data.error
            });

            console.log('UPDATE STUDENTS LIST FAIL 1: ' + res.data.error);
        } else if (res.data.success) {
            dispatch({
                type: UPDATE_STUDENTS_SUCCESS
            });

            console.log('UPDATE STUDENTS LIST SUCCESS');
            navigate(`/get-students-list`);

        } else if (res.data.fileError) {
            dispatch({
                type: UPDATE_STUDENTS_FILE_ERROR, payload: res.data.fileError
            });

            console.log('UPDATE STUDENTS LIST FILE ERROR: ' + res.data.fileError);
        }
    } catch (error) {
        dispatch({
            type: UPDATE_STUDENTS_FAILURE, payload: error.message
        });
        console.log('UPDATE STUDENTS LIST FAIL 2: ' + error);
    }
};

export const fetchStudentsList = () => async dispatch => {
    const config = {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        dispatch({
            type: FETCH_STUDENTS_REQUEST
        });

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/students/getStudentsList`, config);

        if (res.data.error) {
            console.log('Failed to fetch students list ' + res.data.error);
            dispatch({
                type: FETCH_STUDENTS_FAILURE, error: res.data.error
            });
        } else if (res.data.success) {
            dispatch({
                type: FETCH_STUDENTS_SUCCESS, payload: res.data.data
            });
        }
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: FETCH_STUDENTS_FAILURE, error: error.message
        });
    }
};

export const createStudent = (formData, navigate) => async (dispatch) => {

    const config = {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        dispatch({
            type: CREATE_STUDENT_REQUEST
        });

        const res = await axios.put(`${process.env.REACT_APP_API_URL}/students/createStudent`, formData, config);

        if (res.data.error) {
            dispatch({
                type: CREATE_STUDENT_FAILURE, payload: res.data.error
            });

            console.log('Failed to update student ' + res.data.error);

        } else if (res.data.success) {
            dispatch({
                type: CREATE_STUDENT_SUCCESS
            });

            navigate(`/get-students-list`);
        }
    } catch (error) {
        dispatch({
            type: CREATE_STUDENT_FAILURE, payload: error.message
        });

        console.log(error.message);
    }
};

// Action to fetch a specific student by ID
export const fetchStudent = (studentId) => async (dispatch) => {
    const config = {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        dispatch({
            type: FETCH_STUDENT_REQUEST
        });

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/students/editStudent/${studentId}/`, config);

        if (res.data.error) {
            dispatch({
                type: FETCH_STUDENT_FAILURE, payload: res.data.error
            });

            console.log('Failed to fetch student ' + res.data.error);
        } else if (res.data.success) {
            dispatch({
                type: FETCH_STUDENT_SUCCESS, payload: res.data.data
            });
        }
    } catch (error) {
        dispatch({
            type: FETCH_STUDENT_FAILURE, payload: error.message
        });

        console.log(error.message);
    }
};

// Action to update a specific student's information
export const updateStudent = (studentId, formData, navigate) => async (dispatch) => {

    const config = {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        dispatch({
            type: UPDATE_STUDENT_REQUEST
        });

        const res = await axios.put(`${process.env.REACT_APP_API_URL}/students/editStudent/${studentId}/`, formData, config);

        if (res.data.error) {
            dispatch({
                type: UPDATE_STUDENT_FAILURE, payload: res.data.error
            });

            console.log('Failed to update student ' + res.data.error);
        } else if (res.data.success) {
            dispatch({
                type: UPDATE_STUDENT_SUCCESS
            });

            navigate(`/get-students-list`);
        }
    } catch (error) {
        dispatch({
            type: UPDATE_STUDENT_FAILURE, payload: error.message
        });

        console.log(error.message);
    }
};

export const deleteStudent = (studentId) => async (dispatch) => {

    const config = {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        dispatch({
            type: DELETE_STUDENT_REQUEST
        });
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/students/deleteStudent/${studentId}/`, config);

        if (res.data.error) {
            dispatch({
                type: DELETE_STUDENT_FAILURE, payload: res.data.error
            });
            console.log('Failed to delete student ' + res.data.error);
        } else if (res.data.success) {
            dispatch({
                type: DELETE_STUDENT_SUCCESS
            });
            console.log('Student deleted successfully');
        }
    } catch (error) {
        dispatch({
            type: DELETE_STUDENT_FAILURE, payload: error.message
        });
        console.log(error.message);
    }
}
