import {
    FETCH_CERTIFICATES_REQUEST,
    FETCH_CERTIFICATES_SUCCESS,
    FETCH_CERTIFICATES_FAILURE,
    FETCH_CERTIFICATE_SUCCESS,
    FETCH_CERTIFICATE_REQUEST,
    FETCH_CERTIFICATE_FAILURE,
    APPROVE_CERTIFICATE_REQUEST,
    APPROVE_CERTIFICATE_SUCCESS,
    APPROVE_CERTIFICATE_FAILURE,
    REJECT_CERTIFICATE_REQUEST,
    REJECT_CERTIFICATE_SUCCESS,
    REJECT_CERTIFICATE_FAILURE,
    FETCH_APPROVED_CERTIFICATES_SUCCESS,
    FETCH_APPROVED_CERTIFICATES_FAILURE,
    FETCH_REJECTED_CERTIFICATES_REQUEST,
    FETCH_REJECTED_CERTIFICATES_SUCCESS,
    FETCH_REJECTED_CERTIFICATES_FAILURE,
    FETCH_APPROVED_CERTIFICATES_REQUEST,
    FETCH_CERTIFICATES_PRINT_SUCCESS,
    FETCH_CERTIFICATES_PRINT_REQUEST,
    FETCH_CERTIFICATES_PRINT_FAILURE,
    DOWNLOAD_CERTIFICATES_REQUEST,
    DOWNLOAD_CERTIFICATES_SUCCESS,
    DOWNLOAD_CERTIFICATES_FAILURE,
    SET_CERTIFICATES_PRINTED_FAILURE,
    SET_CERTIFICATES_PRINTED_SUCCESS,
    SET_CERTIFICATES_PRINTED_REQUEST,
    EDIT_CERTIFICATE_FAILURE,
    EDIT_CERTIFICATE_SUCCESS,
    EDIT_CERTIFICATE_REQUEST
} from '../actions/types';

const initialState = {
    certificates: [], certificatesForPrint: [], approvedCertificates: [], rejectedCertificates: [],// Make sure this is properly initialized
    certificate: null, loading: false, error: null
};

const certificate = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case FETCH_CERTIFICATES_REQUEST:
            return {
                ...state, loading: true, error: null
            };
        case FETCH_CERTIFICATES_SUCCESS:
            return {
                ...state, certificates: payload, // Update certificates with payload
                loading: false, error: null
            };
        case FETCH_CERTIFICATES_FAILURE:
            return {
                ...state, loading: false, error: payload
            };
        case FETCH_CERTIFICATES_PRINT_REQUEST:
            return {
                ...state, loading: true, error: null
            };
        case FETCH_CERTIFICATES_PRINT_SUCCESS:
            return {
                ...state, certificatesForPrint: payload, // Update certificates with payload
                loading: false, error: null
            };
        case FETCH_CERTIFICATES_PRINT_FAILURE:
            return {
                ...state, loading: false, error: payload
            };
        case FETCH_APPROVED_CERTIFICATES_REQUEST:
            return {
                ...state, loading: true, error: null
            };
        case FETCH_APPROVED_CERTIFICATES_SUCCESS:
            return {
                ...state, approvedCertificates: payload, // Update certificates with payload
                loading: false, error: null
            };
        case FETCH_APPROVED_CERTIFICATES_FAILURE:
            return {
                ...state, loading: false, error: payload
            };
        case FETCH_REJECTED_CERTIFICATES_REQUEST:
            return {
                ...state, loading: true, error: null
            };
        case FETCH_REJECTED_CERTIFICATES_SUCCESS:
            return {
                ...state, rejectedCertificates: payload, // Update certificates with payload
                loading: false, error: null
            };
        case FETCH_REJECTED_CERTIFICATES_FAILURE:
            return {
                ...state, loading: false, error: payload
            };
        case FETCH_CERTIFICATE_REQUEST:
            return {
                ...state, loading: true, error: null
            };
        case FETCH_CERTIFICATE_SUCCESS:
            return {
                ...state, certificate: payload, // Update certificate with payload
                loading: false, error: null
            };
        case FETCH_CERTIFICATE_FAILURE:
            return {
                ...state, loading: false, error: payload
            };
        case APPROVE_CERTIFICATE_REQUEST:
            return {
                ...state, loading: true, error: null
            };
        case APPROVE_CERTIFICATE_SUCCESS:
            return {
                ...state, loading: false, error: null
            };
        case APPROVE_CERTIFICATE_FAILURE:
            return {
                ...state, loading: false, error: payload
            };
        case REJECT_CERTIFICATE_REQUEST:
            return {
                ...state, loading: true, error: null
            };
        case REJECT_CERTIFICATE_SUCCESS:
            return {
                ...state, loading: false, error: null
            };
        case REJECT_CERTIFICATE_FAILURE:
            return {
                ...state, loading: false, error: payload
            };
        case EDIT_CERTIFICATE_REQUEST:
            return {
                ...state, loading: true, error: null
            };
        case EDIT_CERTIFICATE_SUCCESS:
            return {
                ...state, loading: false, error: null
            };
        case EDIT_CERTIFICATE_FAILURE:
            return {
                ...state, loading: false, error: payload
            };
        case SET_CERTIFICATES_PRINTED_REQUEST:
            return {
                ...state, loading: true, error: null
            };
        case SET_CERTIFICATES_PRINTED_SUCCESS:
            return {
                ...state, loading: false, error: null
            };
        case SET_CERTIFICATES_PRINTED_FAILURE:
            return {
                ...state, loading: false, error: payload
            };
        case DOWNLOAD_CERTIFICATES_REQUEST:
            return {
                ...state, loading: true, error: null
            };
        case DOWNLOAD_CERTIFICATES_SUCCESS:
            return {
                ...state, loading: false, error: null
            };
        case DOWNLOAD_CERTIFICATES_FAILURE:
            return {
                ...state, loading: false, error: payload
            };
        default:
            return state;
    }
};

export default certificate;
