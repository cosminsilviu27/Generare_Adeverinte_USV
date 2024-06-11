import Cookies from 'js-cookie';
import axios from 'axios';
import {
    FETCH_CERTIFICATES_FAILURE,
    FETCH_CERTIFICATES_REQUEST,
    FETCH_CERTIFICATES_SUCCESS,
} from "./types";

export const fetchCertificatesList = () => async dispatch => {
    const config = {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        dispatch({
            type: FETCH_CERTIFICATES_REQUEST
        });

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/certificates/getCertificatesList`, config);

        if (res.data.error) {
            console.log('Failed to fetch certificates list ' + res.data.error);
            dispatch({
                type: FETCH_CERTIFICATES_FAILURE, error: res.data.error
            });
        } else if (res.data.success) {
            dispatch({
                type: FETCH_CERTIFICATES_SUCCESS, payload: res.data.data
            });
        }
    } catch (error) {
        console.log(error.message);
        dispatch({
            type: FETCH_CERTIFICATES_FAILURE, error: error.message
        });
    }
};