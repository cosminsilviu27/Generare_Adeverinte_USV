import Cookies from 'js-cookie';
import axios from 'axios';
import {
    APPROVE_CERTIFICATE_FAILURE,
    APPROVE_CERTIFICATE_REQUEST,
    APPROVE_CERTIFICATE_SUCCESS, EDIT_CERTIFICATE_FAILURE, EDIT_CERTIFICATE_REQUEST, EDIT_CERTIFICATE_SUCCESS,
    FETCH_APPROVED_CERTIFICATES_FAILURE,
    FETCH_APPROVED_CERTIFICATES_REQUEST,
    FETCH_APPROVED_CERTIFICATES_SUCCESS,
    FETCH_CERTIFICATE_FAILURE,
    FETCH_CERTIFICATE_REQUEST,
    FETCH_CERTIFICATE_SUCCESS,
    FETCH_CERTIFICATES_FAILURE,
    FETCH_CERTIFICATES_REQUEST,
    FETCH_CERTIFICATES_SUCCESS,
    FETCH_REJECTED_CERTIFICATES_FAILURE,
    FETCH_REJECTED_CERTIFICATES_REQUEST,
    FETCH_REJECTED_CERTIFICATES_SUCCESS,
    REJECT_CERTIFICATE_FAILURE,
    REJECT_CERTIFICATE_REQUEST,
    REJECT_CERTIFICATE_SUCCESS,
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

export const fetchApprovedCertificatesList = () => async dispatch => {
    const config = {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        dispatch({
            type: FETCH_APPROVED_CERTIFICATES_REQUEST
        });

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/certificates/getApprovedCertificatesList`, config);

        if (res.data.error) {
            console.log('Failed to fetch certificates list ' + res.data.error);

            dispatch({
                type: FETCH_APPROVED_CERTIFICATES_FAILURE, error: res.data.error
            });
        } else if (res.data.success) {
            dispatch({
                type: FETCH_APPROVED_CERTIFICATES_SUCCESS, payload: res.data.data
            });
        }
    } catch (error) {
        console.log(error.message);

        dispatch({
            type: FETCH_APPROVED_CERTIFICATES_FAILURE, error: error.message
        });
    }
};

export const fetchRejectedCertificatesList = () => async dispatch => {
    const config = {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        dispatch({
            type: FETCH_REJECTED_CERTIFICATES_REQUEST
        });

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/certificates/getRejectedCertificatesList`, config);

        if (res.data.error) {
            console.log('Failed to fetch certificates list ' + res.data.error);

            dispatch({
                type: FETCH_REJECTED_CERTIFICATES_FAILURE, error: res.data.error
            });
        } else if (res.data.success) {
            dispatch({
                type: FETCH_REJECTED_CERTIFICATES_SUCCESS, payload: res.data.data
            });
        }
    } catch (error) {
        console.log(error.message);

        dispatch({
            type: FETCH_REJECTED_CERTIFICATES_FAILURE, error: error.message
        });
    }
};

export const fetchCertificate = (processing_position) => async (dispatch) => {
    const config = {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        dispatch({
            type: FETCH_CERTIFICATE_REQUEST
        });

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/certificates/approveCertificate/${processing_position}/`, config);

        if (res.data.error) {
            console.log('Failed to fetch certificate ' + res.data.error);

            dispatch({
                type: FETCH_CERTIFICATE_FAILURE, payload: res.data.error
            });
        } else if (res.data.success) {
            dispatch({
                type: FETCH_CERTIFICATE_SUCCESS, payload: res.data.data
            });
        }
    } catch (error) {
        console.log(error.message);

        dispatch({
            type: FETCH_CERTIFICATE_FAILURE, payload: error.message
        });
    }
};


export const approveCertificate = (processing_position, formData, navigate) => async (dispatch) => {

    const config = {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        dispatch({
            type: APPROVE_CERTIFICATE_REQUEST
        });

        const res = await axios.put(`${process.env.REACT_APP_API_URL}/certificates/approveCertificate/${processing_position}/`, formData, config);

        if (res.data.error) {
            console.log('Failed to approve certificate ' + res.data.error);

            dispatch({
                type: APPROVE_CERTIFICATE_FAILURE, payload: res.data.error
            });
        } else if (res.data.success) {
            dispatch({
                type: APPROVE_CERTIFICATE_SUCCESS
            });
            navigate(`/generate-certificate/${processing_position}/`);
        }
    } catch (error) {
        console.log(error.message);

        dispatch({
            type: APPROVE_CERTIFICATE_FAILURE, payload: error.message
        });
    }
};


export const rejectCertificate = (processing_position, formData, navigate) => async (dispatch) => {

    const config = {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        dispatch({
            type: REJECT_CERTIFICATE_REQUEST
        });

        const res = await axios.put(`${process.env.REACT_APP_API_URL}/certificates/rejectCertificate/${processing_position}/`, formData, config);

        if (res.data.error) {
            console.log('Failed to reject certificate ' + res.data.error);

            dispatch({
                type: REJECT_CERTIFICATE_FAILURE, payload: res.data.error
            });
        } else if (res.data.success) {
            dispatch({
                type: REJECT_CERTIFICATE_SUCCESS
            });

            navigate(`/get-certificates-list`);
        }
    } catch (error) {
        console.log(error.message);

        dispatch({
            type: REJECT_CERTIFICATE_FAILURE, payload: error.message
        });
    }
};

export const editCertificate = (processing_position, formData, navigate) => async (dispatch) => {

    const config = {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        dispatch({
            type: EDIT_CERTIFICATE_REQUEST
        });

        const res = await axios.put(`${process.env.REACT_APP_API_URL}/certificates/editCertificate/${processing_position}/`, formData, config);

        if (res.data.error) {
            console.log('Failed to edit certificate ' + res.data.error);

            dispatch({
                type: EDIT_CERTIFICATE_FAILURE, payload: res.data.error
            });
        } else if (res.data.success) {
            dispatch({
                type: EDIT_CERTIFICATE_SUCCESS
            });

            navigate(`/get-certificates-list`);
        }
    } catch (error) {
        console.log(error.message);

        dispatch({
            type: EDIT_CERTIFICATE_FAILURE, payload: error.message
        });
    }
};