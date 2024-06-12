import Cookies from 'js-cookie';
import axios from 'axios';
import {
    APPROVE_CERTIFICATE_FAILURE,
    APPROVE_CERTIFICATE_REQUEST,
    APPROVE_CERTIFICATE_SUCCESS,
    EDIT_CERTIFICATE_FAILURE,
    EDIT_CERTIFICATE_REQUEST,
    EDIT_CERTIFICATE_SUCCESS,
    FETCH_APPROVED_CERTIFICATES_FAILURE,
    FETCH_APPROVED_CERTIFICATES_REQUEST,
    FETCH_APPROVED_CERTIFICATES_SUCCESS,
    FETCH_CERTIFICATE_FAILURE,
    FETCH_CERTIFICATE_REQUEST,
    FETCH_CERTIFICATE_SUCCESS,
    FETCH_CERTIFICATES_FAILURE,
    FETCH_CERTIFICATES_PRINT_FAILURE,
    FETCH_CERTIFICATES_PRINT_REQUEST,
    FETCH_CERTIFICATES_PRINT_SUCCESS,
    FETCH_CERTIFICATES_REQUEST,
    FETCH_CERTIFICATES_SUCCESS,
    FETCH_REJECTED_CERTIFICATES_FAILURE,
    FETCH_REJECTED_CERTIFICATES_REQUEST,
    FETCH_REJECTED_CERTIFICATES_SUCCESS,
    REJECT_CERTIFICATE_FAILURE,
    REJECT_CERTIFICATE_REQUEST,
    REJECT_CERTIFICATE_SUCCESS,
    SET_CERTIFICATES_PRINTED_REQUEST,
    SET_CERTIFICATES_PRINTED_FAILURE,
    SET_CERTIFICATES_PRINTED_SUCCESS,
    DOWNLOAD_CERTIFICATES_SUCCESS,
    DOWNLOAD_CERTIFICATES_FAILURE,
    DOWNLOAD_CERTIFICATES_REQUEST
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

export const setCertificatesAsPrinted = (certificates_ids, navigate) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data', 'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        const formData = new FormData();
        formData.append('certificates_ids', JSON.stringify(certificates_ids));

        dispatch({
            type: SET_CERTIFICATES_PRINTED_REQUEST
        });

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/certificates/setCertificatesPrinted`, formData, config);

        if (res.data.error) {
            console.log('Failed to set certificates printed ' + res.data.error);

            dispatch({
                type: SET_CERTIFICATES_PRINTED_FAILURE, error: res.data.error
            });
        } else if (res.data.success) {
            dispatch({
                type: SET_CERTIFICATES_PRINTED_SUCCESS
            });
            navigate(`/get-certificates-list`);
        }
    } catch (error) {
        console.log(error.message);

        dispatch({
            type: SET_CERTIFICATES_PRINTED_FAILURE, error: error.message
        });
    }
};

export const downloadCertificates = () => async dispatch => {
    const config = {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken'),
        },
        responseType: 'blob' // Ensure we handle binary data
    };

    try {
        dispatch({
            type: DOWNLOAD_CERTIFICATES_REQUEST
        });

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/certificates/downloadCertificates`, config);

        if (response.data.error) {
            console.log('Failed to download certificates: ' + response.data.error);

            dispatch({
                type: DOWNLOAD_CERTIFICATES_FAILURE,
                error: response.data.error
            });
        } else {
            dispatch({
                type: DOWNLOAD_CERTIFICATES_SUCCESS
            });

            const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'certificates.xlsx');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // Clean up after download
        }
    } catch (error) {
        console.error("Error downloading the certificates: ", error);
        dispatch({
            type: DOWNLOAD_CERTIFICATES_FAILURE,
            error: error.message
        });
    }
};

export const fetchCertificatesForPrint = () => async dispatch => {
    const config = {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        dispatch({
            type: FETCH_CERTIFICATES_PRINT_REQUEST
        });

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/certificates/getCertificatesForPrint`, config);

        if (res.data.error) {
            console.log('Failed to fetch certificates list ' + res.data.error);

            dispatch({
                type: FETCH_CERTIFICATES_PRINT_FAILURE, error: res.data.error
            });
        } else if (res.data.success) {
            dispatch({
                type: FETCH_CERTIFICATES_PRINT_SUCCESS, payload: res.data.data
            });
        }
    } catch (error) {
        console.log(error.message);

        dispatch({
            type: FETCH_CERTIFICATES_PRINT_FAILURE, error: error.message
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


export const fetchCertificate1 = (certificate_id) => async (dispatch) => {
    const config = {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        dispatch({
            type: FETCH_CERTIFICATE_REQUEST
        });

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/certificates/editCertificate/${certificate_id}/`, config);

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
            navigate(`/get-approved-certificates-list`);
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

export const editCertificate = (certificate_id, formData, navigate) => async (dispatch) => {

    const config = {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    try {
        dispatch({
            type: EDIT_CERTIFICATE_REQUEST
        });

        const res = await axios.put(`${process.env.REACT_APP_API_URL}/certificates/editCertificate/${certificate_id}/`, formData, config);

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