import Cookies from 'js-cookie';
import axios from 'axios';
import {
    FETCH_FACULTIES_FAILURE,
    FETCH_FACULTIES_REQUEST,
    FETCH_FACULTIES_SUCCESS,
    UPDATE_FACULTIES_SUCCESS,
    UPDATE_FACULTIES_FAILURE,
    UPDATE_FACULTIES_FILE_ERROR,
    UPDATE_FACULTIES_REQUEST,
    FETCH_FACULTY_REQUEST,
    FETCH_FACULTY_FAILURE,
    FETCH_FACULTY_SUCCESS,
    UPDATE_FACULTY_REQUEST, UPDATE_FACULTY_FAILURE, UPDATE_FACULTY_SUCCESS,
} from "./types";

export const updateFacultiesList = (file, navigate) => async (dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data', 'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        const formData = new FormData();
        formData.append('file', file);

        dispatch({
            type: UPDATE_FACULTIES_REQUEST
        });

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/faculties/updateFacultiesList`, formData, config);

        if (res.data.error) {
            dispatch({
                type: UPDATE_FACULTIES_FAILURE, payload: res.data.error
            });

            console.log('UPDATE FACULTIES LIST FAIL 1: ' + res.data.error);
        } else if (res.data.success) {
            dispatch({
                type: UPDATE_FACULTIES_SUCCESS
            });

            console.log('UPDATE FACULTIES LIST SUCCESS');

            navigate(`/get-faculties-list`);
        } else if (res.data.fileError) {
            dispatch({
                type: UPDATE_FACULTIES_FILE_ERROR, payload: res.data.fileError
            });

            console.log('UPDATE FACULTIES LIST FILE ERROR: ' + res.data.fileError);
        }
    } catch (error) {
        dispatch({
            type: UPDATE_FACULTIES_FAILURE, payload: error.message
        });
        console.log('UPDATE FACULTIES LIST FAIL 2: ' + error);
    }
};

export const fetchFacultiesList = () => async dispatch => {
    const config = {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        dispatch({
            type: FETCH_FACULTIES_REQUEST
        });

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/faculties/getFacultiesList`, config);

        if (res.data.error) {
            console.log('Failed to fetch faculties list ' + res.data.error);
            dispatch({
                type: FETCH_FACULTIES_FAILURE, error: res.data.error
            });
        } else if (res.data.success) {
            dispatch({
                type: FETCH_FACULTIES_SUCCESS, payload: res.data.data
            });
        }
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: FETCH_FACULTIES_FAILURE, error: error.message
        });
    }
};

export const fetchFaculty = (faculty_id) => async dispatch => {
    const config = {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        dispatch({
            type: FETCH_FACULTY_REQUEST
        });

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/faculties/editFaculty/${faculty_id}/`, config);

        if (res.data.error) {
            console.log('Failed to fetch faculty ' + res.data.error);

            dispatch({
                type: FETCH_FACULTY_FAILURE, payload: res.data.error
            });
        } else if (res.data.success) {
            dispatch({
                type: FETCH_FACULTY_SUCCESS, payload: res.data.data
            });
        }
    } catch (error) {
        console.log(error.message);

        dispatch({
            type: FETCH_FACULTY_FAILURE, payload: error.message
        });
    }
};

export const updateFaculty = (faculty_id, formData, navigate) => async dispatch => {
    const config = {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        dispatch({
            type: UPDATE_FACULTY_REQUEST
        });

        const res = await axios.put(`${process.env.REACT_APP_API_URL}/faculties/editFaculty/${faculty_id}/`, formData, config);

        if (res.data.error) {
            console.log('Failed to update faculty ' + res.data.error);

            dispatch({
                type: UPDATE_FACULTY_FAILURE, payload: res.data.error
            });
        } else if (res.data.success) {
            dispatch({
                type: UPDATE_FACULTY_SUCCESS
            });

            navigate(`/get-faculties-list`);
        }
    } catch (error) {
        console.log(error.message);

        dispatch({
            type: UPDATE_FACULTY_FAILURE, payload: error.message
        });
    }
};