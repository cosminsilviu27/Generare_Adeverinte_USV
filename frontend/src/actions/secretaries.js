// Import necessary modules
import Cookies from 'js-cookie';
import axios from 'axios';
import {
    FETCH_SECRETARIES_FAILURE,
    FETCH_SECRETARIES_REQUEST,
    FETCH_SECRETARIES_SUCCESS,
    UPDATE_SECRETARIES_FAILURE,
    UPDATE_SECRETARIES_REQUEST,
    UPDATE_SECRETARIES_SUCCESS,
    UPDATE_SECRETARIES_FILE_ERROR,
    FETCH_SECRETARY_FAILURE,
    FETCH_SECRETARY_REQUEST,
    FETCH_SECRETARY_SUCCESS,
    UPDATE_SECRETARY_SUCCESS,
    UPDATE_SECRETARY_REQUEST,
    UPDATE_SECRETARY_FAILURE
} from "./types";


// Action to update the list of secretaries
export const updateSecretariesList = (file, navigate) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data', 'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        const formData = new FormData();
        formData.append('file', file);

        dispatch({
            type: UPDATE_SECRETARIES_REQUEST
        });

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/secretaries/updateSecretariesList`, formData, config);

        if (res.data.error) {
            dispatch({
                type: UPDATE_SECRETARIES_FAILURE, payload: res.data.error
            });

            console.log('UPDATE SECRETARIES LIST FAIL 1: ' + res.data.error);
        } else if (res.data.success) {
            dispatch({
                type: UPDATE_SECRETARIES_SUCCESS
            });

            console.log('UPDATE SECRETARIES LIST SUCCESS');

            navigate(`/get-secretaries-list`);
        } else if (res.data.fileError) {
            dispatch({
                type: UPDATE_SECRETARIES_FILE_ERROR, payload: res.data.fileError
            });

            console.log('UPDATE SECRETARIES LIST FILE ERROR: ' + res.data.fileError);
        }
    } catch (error) {
        dispatch({
            type: UPDATE_SECRETARIES_FAILURE, payload: error.message
        });
        console.log('UPDATE SECRETARIES LIST FAIL 2: ' + error);
    }
};


// Action to fetch the list of secretaries
export const fetchSecretariesList = () => async (dispatch) => {
    const config = {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        dispatch({
            type: FETCH_SECRETARIES_REQUEST
        });

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/secretaries/getSecretariesList`, config);

        if (res.data.error) {
            dispatch({
                type: FETCH_SECRETARIES_FAILURE, payload: res.data.error
            });

            console.log('Failed to fetch secretaries list ' + res.data.error);
        } else if (res.data.success) {
            dispatch({
                type: FETCH_SECRETARIES_SUCCESS, payload: res.data.data
            });
        }
    } catch (error) {
        dispatch({
            type: FETCH_SECRETARIES_FAILURE, payload: error.message
        });

        console.log(error.message);
    }
};


// Action to fetch a specific secretary by ID
export const fetchSecretary = (secretaryId) => async (dispatch) => {
    const config = {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        dispatch({
            type: FETCH_SECRETARY_REQUEST
        });

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/secretaries/editSecretary/${secretaryId}/`, config);

        if (res.data.error) {
            dispatch({
                type: FETCH_SECRETARY_FAILURE, payload: res.data.error
            });

            console.log('Failed to fetch secretary ' + res.data.error);
        } else if (res.data.success) {
            dispatch({
                type: FETCH_SECRETARY_SUCCESS, payload: res.data.data
            });
        }
    } catch (error) {
        dispatch({
            type: FETCH_SECRETARY_FAILURE, payload: error.message
        });

        console.log(error.message);
    }
};

// Action to update a specific secretary's information
export const updateSecretary = (secretaryId, formData, navigate) => async (dispatch) => {
    const config = {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        dispatch({
            type: UPDATE_SECRETARY_REQUEST
        });

        const res = await axios.put(`${process.env.REACT_APP_API_URL}/secretaries/editSecretary/${secretaryId}/`, formData, config);

        if (res.data.error) {
            dispatch({
                type: UPDATE_SECRETARY_FAILURE, payload: res.data.error
            });

            console.log('Failed to update secretary ' + res.data.error);
        } else if (res.data.success) {
            dispatch({
                type: UPDATE_SECRETARY_SUCCESS
            });

            navigate(`/get-secretaries-list`);
        }
    } catch (error) {
        dispatch({
            type: UPDATE_SECRETARY_FAILURE, payload: error.message
        });

        console.log(error.message);
    }
};
