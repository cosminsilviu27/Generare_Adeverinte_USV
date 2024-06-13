import {
    RESET_APPLICATION_FAILURE, RESET_APPLICATION_REQUEST, RESET_APPLICATION_SUCCESS
} from "../actions/types";

const initialState = {
    loading: false, error: null
};

const admin = (state = initialState, action) => {
    const {type, payload} = action;

    switch (type) {
        case RESET_APPLICATION_REQUEST:
            return {
                ...state, loading: true, error: null
            };
        case RESET_APPLICATION_SUCCESS:
            return {
                ...state, loading: false, error: null
            };
        case RESET_APPLICATION_FAILURE:
            return {
                ...state, loading: false, error: payload
            };
    }
}

export default admin;