import Cookies from "js-cookie";
import axios from "axios";
import {
    DOWNLOAD_ALL_CERTIFICATES_FAILURE,
    DOWNLOAD_ALL_CERTIFICATES_REQUEST,
    DOWNLOAD_ALL_CERTIFICATES_SUCCESS,
    RESET_APPLICATION_FAILURE,
    RESET_APPLICATION_REQUEST,
    RESET_APPLICATION_SUCCESS
} from "./types";

export const resetApplication = (navigate) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data', 'X-CSRFToken': Cookies.get('csrftoken')
        }
    };
    try {
        dispatch({
            type: RESET_APPLICATION_REQUEST
        });

        const res = await axios.put(`${process.env.REACT_APP_API_URL}/admin/resetApplication/`, config);
        if (res.data.success) {
            dispatch({
                type: RESET_APPLICATION_SUCCESS
            });

            navigate('/dashboard');
        } else {
            dispatch({
                type: RESET_APPLICATION_FAILURE, payload: res.data.error
            });
        }
    } catch (err) {
        dispatch(
            {
                type: RESET_APPLICATION_FAILURE, payload: err.message
            });

        console.error('Error resetting application:', err);
    }
}

export const downloadAllCertificates = () => async dispatch => {
    const config = {
        headers: {
            'X-CSRFToken': Cookies.get('csrftoken'),
        },
        responseType: 'blob' // Ensure we handle binary data
    };

    try {
        dispatch({
            type: DOWNLOAD_ALL_CERTIFICATES_REQUEST
        });

        const response = await axios.get(`${process.env.REACT_APP_API_URL}/certificates/downloadAllCertificates`, config);

        if (response.data.error) {
            console.log('Failed to download certificates: ' + response.data.error);

            dispatch({
                type: DOWNLOAD_ALL_CERTIFICATES_FAILURE,
                error: response.data.error
            });
        } else {
            dispatch({
                type: DOWNLOAD_ALL_CERTIFICATES_SUCCESS
            });

            const url = window.URL.createObjectURL(new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'adeverinte.xlsx');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // Clean up after download
        }
    } catch (error) {
        console.error("Error downloading the certificates: ", error);
        dispatch({
            type: DOWNLOAD_ALL_CERTIFICATES_FAILURE,
            error: error.message
        });
    }
};